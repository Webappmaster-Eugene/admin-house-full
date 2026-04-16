import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from './modules/roles/roles.module';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { UserInterceptor } from './common/interceptors/user.interceptor';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { validateConfig } from './common/utils/validate-config';
import { UserModule } from './modules/user/user.module';
import { HandbookModule } from './modules/handbook/handbook.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectModule } from './modules/project/project.module';
import { DatabaseModule } from './modules/common/database';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { AppInfoModule } from './modules/app-info/app-info.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CacheModule } from '@nestjs/cache-manager';
import { GlobalCategoryMaterialModule } from './modules/global-category-material/global-category-material.module';
import { WinstonModule } from 'nest-winston/dist/winston.module';
import { LoggerConfig } from 'logger/logger-config';
import { CategoryMaterialModule } from './modules/category-material/category-material.module';
import { StatusResourceModule } from './modules/status-resource/status-resource.module';
import { MaterialModule } from './modules/material/material.module';
import { FieldVariantsForSelectorFieldTypeModule } from './modules/field-variants-for-selector-field-type/field-variants-for-selector-field-type.module';
import { FieldUnitMeasurementModule } from './modules/field-unit-measurement/field-unit-measurement.module';
import { FieldTypeModule } from './modules/field-type/field-type.module';
import { FieldOfCategoryMaterialModule } from './modules/field-of-category-material/field-of-category-material.module';
import { PriceChangingModule } from './modules/price-changing/price-changing.module';
import { ResponsiblePartnerProducerModule } from './modules/responsible-partner-producer/responsible-partner-producer.module';
import { CharacteristicsMaterialModule } from './modules/characteristics-material/characteristics-material.module';
import { redisStore } from 'cache-manager-redis-yet';
import { TechLogChangesModule } from './modules/tech/tech-log-changes/tech-log-changes.module';
import { S3MinioModule } from './modules/s3-minio/s3-minio.module';
// import { AutomapperModule } from '@numart/automapper/nestjs';
// import { classes } from '@numart/automapper/classes';
import { StatusApproveModule } from './modules/status-approve/status-approve.module';
const logger: LoggerConfig = new LoggerConfig();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      // validate: config => validateConfig(config),
    }),
    DatabaseModule,
    WinstonModule.forRoot(logger.configureLogger()),
    // AutomapperModule.forRoot({
    //   strategyInitializer: classes(),
    // }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const host = configService.get<string>('REDIS_HOST', 'redis');
        const port = configService.get<number>('REDIS_PORT', 6379);

        try {
          const store = await redisStore({
            ttl: 10,
            socket: {
              host,
              port,
              connectTimeout: 5000,
            },
          });

          await store.client.ping();
          console.log(`Redis подключён (${host}:${port})`);

          return { store };
        } catch (error) {
          console.warn(`Redis недоступен (${host}:${port}), используется in-memory кэш`, error);
          return { store: undefined };
        }
      },
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: path.resolve(__dirname, './static'),
    // }),
    S3MinioModule,
    AuthModule,
    AppInfoModule,
    RolesModule,
    UserModule,
    WorkspaceModule,
    HandbookModule,
    OrganizationModule,
    ProjectModule,
    GlobalCategoryMaterialModule,
    CategoryMaterialModule,
    PriceChangingModule,
    MaterialModule,
    FieldVariantsForSelectorFieldTypeModule,
    FieldUnitMeasurementModule,
    FieldTypeModule,
    FieldOfCategoryMaterialModule,
    CharacteristicsMaterialModule,
    ResponsiblePartnerProducerModule,
    StatusResourceModule,
    StatusApproveModule,
    TechLogChangesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
    // если хотим общий гвард на все роуты в приложении
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
