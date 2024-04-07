import { ClassSerializerInterceptor, Logger, Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersModule } from '../users/users.module';
import { WorkspaceModule } from '../workspace/workspace.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WorkspaceService } from '../workspace/workspace.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [
    AuthService,
    UserService,
    WorkspaceService,
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  imports: [PrismaModule, AuthModule, UsersModule, WorkspaceModule],
  exports: [UserService],
})
export class UserModule {}
