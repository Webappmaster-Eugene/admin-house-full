import { Module } from '@nestjs/common';
import { GlobalCategoryMaterialService } from './global-category-material.service';
import { GlobalCategoryMaterialController } from './global-category-material.controller';
import { KFI } from '../../common/utils/di';
import { GlobalCategoryMaterialRepository } from './global-category-material.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { QUERIES } from './query';
import { COMMANDS } from './command';

@Module({
  providers: [
    ...QUERIES,
    ...COMMANDS,
    {
      provide: KFI.GLOBAL_CATEGORY_MATERIAL_REPOSITORY,
      useClass: GlobalCategoryMaterialRepository,
    },
    {
      provide: KFI.GLOBAL_CATEGORY_MATERIAL_SERVICE,
      useClass: GlobalCategoryMaterialService,
    },
  ],
  controllers: [GlobalCategoryMaterialController],
  imports: [CqrsModule],
  exports: [KFI.GLOBAL_CATEGORY_MATERIAL_SERVICE],
})
export class GlobalCategoryMaterialModule {}
