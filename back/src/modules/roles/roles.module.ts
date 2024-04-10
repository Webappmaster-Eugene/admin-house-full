import { Logger, ClassSerializerInterceptor, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RolesRepository } from './roles.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { ZodSerializerInterceptor } from 'nestjs-zod';

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
      provide: KEYS_FOR_INJECTION.I_ROLE_REPOSITORY,
      useClass: RolesRepository,
    },
    {
      provide: KEYS_FOR_INJECTION.I_ROLE_SERVICE,
      useClass: RolesService,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ClassSerializerInterceptor,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ZodSerializerInterceptor,
    // },
  ],
  imports: [],
  controllers: [RolesController],
  exports: [KEYS_FOR_INJECTION.I_ROLE_SERVICE],
})
export class RolesModule {}
