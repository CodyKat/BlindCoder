FROM debian:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y \
    build-essential \
    gcc \
    nodejs \
    redis \
    npm \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 애플리케이션 코드 및 설정 파일 복사
COPY . .

RUN npm install

# 컨테이너 실행 시 실행할 기본 명령 설정 (예: 스크립트 실행)
CMD ["node", "workerProcess.js"]