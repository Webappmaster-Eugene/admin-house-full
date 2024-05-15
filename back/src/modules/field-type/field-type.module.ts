import { Module } from '@nestjs/common';
import { KFI } from '../../common/utils/di';
import { FieldVariantsForSelectorFieldTypeRepository } from '../field-variants-for-selector-field-type/field-variants-for-selector-field-type.repository';
import { FieldVariantsForSelectorFieldTypeService } from '../field-variants-for-selector-field-type/field-variants-for-selector-field-type.service';
import { FieldVariantsForSelectorFieldTypeController } from '../field-variants-for-selector-field-type/field-variants-for-selector-field-type.controller';

@Module({
  providers: [
    {
      provide: KFI.FIELD_TYPE_REPOSITORY,
      useClass: FieldVariantsForSelectorFieldTypeRepository,
    },
    {
      provide: KFI.FIELD_TYPE_SERVICE,
      useClass: FieldVariantsForSelectorFieldTypeService,
    },
  ],
  controllers: [FieldVariantsForSelectorFieldTypeController],
  imports: [],
  exports: [KFI.FIELD_TYPE_SERVICE],
})
export class FieldTypeModule {}
