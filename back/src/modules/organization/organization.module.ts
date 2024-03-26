import { ClassSerializerInterceptor, Logger, Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  providers: [
    OrganizationService,
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  controllers: [OrganizationController],
  imports: [PrismaModule],
  exports: [OrganizationService],
})
export class OrganizationModule {}
