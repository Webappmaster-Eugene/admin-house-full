import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { KFI } from '../../common/utils/di';

@Global()
@Module({
  providers: [
    {
      provide: KFI.MAIL_SERVICE,
      useClass: MailService,
    },
  ],
  exports: [KFI.MAIL_SERVICE],
})
export class MailModule {}
