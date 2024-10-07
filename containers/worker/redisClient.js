import Redis from 'ioredis';

const redis = new Redis({
    host: 'redis-server',  // 같은 Docker 네트워크에서 Redis 서버에 접근
    port: 6379,
    password: 'myStrongPassword',
});

export default redis;
