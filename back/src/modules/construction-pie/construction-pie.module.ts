import { Module } from '@nestjs/common';
import { ConstructionPieController } from './construction-pie.controller';
import { ConstructionPieService } from './construction-pie.service';
import { ConstructionPieRepository } from './construction-pie.repository';
import { ConstructionPieExportService } from './construction-pie-export.service';
import { KFI } from '../../common/utils/di';

@Module({
  providers: [
    { provide: KFI.CONSTRUCTION_PIE_REPOSITORY, useClass: ConstructionPieRepository },
    { provide: KFI.CONSTRUCTION_PIE_SERVICE, useClass: ConstructionPieService },
    { provide: KFI.CONSTRUCTION_PIE_EXPORT_SERVICE, useClass: ConstructionPieExportService },
  ],
  controllers: [ConstructionPieController],
  exports: [KFI.CONSTRUCTION_PIE_SERVICE, KFI.CONSTRUCTION_PIE_REPOSITORY],
})
export class ConstructionPieModule {}
