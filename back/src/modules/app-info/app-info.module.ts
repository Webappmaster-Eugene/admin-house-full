import { Logger, Module } from '@nestjs/common';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { PrismaService } from '../common/prisma/prisma.service';
import { AppInfoRepository } from './app-info.repository';
import { AppInfoService } from './app-info.service';
import { AppInfoController } from './app-info.controller';
import { QUERIES } from './query';
import { COMMANDS } from './command';
import { CqrsModule } from '@nestjs/cqrs';

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
      provide: KEYS_FOR_INJECTION.I_APP_INFO_REPOSITORY,
      useClass: AppInfoRepository,
    },
    {
      provide: KEYS_FOR_INJECTION.I_APP_INFO_SERVICE,
      useClass: AppInfoService,
    },
  ],
  controllers: [AppInfoController],
  imports: [CqrsModule],
  exports: [],
})
export class AppInfoModule {}
