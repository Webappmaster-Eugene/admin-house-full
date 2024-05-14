import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { KFI } from '../../common/utils/di';
import { AuthRepository } from './auth.repository';
import { UserModule } from '../user/user.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: KFI.AUTH_REPOSITORY,
      useClass: AuthRepository,
    },
    {
      provide: KFI.AUTH_SERVICE,
      useClass: AuthService,
    },
  ],
  imports: [UserModule, RolesModule],
  exports: [KFI.AUTH_SERVICE],
})
export class AuthModule {}
