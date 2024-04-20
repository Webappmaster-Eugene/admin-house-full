import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { KEYS_FOR_INJECTION } from '../../../common/utils/di';

@Module({
  imports: [ConfigModule],
  providers: [
    // PrismaService,
    {
      provide: KEYS_FOR_INJECTION.I_PRISMA_SERVICE,
      useClass: PrismaService,
    },
  ],
  exports: [
    // PrismaService,
    KEYS_FOR_INJECTION.I_PRISMA_SERVICE,
  ],
})
export class PrismaModule {}
