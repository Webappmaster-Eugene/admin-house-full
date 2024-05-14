import { Module } from '@nestjs/common';
import { CategoryMaterialService } from './category-material.service';
import { CategoryMaterialController } from './category-material.controller';
import { KFI } from '../../common/utils/di';
import { CategoryMaterialRepository } from './category-material.repository';

@Module({
  providers: [
    {
      provide: KFI.CATEGORY_MATERIAL_REPOSITORY,
      useClass: CategoryMaterialRepository,
    },
    {
      provide: KFI.CATEGORY_MATERIAL_SERVICE,
      useClass: CategoryMaterialService,
    },
  ],
  controllers: [CategoryMaterialController],
  imports: [],
  exports: [KFI.CATEGORY_MATERIAL_SERVICE],
})
export class CategoryMaterialModule {}
