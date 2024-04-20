import { Logger, Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { PrismaService } from '../common/prisma/prisma.service';
import { OrganizationRepository } from './organization.repository';
import { WorkspaceModule } from '../workspace/workspace.module';

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
      provide: KEYS_FOR_INJECTION.I_ORGANIZATION_REPOSITORY,
      useClass: OrganizationRepository,
    },
    {
      provide: KEYS_FOR_INJECTION.I_ORGANIZATION_SERVICE,
      useClass: OrganizationService,
    },
  ],
  controllers: [OrganizationController],
  imports: [WorkspaceModule],
  exports: [KEYS_FOR_INJECTION.I_ORGANIZATION_SERVICE],
})
export class OrganizationModule {}
