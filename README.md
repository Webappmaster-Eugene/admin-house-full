## Admin House

1) Спринт по умолчанию равен 2 неделям.
2) Стэк на фронт - Nextjs, TS, Zustand, MaterialUI, (опционально - Tanstack Table), Tailwind, axios.
3) Стэк на бэк - DDD, API-контракты(zod), NestJS (DI, CQRS), (опционально - PassportJS), PostgreSQL, ORM - Prisma.
4) Авторизация - refresh+access (front: axios interceptor).
5) DevOps - nginx, certbot, CI/CD (Github Actions), Redis, подключены домены, оповещение при деплое приходит в телеграм. В планах при развитии - масштабирование на нескольно нод, репликация БД, внедрение тестов (в частности e2e), k8s (при появлении микросервисов+grps).
6) 1 этап выполнен: Auth (back -> front), CRUD справочник, минимальное и достаточное предзаполнение БД.
7) 2 этап: развертывание начального функционала приложения на фронте из готового шаблона.
8) 3 этап: разработка функционала смет.
