import { Module } from '@nestjs/common';
import { ResponsiblePartnerProducerService } from './responsible-partner-producer.service';
import { ResponsiblePartnerProducerController } from './responsible-partner-producer.controller';
import { KFI } from '../../common/utils/di';
import { ResponsiblePartnerProducerRepository } from './responsible-partner-producer.repository';

@Module({
  providers: [
    {
      provide: KFI.RESPONSIBLE_PARTNER_PRODUCER_REPOSITORY,
      useClass: ResponsiblePartnerProducerRepository,
    },
    {
      provide: KFI.RESPONSIBLE_PARTNER_PRODUCER_SERVICE,
      useClass: ResponsiblePartnerProducerService,
    },
  ],
  controllers: [ResponsiblePartnerProducerController],
  imports: [],
  exports: [KFI.RESPONSIBLE_PARTNER_PRODUCER_SERVICE],
})
export class ResponsiblePartnerProducerModule {}
