import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RolesModule } from './modules/roles/roles.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { UserInterceptor } from './common/interceptors/user.interceptor';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { validateConfig } from './common/utils/validate-config';
import { UserModule } from './modules/user/user.module';
import { HandbookModule } from './modules/handbook/handbook.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectModule } from './modules/project/project.module';
// import { AppInfoModule } from './modules/app-info/app-info.module';
import { DatabaseModule } from './modules/common/database';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { GlobalCategoryModule } from './modules/global-category/global-category.module';
import { AppInfoModule } from './modules/app-info/app-info.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      validate: (config) => validateConfig(config),
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: path.resolve(__dirname, './static'),
    // }),
    DatabaseModule,
    AuthModule,
    AppInfoModule,
    GlobalCategoryModule,
    RolesModule,
    UserModule,
    WorkspaceModule,
    HandbookModule,
    OrganizationModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: ZodValidationExceptionFilter,
    // },
    // {
  ],
})
export class AppModule {}
