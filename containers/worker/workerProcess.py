import os
import redis
import json
import time

STREAM_NAME = 'tasks-stream'
OUTPUT_DIRECTORY = './compiled_results'
CODE_DIRECTORY = 'codes'

CONSUMER_GROUP = 'task-group'
CONSUMER_NAME = f'worker-{int(time.time() * 1000)}'
REDIS_HOST = os.getenv('REDIS_HOST', 'localhost')
REDIS_PORT = int(os.getenv('REDIS_PORT'))
REDIS_PWD = os.getenv('REDIS_PWD')

language_extensions = {
    'python': 'py',
    'c': 'c',
    'java': 'java',
    'javascript': 'js',
    'c++': 'cpp',
    'rust': 'rs'
}

redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, password=REDIS_PWD, decode_responses=True)

def buildInfra():
    try:
        os.makedirs(OUTPUT_DIRECTORY, exist_ok=True)
        print(f"Directory {OUTPUT_DIRECTORY} createed successfully.")
        os.makedirs(CODE_DIRECTORY, exist_ok=True)
        print(f"Directory {CODE_DIRECTORY} createed successfully.")
    except Exception as e:
        print(f"Failed to create directory: {e}")

def sliceClearEvents(key_events):
    clear_index = next((i for i, event in reversed(list(enumerate(key_events))) if event['key'] == 'CLEAR'), -1)
    if clear_index != -1:
        key_events = key_events[clear_index + 1:]

    return key_events

def is_printable_key(key):
    printable_characters = set('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ ')
    return key in printable_characters

def construct_code_from_key_events(key_events):
    code_buffer = ''

    for event in key_events:
        if event['key'] == 'Backspace':
            code_buffer = code_buffer[:-1]  # 마지막 글자 삭제
        elif is_printable_key(event['key']):
            code_buffer += event['key']  # 출력 가능한 키만 추가

    return code_buffer
        
def create_consumer_group():
    try:
        redis_client.xgroup_create(name=STREAM_NAME, groupname=CONSUMER_GROUP, id='0', mkstream=True)
        print(f"Consumer group '{CONSUMER_GROUP} created successfully.")
    except redis.exceptions.ResponseError as e:
        if "BUSYFROUP" in str(e):
            print(f"Consumer group '${CONSUMER_GROUP}' already exists.")
        else:
            print(f"Error createing consumer group: {e}")

def conume_stream():
    while True:
        try:
            print("try to recieve message")
            result = redis_client.xreadgroup(groupname=CONSUMER_GROUP, consumername=CONSUMER_NAME, streams={STREAM_NAME: '>'}, count=1, block=0)
            print("recieve message")
            if result:
                for stream, messages in result:
                    for message_id, fields in messages:
                        language = fields.get('language', 'Unknown')
                        username = fields.get('username', 'Unknown')
                        key_events = json.loads(fields.get('keyEvents', '[]'))
                        print(f"Consumer {CONSUMER_NAME} received key events for language '{language}' and username '{username}':", key_events)
                        
                        # process_message(language, username, key_events)

                        redis_client.xack(STREAM_NAME, CONSUMER_GROUP, message_id)
        except Exception as e:
            print(f"Error consuming stream: {e}")

# def process_message(language, username, key_events):
#     code = construct_code_from_key_events(key_events)
#     file_extension = language_extensions.get(language)
#     file_name = f"{username}_{}"



buildInfra()
create_consumer_group()
conume_stream()