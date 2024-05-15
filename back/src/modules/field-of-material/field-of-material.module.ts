import { Module } from '@nestjs/common';
import { KFI } from '../../common/utils/di';
import { FieldVariantsForSelectorFieldOfMaterialRepository } from '../field-variants-for-selector-field-type/field-variants-for-selector-field-type.repository';
import { FieldVariantsForSelectorFieldOfMaterialService } from '../field-variants-for-selector-field-type/field-variants-for-selector-field-type.service';
import { FieldVariantsForSelectorFieldOfMaterialController } from '../field-variants-for-selector-field-type/field-variants-for-selector-field-type.controller';

@Module({
  providers: [
    {
      provide: KFI.FIELD_TYPE_REPOSITORY,
      useClass: FieldVariantsForSelectorFieldOfMaterialRepository,
    },
    {
      provide: KFI.FIELD_TYPE_SERVICE,
      useClass: FieldVariantsForSelectorFieldOfMaterialService,
    },
  ],
  controllers: [FieldVariantsForSelectorFieldOfMaterialController],
  imports: [],
  exports: [KFI.FIELD_TYPE_SERVICE],
})
export class FieldOfMaterialModule {}
