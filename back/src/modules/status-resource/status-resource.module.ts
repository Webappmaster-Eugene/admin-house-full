import { Module } from '@nestjs/common';
import { StatusResourceService } from './status-resource.service';
import { StatusResourceController } from './status-resource.controller';
import { KFI } from '../../common/utils/di';
import { StatusResourceRepository } from './status-resource.repository';

@Module({
  providers: [
    {
      provide: KFI.STATUS_RESOURCE_REPOSITORY,
      useClass: StatusResourceRepository,
    },
    {
      provide: KFI.STATUS_RESOURCE_SERVICE,
      useClass: StatusResourceService,
    },
  ],
  controllers: [StatusResourceController],
  imports: [],
  exports: [KFI.STATUS_RESOURCE_SERVICE],
})
export class StatusResourceModule {}
