import { Logger, Module } from '@nestjs/common';
import { PriceChangingService } from './price-changing.service';
import { PriceChangingController } from './price-changing.controller';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { PriceChangingRepository } from './price-changing.repository';
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
      provide: KEYS_FOR_INJECTION.I_PRICE_CHANGING_REPOSITORY,
      useClass: PriceChangingRepository,
    },
    {
      provide: KEYS_FOR_INJECTION.I_PRICE_CHANGING_SERVICE,
      useClass: PriceChangingService,
    },
  ],
  controllers: [PriceChangingController],
  imports: [],
  exports: [KEYS_FOR_INJECTION.I_PRICE_CHANGING_SERVICE],
})
export class PriceChangingModule {}
