import { Logger, Module } from '@nestjs/common';
import { GlobalCategoryService } from './global-category.service';
import { GlobalCategoryController } from './global-category.controller';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { GlobalCategoryRepository } from './global-category.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { QUERIES } from '../global-category/query';
import { COMMANDS } from '../global-category/command';
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
      provide: KEYS_FOR_INJECTION.I_GLOBAL_CATEGORY_REPOSITORY,
      useClass: GlobalCategoryRepository,
    },
    {
      provide: KEYS_FOR_INJECTION.I_GLOBAL_CATEGORY_SERVICE,
      useClass: GlobalCategoryService,
    },
  ],
  controllers: [GlobalCategoryController],
  imports: [CqrsModule],
  exports: [KEYS_FOR_INJECTION.I_GLOBAL_CATEGORY_SERVICE],
})
export class GlobalCategoryModule {}
