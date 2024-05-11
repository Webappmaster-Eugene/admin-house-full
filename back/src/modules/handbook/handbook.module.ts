import { Logger, Module } from '@nestjs/common';
import { HandbookService } from './handbook.service';
import { HandbookController } from './handbook.controller';
import { KFI } from '../../common/utils/di';
import { HandbookRepository } from './handbook.repository';
import { PrismaService } from '../common/prisma/prisma.service';

@Module({
  providers: [
    {
      provide: KFI.HANDBOOK_REPOSITORY,
      useClass: HandbookRepository,
    },
    {
      provide: KFI.HANDBOOK_SERVICE,
      useClass: HandbookService,
    },
  ],
  controllers: [HandbookController],
  imports: [],
  exports: [KFI.HANDBOOK_SERVICE],
})
export class HandbookModule {}
