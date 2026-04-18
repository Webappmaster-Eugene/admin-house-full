import { Module } from '@nestjs/common';
import { UnitTemplateController } from './unit-template.controller';
import { UnitTemplateService } from './unit-template.service';
import { UnitTemplateRepository } from './unit-template.repository';
import { UnitTemplateExportService } from './unit-template-export.service';
import { KFI } from '../../common/utils/di';

@Module({
  providers: [
    { provide: KFI.UNIT_TEMPLATE_REPOSITORY, useClass: UnitTemplateRepository },
    { provide: KFI.UNIT_TEMPLATE_SERVICE, useClass: UnitTemplateService },
    { provide: KFI.UNIT_TEMPLATE_EXPORT_SERVICE, useClass: UnitTemplateExportService },
  ],
  controllers: [UnitTemplateController],
  exports: [KFI.UNIT_TEMPLATE_SERVICE, KFI.UNIT_TEMPLATE_REPOSITORY],
})
export class UnitTemplateModule {}
