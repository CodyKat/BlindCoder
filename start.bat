node generate-init-db.js
docker compose down -v
docker volume prune
docker compose up -d