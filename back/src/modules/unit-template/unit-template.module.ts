import { Module } from '@nestjs/common';
import { UnitTemplateController } from './unit-template.controller';
import { UnitTemplateService } from './unit-template.service';
import { UnitTemplateRepository } from './unit-template.repository';
import { KFI } from '../../common/utils/di';

@Module({
  providers: [
    { provide: KFI.UNIT_TEMPLATE_REPOSITORY, useClass: UnitTemplateRepository },
    { provide: KFI.UNIT_TEMPLATE_SERVICE, useClass: UnitTemplateService },
  ],
  controllers: [UnitTemplateController],
  exports: [KFI.UNIT_TEMPLATE_SERVICE, KFI.UNIT_TEMPLATE_REPOSITORY],
})
export class UnitTemplateModule {}
