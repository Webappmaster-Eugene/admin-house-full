import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { KFI } from '../../../common/utils/di';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: KFI.PRISMA_SERVICE,
      useClass: PrismaService,
    },
  ],
  exports: [KFI.PRISMA_SERVICE],
})
export class PrismaModule {}
