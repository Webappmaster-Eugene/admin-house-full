import { Logger, Module } from '@nestjs/common';
import { GlobalCategoryMaterialService } from './global-category-material.service';
import { GlobalCategoryMaterialController } from './global-category-material.controller';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { GlobalCategoryMaterialRepository } from './global-category-material.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { QUERIES } from './query';
import { COMMANDS } from './command';
import { PrismaService } from '../common/prisma/prisma.service';

@Module({
  providers: [
    ...QUERIES,
    ...COMMANDS,
    {
      provide: KEYS_FOR_INJECTION.I_PRISMA_SERVICE,
      useClass: PrismaService,
    },
    {
      provide: KEYS_FOR_INJECTION.I_LOGGER,
      useClass: Logger,
    },
    {
      provide: KEYS_FOR_INJECTION.I_GLOBAL_CATEGORY_MATERIAL_REPOSITORY,
      useClass: GlobalCategoryMaterialRepository,
    },
    {
      provide: KEYS_FOR_INJECTION.I_GLOBAL_CATEGORY_MATERIAL_SERVICE,
      useClass: GlobalCategoryMaterialService,
    },
  ],
  controllers: [GlobalCategoryMaterialController],
  imports: [CqrsModule],
  exports: [KEYS_FOR_INJECTION.I_GLOBAL_CATEGORY_MATERIAL_SERVICE],
})
export class GlobalCategoryModule {}
