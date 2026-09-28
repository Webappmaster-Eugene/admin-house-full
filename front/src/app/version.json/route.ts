// Коммит, из которого собран фронт. Его ждёт CI после вебхука Dokploy (.github/workflows/deploy.yml):
// очередь Dokploy общая с другими проектами на сервере, и деплой может стартовать через часы.
// Значение зашивается в образ на этапе сборки (ARG APP_COMMIT_SHA в Dockerfile.front).
export const dynamic = 'force-static';

export function GET() {
  return Response.json({ commit: process.env.APP_COMMIT_SHA || 'unknown' });
}
