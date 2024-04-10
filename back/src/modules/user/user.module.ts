import { ClassSerializerInterceptor, Logger, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { WorkspaceModule } from '../workspace/workspace.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRepository } from './user.repository';
import { RolesModule } from '../roles/roles.module';

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
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  controllers: [UserController],
  imports: [RolesModule, WorkspaceModule],
  exports: [KEYS_FOR_INJECTION.I_USER_SERVICE],
})
export class UserModule {}
