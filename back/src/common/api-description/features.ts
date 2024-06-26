export const enum FEATURES {
  CQRS = 'Processing requests with CQRS pattern',
  REDIS = 'Caching requests with Redis cache-store',
  SEEDS = 'Сущность полностью предзаполнена и не требует добавления записей. Это техническая информация и доступна для изменений на уровне приложения только админам',
  AUTOMAPPER = 'Для работы с DTO и DAO используется AutoMapper',
  S3 = 'Происходит работа с файловым сервером MinioS3',
}
