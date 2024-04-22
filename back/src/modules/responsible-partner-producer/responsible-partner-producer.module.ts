import { Logger, Module } from '@nestjs/common';
import { ResponsiblePartnerProducerService } from './responsible-partner-producer.service';
import { ResponsiblePartnerProducerController } from './responsible-partner-producer.controller';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { ResponsiblePartnerProducerRepository } from './responsible-partner-producer.repository';
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
      provide: KEYS_FOR_INJECTION.I_HANDBOOK_REPOSITORY,
      useClass: ResponsiblePartnerProducerRepository,
    },
    {
      provide: KEYS_FOR_INJECTION.I_HANDBOOK_SERVICE,
      useClass: ResponsiblePartnerProducerService,
    },
  ],
  controllers: [ResponsiblePartnerProducerController],
  imports: [],
  exports: [KEYS_FOR_INJECTION.I_HANDBOOK_SERVICE],
})
export class ResponsiblePartnerProducerModule {}
