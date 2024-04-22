import { Logger, Module } from '@nestjs/common';
import { CategoryMaterialService } from './category-material.service';
import { CategoryMaterialController } from './category-material.controller';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { CategoryMaterialRepository } from './category-material.repository';
import { PrismaService } from '../common/prisma/prisma.service';

@Module({
  providers: [
    {
      provide: KEYS_FOR_INJECTION.I_PRISMA_SERVICE,
      useClass: PrismaService,
    },
    {
      provide: KEYS_FOR_INJECTION.I_LOGGER,
      useClass: Logger,
    },
    {
      provide: KEYS_FOR_INJECTION.I_CATEGORY_MATERIAL_REPOSITORY,
      useClass: CategoryMaterialRepository,
    },
    {
      provide: KEYS_FOR_INJECTION.I_CATEGORY_MATERIAL_SERVICE,
      useClass: CategoryMaterialService,
    },
  ],
  controllers: [CategoryMaterialController],
  imports: [],
  exports: [KEYS_FOR_INJECTION.I_CATEGORY_MATERIAL_SERVICE],
})
export class CategoryMaterialModule {}
