import { Module } from '@nestjs/common';
import { StatusApproveService } from 'src/modules/status-approve/status-approve.service';
import { StatusApproveController } from 'src/modules/status-approve/status-approve.controller';
import { KFI } from '../../common/utils/di';
import { StatusApproveRepository } from 'src/modules/status-approve/status-approve.repository';
import { AutomapperModule } from '@numart/automapper/nestjs';

@Module({
  providers: [
    {
      provide: KFI.STATUS_APPROVE_REPOSITORY,
      useClass: StatusApproveRepository,
    },
    {
      provide: KFI.STATUS_APPROVE_SERVICE,
      useClass: StatusApproveService,
    },
  ],
  controllers: [StatusApproveController],
  imports: [AutomapperModule],
  exports: [KFI.STATUS_APPROVE_SERVICE],
})
export class StatusApproveModule {}
