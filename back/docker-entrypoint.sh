#!/bin/sh
set -e

echo "[entrypoint] Running prisma db push..."
npx prisma db push --schema=./prisma/schema.prisma

echo "[entrypoint] Running prisma db seed..."
npx prisma db seed || echo "[entrypoint] Seed пропущен (данные уже существуют или произошла ошибка)"

echo "[entrypoint] Starting NestJS application..."
exec node dist/src/main
