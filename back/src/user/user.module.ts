import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RolesModule } from '../roles/roles.module';

@Module({
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService],
  imports: [PrismaModule, RolesModule],
  exports: [],
})
export class UserModule {}
