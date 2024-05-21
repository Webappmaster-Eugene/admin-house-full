import { Module } from '@nestjs/common';
import { KFI } from '../../common/utils/di';
import { FieldOfCategoryMaterialService } from './field-of-category-material.service';
import { FieldOfCategoryMaterialRepository } from './field-of-category-material.repository';
import { FieldOfCategoryMaterialController } from './field-of-category-material.controller';

@Module({
  providers: [
    {
      provide: KFI.FIELD_OF_CATEGORY_MATERIAL_REPOSITORY,
      useClass: FieldOfCategoryMaterialRepository,
    },
    {
      provide: KFI.FIELD_OF_CATEGORY_MATERIAL_SERVICE,
      useClass: FieldOfCategoryMaterialService,
    },
  ],
  controllers: [FieldOfCategoryMaterialController],
  imports: [],
  exports: [KFI.FIELD_OF_CATEGORY_MATERIAL_SERVICE],
})
export class FieldOfCategoryMaterialModule {}
