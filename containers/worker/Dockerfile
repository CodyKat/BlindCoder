# 베이스 이미지로 Python 3.9 사용
FROM python:3.9-slim

# 작업 디렉토리 생성
WORKDIR /app

# 필요한 패키지들을 설치하기 위해 requirements.txt 복사
COPY requirements.txt .

# Redis 및 기타 필요한 패키지 설치
RUN pip install --no-cache-dir -r requirements.txt

# Python 스크립트 파일들을 복사
COPY . /app

# 환경 변수 설정 (필요시 조정 가능)
ENV REDIS_HOST=redis-server
ENV REDIS_PORT=6379
ENV REDIS_PWD=myStrongPassword
ENV PYTHONUNBUFFERED=1

# 컨테이너 시작 시 실행할 명령어
CMD ["python", "workerProcess.py"]
