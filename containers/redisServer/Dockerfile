# Redis의 공식 이미지를 기반으로 사용
FROM redis:latest

# Redis 설정 파일 복사 (옵션 - 필요한 경우에만 사용)
# 이 단계는 커스터마이징이 필요한 경우에만 사용하세요.
# 예: 사용자 정의 redis.conf 파일을 가지고 있다면 아래와 같이 복사합니다.
# COPY ./redis.conf /usr/local/etc/redis/redis.conf

# 포트 6379 노출 (옵션)
EXPOSE 6379

COPY ./redis.conf /usr/local/etc/redis/redis.conf

# 커스텀 설정이 있는 경우 이를 사용하여 Redis 서버를 시작
# 커스터마이징된 redis.conf 파일이 없으면 기본 설정으로 시작
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]
