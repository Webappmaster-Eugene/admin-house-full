import { Module } from '@nestjs/common';
import { PriceChangingService } from './price-changing.service';
import { PriceChangingController } from './price-changing.controller';
import { KFI } from '../../common/utils/di';
import { PriceChangingRepository } from './price-changing.repository';

@Module({
  providers: [
    {
      provide: KFI.PRICE_CHANGING_REPOSITORY,
      useClass: PriceChangingRepository,
    },
    {
      provide: KFI.PRICE_CHANGING_SERVICE,
      useClass: PriceChangingService,
    },
  ],
  controllers: [PriceChangingController],
  imports: [],
  exports: [KFI.PRICE_CHANGING_SERVICE],
})
export class PriceChangingModule {}
