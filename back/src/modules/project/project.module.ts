import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { KFI } from '../../common/utils/di';
import { ProjectsRepository } from './project.repository';
import { OrganizationModule } from '../organization/organization.module';

@Module({
  providers: [
    {
      provide: KFI.PROJECT_REPOSITORY,
      useClass: ProjectsRepository,
    },
    {
      provide: KFI.PROJECT_SERVICE,
      useClass: ProjectService,
    },
  ],
  controllers: [ProjectController],
  imports: [],
  exports: [KFI.PROJECT_SERVICE],
})
export class ProjectModule {}
