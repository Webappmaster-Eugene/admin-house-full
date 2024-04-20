import { ClassSerializerInterceptor, Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaService } from '../common/prisma/prisma.service';
import { AuthRepository } from './auth.repository';
import { UserModule } from '../user/user.module';
import { RolesModule } from '../roles/roles.module';

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
  ],
  imports: [UserModule, RolesModule],
  exports: [KEYS_FOR_INJECTION.I_AUTH_SERVICE],
})
export class AuthModule {}
