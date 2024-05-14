import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
import { redisStore } from 'cache-manager-redis-yet';
import { GlobalCategoryMaterialModule } from './modules/global-category-material/global-category-material.module';
import { WinstonModule } from 'nest-winston/dist/winston.module';
import { LoggerConfig } from '../logger/logger-config';

const logger: LoggerConfig = new LoggerConfig();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      validate: config => validateConfig(config),
    }),
    DatabaseModule,
    WinstonModule.forRoot(logger.configureLogger()),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: process.env.REDIS_HOST ? process.env.HOST : 'localhost',
            port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
          },
        }),
      }),
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: path.resolve(__dirname, './static'),
    // }),
    AuthModule,
    AppInfoModule,
    RolesModule,
    UserModule,
    WorkspaceModule,
    HandbookModule,
    OrganizationModule,
    ProjectModule,
    GlobalCategoryMaterialModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
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
