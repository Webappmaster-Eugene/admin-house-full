import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, Logger],
  imports: [PrismaModule],
  exports: ['IAuthService'],
})
export class AuthModule {}
