import { ClassSerializerInterceptor, Logger, Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { WorkspacesModule } from '../workspaces/workspaces.module';
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
  imports: [PrismaModule, WorkspacesModule],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
