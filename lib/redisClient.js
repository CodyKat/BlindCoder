import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redis = new Redis({
    host: 'localhost' || process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PWD,
});

export default redis;