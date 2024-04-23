import { Logger, Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { MaterialRepository } from './material.repository';
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
      provide: KEYS_FOR_INJECTION.I_MATERIAL_REPOSITORY,
      useClass: MaterialRepository,
    },
    {
      provide: KEYS_FOR_INJECTION.I_MATERIAL_SERVICE,
      useClass: MaterialService,
    },
  ],
  controllers: [MaterialController],
  imports: [],
  exports: [KEYS_FOR_INJECTION.I_MATERIAL_SERVICE],
})
export class MaterialModule {}
