import { ClassSerializerInterceptor, Logger, Module } from '@nestjs/common';
import { HandbookService } from './handbook.service';
import { HandbookController } from './handbook.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { HandbookRepository } from './handbook.repository';
import { PrismaService } from '../../prisma/prisma.service';

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
      useClass: HandbookRepository,
    },
    {
      provide: KEYS_FOR_INJECTION.I_HANDBOOK_SERVICE,
      useClass: HandbookService,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  controllers: [HandbookController],
  imports: [],
  exports: [],
})
export class HandbookModule {}
