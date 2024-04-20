import { Logger, Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { PrismaService } from '../common/prisma/prisma.service';
import { ProjectsRepository } from './project.repository';
import { OrganizationModule } from '../organization/organization.module';

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
      provide: KEYS_FOR_INJECTION.I_PROJECT_REPOSITORY,
      useClass: ProjectsRepository,
    },
    {
      provide: KEYS_FOR_INJECTION.I_PROJECT_SERVICE,
      useClass: ProjectService,
    },
  ],
  controllers: [ProjectController],
  imports: [OrganizationModule],
  exports: [],
})
export class ProjectModule {}
