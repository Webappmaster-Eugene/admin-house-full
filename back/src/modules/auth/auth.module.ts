import { ClassSerializerInterceptor, Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { RolesModule } from '../roles/roles.module';
import { WorkspaceModule } from '../workspace/workspace.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  controllers: [AuthController],
  providers: [AuthService, Logger],
  imports: [PrismaModule, RolesModule, WorkspaceModule],
  exports: [AuthService],
})
export class UserModule {}
