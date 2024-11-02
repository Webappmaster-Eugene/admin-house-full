import { forwardRef, Module } from '@nestjs/common';
import { KFI } from '../../common/utils/di';
import { FieldOfCategoryMaterialService } from './field-of-category-material.service';
import { FieldOfCategoryMaterialRepository } from './field-of-category-material.repository';
import { FieldOfCategoryMaterialController } from './field-of-category-material.controller';
import { CategoryMaterialModule } from '../../modules/category-material/category-material.module';
import { MaterialModule } from '../../modules/material/material.module';
import { FieldTypeModule } from '../field-type/field-type.module';

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
  imports: [
    FieldTypeModule,
    //FieldOfCategoryMaterial_CategoryMaterialModule
    forwardRef(() => CategoryMaterialModule),
    //MaterialModule,
  ],
  exports: [KFI.FIELD_OF_CATEGORY_MATERIAL_SERVICE],
})
export class FieldOfCategoryMaterialModule {}
