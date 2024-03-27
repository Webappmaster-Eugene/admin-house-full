import { ClassSerializerInterceptor, Logger, Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  providers: [
    ProjectService,
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  controllers: [ProjectController],
  imports: [PrismaModule],
  exports: [ProjectService],
})
export class ProjectModule {}
