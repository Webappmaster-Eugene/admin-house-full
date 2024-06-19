export interface IConfigService {
  JWT_KEY: string;
  DATABASE_URL: string;
  STRICT_ADMIN_KEY: string;
  KEY_SECRET_FOR_STRICT_ADMIN_KEY: string;
  FRONTEND_DOMAIN: string;
  FRONTEND_URL: string;
  API_PREFIX: string;
  API_VERSION: string;
  APP_PORT: number;
  MINIO_ENDPOINT: string;
  MINIO_PORT: number;
  MINIO_ACCESS_KEY: string;
  MINIO_SECRET_KEY: string;
  MINIO_USE_SSL: string;
  MINIO_BUCKET_NAME: string;
}
