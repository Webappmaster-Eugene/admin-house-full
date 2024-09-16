import { forwardRef, Module } from '@nestjs/common';
import { CategoryMaterialService } from './category-material.service';
import { CategoryMaterialController } from './category-material.controller';
import { KFI } from '../../common/utils/di';
import { CategoryMaterialRepository } from './category-material.repository';
import { MaterialModule } from '../../modules/material/material.module';
import { CharacteristicsMaterialModule } from '../../modules/characteristics-material/characteristics-material.module';

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
  imports: [forwardRef(() => MaterialModule), CharacteristicsMaterialModule, CharacteristicsMaterialModule],
  exports: [KFI.CATEGORY_MATERIAL_SERVICE],
})
export class CategoryMaterialModule {}
