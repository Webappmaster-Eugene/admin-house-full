import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { KFI } from '../../common/utils/di';
import { OrganizationRepository } from './organization.repository';
import { WorkspaceModule } from '../workspace/workspace.module';

@Module({
  providers: [
    {
      provide: KFI.ORGANIZATION_REPOSITORY,
      useClass: OrganizationRepository,
    },
    {
      provide: KFI.ORGANIZATION_SERVICE,
      useClass: OrganizationService,
    },
  ],
  controllers: [OrganizationController],
  imports: [WorkspaceModule],
  exports: [KFI.ORGANIZATION_SERVICE],
})
export class OrganizationModule {}
