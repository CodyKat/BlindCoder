/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        JWT_SECRET: process.env.JWT_SECRET,
        REDIS_PWD: process.env.REDIS_PWD,
        REDIS_HOST: process.env.REDIS_HOST,
        REDIS_PORT: process.env.REDIS_PORT,

        MONGO_HOST: process.env.MONGO_HOST,
        MONGO_PORT: process.env.MONGO_PORT,
        MONGO_URL: process.env.MONGO_URL,
    },
};

export default nextConfig;
