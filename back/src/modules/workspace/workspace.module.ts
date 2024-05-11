import { Global, Logger, Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { KFI } from '../../common/utils/di';
import { WorkspaceRepository } from './workspace.repository';
import { PrismaService } from '../common/prisma/prisma.service';

// да, Global - это жесть, но нужно для работы Гвардов. В идеале в Гварды нужно красиво заинжектить WorkspaceService
@Global()
@Module({
  providers: [
    {
      provide: KFI.WORKSPACE_REPOSITORY,
      useClass: WorkspaceRepository,
    },
    {
      provide: KFI.WORKSPACE_SERVICE,
      useClass: WorkspaceService,
    },
  ],
  controllers: [WorkspaceController],
  imports: [],
  exports: [KFI.WORKSPACE_SERVICE],
})
export class WorkspaceModule {}
