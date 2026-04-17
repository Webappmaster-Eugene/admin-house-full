import { Module } from '@nestjs/common';
import { EstimateController } from './estimate.controller';
import { EstimateService } from './estimate.service';
import { EstimateRepository } from './estimate.repository';
import { EstimateExportService } from './estimate-export.service';
import { KFI } from '../../common/utils/di';

@Module({
  providers: [
    { provide: KFI.ESTIMATE_REPOSITORY, useClass: EstimateRepository },
    { provide: KFI.ESTIMATE_SERVICE, useClass: EstimateService },
    { provide: KFI.ESTIMATE_EXPORT_SERVICE, useClass: EstimateExportService },
  ],
  controllers: [EstimateController],
  exports: [KFI.ESTIMATE_SERVICE],
})
export class EstimateModule {}
