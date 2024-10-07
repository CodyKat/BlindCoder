FROM mongo:latest

ENV MONGO_INITDB_ROOT_USERNAME=${MONGO_INITDB_ROOT_USERNAME}
ENV MONGO_INITDB_ROOT_PASSWORD=${MONGO_INITDB_ROOT_PASSWORD}


COPY ../../init-db.js /docker-entrypoint-initdb.d/
# COPY ../../init-db.js .

CMD ["mongod"]