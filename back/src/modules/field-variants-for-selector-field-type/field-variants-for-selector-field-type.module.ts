import { Module } from '@nestjs/common';
import { FieldVariantsForSelectorFieldTypeService } from './field-variants-for-selector-field-type.service';
import { FieldVariantsForSelectorFieldTypeController } from './field-variants-for-selector-field-type.controller';
import { KFI } from '../../common/utils/di';
import { FieldVariantsForSelectorFieldTypeRepository } from './field-variants-for-selector-field-type.repository';
import { FieldOfCategoryMaterialModule } from '../../modules/field-of-category-material/field-of-category-material.module';

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
  imports: [FieldOfCategoryMaterialModule],
  exports: [KFI.FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_SERVICE],
})
export class FieldVariantsForSelectorFieldTypeModule {}
