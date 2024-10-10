FROM mongo:latest

COPY ../../init-db.js /docker-entrypoint-initdb.d/
# COPY ../../init-db.js .

CMD ["mongod"]