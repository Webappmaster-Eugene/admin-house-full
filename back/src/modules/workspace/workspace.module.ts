import { ClassSerializerInterceptor, Logger, Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { WorkspaceRepository } from './workspace.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [
    {
      provide: KEYS_FOR_INJECTION.I_PRISMA_SERVICE,
      useClass: PrismaService,
    },
    {
      provide: KEYS_FOR_INJECTION.I_LOGGER,
      useClass: Logger,
    },
    {
      provide: KEYS_FOR_INJECTION.I_WORKSPACE_REPOSITORY,
      useClass: WorkspaceRepository,
    },
    {
      provide: KEYS_FOR_INJECTION.I_WORKSPACE_SERVICE,
      useClass: WorkspaceService,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  controllers: [WorkspaceController],
  imports: [],
  exports: [KEYS_FOR_INJECTION.I_WORKSPACE_SERVICE],
})
export class WorkspaceModule {}
