import { Module } from '@nestjs/common';
import { FieldVariantsForSelectorFieldTypeService } from './field-variants-for-selector-field-type.service';
import { FieldVariantsForSelectorFieldTypeController } from './field-variants-for-selector-field-type.controller';
import { KFI } from '../../common/utils/di';
import { FieldVariantsForSelectorFieldTypeRepository } from './field-variants-for-selector-field-type.repository';

@Module({
  providers: [
    {
      provide: KFI.FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_REPOSITORY,
      useClass: FieldVariantsForSelectorFieldTypeRepository,
    },
    {
      provide: KFI.FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_SERVICE,
      useClass: FieldVariantsForSelectorFieldTypeService,
    },
  ],
  controllers: [FieldVariantsForSelectorFieldTypeController],
  imports: [],
  exports: [KFI.FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_SERVICE],
})
export class FieldVariantsForSelectorFieldTypeModule {}
