import { Logger, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RolesModule } from './modules/roles/roles.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { UserInterceptor } from './common/interceptors/user.interceptor';
import { ZodValidationPipe } from 'nestjs-zod';
import { AuthGuard } from './common/guards/auth.guard';
import { validateConfig } from './common/utils/validate-config';

@Module({
  imports: [
    // UserModule,
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      validate: (config) => validateConfig(config),
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: path.resolve(__dirname, './static'),
    // }),
    RolesModule,
    // WorkspaceModule,
    // OrganizationModule,
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
    // {
    //   provide: APP_FILTER,
    //   useClass: NotFoundExceptionFilter,
    // },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
