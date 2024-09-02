import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { WorkspaceModule } from '../workspace/workspace.module';
import { KFI } from '../../common/utils/di';
import { UserRepository } from './user.repository';
import { RolesModule } from '../roles/roles.module';
import { HandbookModule } from '../handbook/handbook.module';
import { OrganizationModule } from '../organization/organization.module';
import { ProjectModule } from 'src/modules/project/project.module';

// TODO да, Global - это жесть, но нужно для работы Гвардов. В идеале в Гварды нужно красиво заинжектить UserService
@Global()
@Module({
  providers: [
    {
      provide: KFI.USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: KFI.USER_SERVICE,
      useClass: UserService,
    },
  ],
  controllers: [UserController],
  imports: [RolesModule, WorkspaceModule, OrganizationModule, ProjectModule, HandbookModule],
  exports: [KFI.USER_SERVICE],
})
export class UserModule {}
