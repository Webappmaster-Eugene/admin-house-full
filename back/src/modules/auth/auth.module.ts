import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { KFI } from '../../common/utils/di';
import { AuthRepository } from './auth.repository';
import { UserModule } from '../user/user.module';

// TODO да, Global - это жесть, но нужно для работы Гвардов. В идеале в Гварды нужно красиво заинжектить WorkspaceService
// TODO - это нужно для того, чтобы в гвардах получить доступ к AuthService (или UserService) для соответствующих проверок в контроллерах
@Global()
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
  imports: [UserModule],
  exports: [KFI.AUTH_SERVICE],
})
export class AuthModule {}
