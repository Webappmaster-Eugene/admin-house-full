import { Global, Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

@Global()
@Module({
  providers: [],
  imports: [PrismaModule],
  exports: [PrismaModule],
})
export class DatabaseModule {}
