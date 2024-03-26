import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RolesModule } from './modules/roles/roles.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './lib/interceptors/user.interceptor';
import { NotFoundExceptionFilter } from './lib/exceptions/notfound.exception';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { OrganizationModule } from './modules/organization/organization.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    UserModule,
    // HomeModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, './static'),
    }),
    RolesModule,
    WorkspaceModule,
    OrganizationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule {}
