/** @type {import('next').NextConfig} */
// next.config.mjs
export default {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                net: false,
                tls: false,
                "mongodb-client-encryption": false,
                "aws4": false,
                "snappy": false,
                "zstd": false,
                "kerberos": false,
                "bson-ext": false,
                "mongodb": false
            };
        }
        return config;
    },
};
