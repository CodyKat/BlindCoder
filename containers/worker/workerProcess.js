// workers/queueConsumer.js
import redis from './redisClient.js'
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const excludeKeys = [
    'Control',
    'Shift',
    'Alt',
    'Meta',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Escape',
    'CapsLock',
    'Insert',
    'Delete',
    'Home',
    'End',
    'PageUp',
    'PageDown',
    'F1', 'F2', 'F3', 'F4', 'F5',
    'F6', 'F7', 'F8', 'F9', 'F10',
    'F11', 'F12', 'HangulMode'
];

const TASK_QUEUE = 'key-events-queue';
const OUTPUT_DIRECTORY = './compiled_results';

function buildInfra() {
    exec(`mkdir ${OUTPUT_DIRECTORY}`, (runError, runStdout, runStderr) => {
        if (runError) {
            console.error(`mkdir failed: ${runStderr}`);
            return;
        }

        console.log(`mkdir output:${runStdout}`);
    });
}

function filterKeyEvents(keyEvents) {
    const clearIndex = keyEvents.map(event => event.key).lastIndexOf('CLEAR');
    if (clearIndex !== -1) {
        keyEvents = keyEvents.slice(clearIndex + 1);
    }
    keyEvents = keyEvents.filter((event) => !excludeKeys.includes(event.key))
    return keyEvents;
  }

async function processTasks() {
    console.log(process.env.REDIS_HOST);
    console.log(process.env.REDIS_PORT);
    while (true) {
        try {
            // Redis 큐에서 데이터 가져오기 (LPOP: FIFO 방식)
            var eventData = await redis.lpop(TASK_QUEUE);
            if (eventData) {
                const keyEvents = JSON.parse(eventData);
                const filteredKeyEvents = filterKeyEvents(keyEvents);
                console.log("Filtered key events:", filteredKeyEvents);
                const sourceCode = constructCodeFromKeyEvents(filteredKeyEvents);
                console.log(`source Code : ${sourceCode}`);

                const language = 'C';
                const outputFileName = `program_${Date.now()}`;
                const sourceFilePath = path.join(OUTPUT_DIRECTORY, `${outputFileName}.c`);

                fs.writeFileSync(sourceFilePath, sourceCode);
                console.log(`Source code written to ${sourceFilePath}`);

                compileAndRun(sourceFilePath, language, outputFileName);
            } else {
                console.log('No events to process, waiting...');
                await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기 후 다시 시도
            }
        } catch (error) {
            console.error('Error processing task:', error);
        }
    }
}

function constructCodeFromKeyEvents(keyEvents) {
    let codeBuffer = '';

    keyEvents.forEach(event => {
      if (event.key === 'Enter') {
        codeBuffer += '\n';
      } else if (event.key === ' ') {
        codeBuffer += ' ';
      } else if (event.key === 'Backspace') {
        codeBuffer = codeBuffer.slice(0, -1);
      } else {
        codeBuffer += event.key;
      }
    });
  
    return codeBuffer;
}

function compileAndRun(sourceFilePath, language, outputFileName) {
    const executablePath = path.join(OUTPUT_DIRECTORY, outputFileName);

    if (language === 'C') {
        const compileCommand = `gcc ${sourceFilePath} -o ${executablePath}`;
        exec(compileCommand, (compileError, stdout, stderr) => {
            if (compileError) {
                console.error(`Compilation failed: ${stderr}`);
                return ;
            }

            console.log(`Compilation successful. Running the executable...`);
            exec(`${executablePath}`, (runError, runStdout, runStderr) => {
                if (runError) {
                    console.error(`Execution failed: ${runStderr}`);
                    return;
                }

                console.log(`Execution output:${runStdout}`);
            });
        });
    } else {
        console.error('Unsupported language. Only C is supported at the moment.');
    }
}


buildInfra();
processTasks();
