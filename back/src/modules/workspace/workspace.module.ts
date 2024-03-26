import { ClassSerializerInterceptor, Logger, Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { RolesModule } from '../roles/roles.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  providers: [
    WorkspaceService,
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  controllers: [WorkspaceController],
  imports: [PrismaModule, RolesModule],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
