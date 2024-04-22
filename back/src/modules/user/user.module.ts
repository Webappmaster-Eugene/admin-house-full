import { Logger, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { WorkspaceModule } from '../workspace/workspace.module';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { PrismaService } from '../common/prisma/prisma.service';
import { UserRepository } from './user.repository';
import { RolesModule } from '../roles/roles.module';
import { HandbookModule } from '../handbook/handbook.module';
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
      provide: KEYS_FOR_INJECTION.I_USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: KEYS_FOR_INJECTION.I_USER_SERVICE,
      useClass: UserService,
    },
  ],
  controllers: [UserController],
  imports: [RolesModule, WorkspaceModule, OrganizationModule, HandbookModule],
  exports: [KEYS_FOR_INJECTION.I_USER_SERVICE],
})
export class UserModule {}
