import { Module } from '@nestjs/common';
import { TechLogChangesService } from './tech-log-changes.service';
import { TechLogChangesController } from './tech-log-changes.controller';
import { TechLogChangesRepository } from './tech-log-changes.repository';
import { KFI } from '../../../common/utils/di';

@Module({
  providers: [
    {
      provide: KFI.TECH_LOG_CHANGES_REPOSITORY,
      useClass: TechLogChangesRepository,
    },
    {
      provide: KFI.TECH_LOG_CHANGES_SERVICE,
      useClass: TechLogChangesService,
    },
  ],
  imports: [],
  controllers: [TechLogChangesController],
  exports: [KFI.TECH_LOG_CHANGES_SERVICE],
})
export class TechLogChangesModule {}
