import { ClassSerializerInterceptor, Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { WorkspaceRepository } from '../workspace/workspace.repository';
import { WorkspaceService } from '../workspace/workspace.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthRepository } from './auth.repository';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AuthController],
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
      provide: KEYS_FOR_INJECTION.I_AUTH_REPOSITORY,
      useClass: AuthRepository,
    },
    {
      provide: KEYS_FOR_INJECTION.I_AUTH_SERVICE,
      useClass: AuthService,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  imports: [UserModule],
  exports: [KEYS_FOR_INJECTION.I_AUTH_SERVICE],
})
export class AuthModule {}
