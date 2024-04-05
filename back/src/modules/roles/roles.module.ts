import { Logger, ClassSerializerInterceptor, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { IRoleService } from './types/role.service.interface';

@Module({
  imports: [PrismaModule],
  providers: [
    RolesService,
    Logger,
    {
      provide: 'IRoleService',
      useClass: RolesService,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule {}
