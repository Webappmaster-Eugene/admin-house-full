import { Logger, ClassSerializerInterceptor, Module } from '@nestjs/common';
import { RolesService } from './projects.service';
import { RolesController } from './projects.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { IRoleService } from './types/project.service.interface';
import { RolesRepository } from './projects.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';

@Module({
  imports: [PrismaModule],
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
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  controllers: [RolesController],
  exports: [KEYS_FOR_INJECTION.I_ROLE_SERVICE],
})
export class RolesModule {}
