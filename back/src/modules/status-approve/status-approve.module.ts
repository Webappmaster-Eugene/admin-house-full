import { Module } from '@nestjs/common';
import { StatusApproveService } from 'src/modules/status-approve/status-approve.service';
import { StatusApproveController } from 'src/modules/status-approve/status-approve.controller';
import { KFI } from '../../common/utils/di';
import { StatusApproveRepository } from 'src/modules/status-approve/status-approve.repository';

@Module({
  providers: [
    {
      provide: KFI.STATUS_RESOURCE_REPOSITORY,
      useClass: StatusApproveRepository,
    },
    {
      provide: KFI.STATUS_RESOURCE_SERVICE,
      useClass: StatusApproveService,
    },
  ],
  controllers: [StatusApproveController],
  imports: [],
  exports: [KFI.STATUS_RESOURCE_SERVICE],
})
export class StatusApproveModule {}
