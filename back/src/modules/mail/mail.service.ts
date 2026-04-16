import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { IMailService } from './mail.service.interface';
import { IConfigService } from '../../common/types/main/config.service.interface';

@Injectable()
export class MailService implements IMailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService<IConfigService>) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: Number(this.configService.get<string>('SMTP_PORT')),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
    });
  }

  async sendResetCode(email: string, code: string): Promise<void> {
    const from = this.configService.get<string>('SMTP_FROM') || 'Admin House <noreply@hhos.ru>';

    await this.transporter.sendMail({
      from,
      to: email,
      subject: 'Код для сброса пароля — Admin House',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="color: #1877F2; margin-bottom: 24px;">Сброс пароля</h2>
          <p style="font-size: 16px; color: #333;">
            Вы запросили сброс пароля для вашего аккаунта в <strong>Admin House</strong>.
          </p>
          <div style="background: #f5f5f5; border-radius: 8px; padding: 24px; text-align: center; margin: 24px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1877F2;">
              ${code}
            </span>
          </div>
          <p style="font-size: 14px; color: #666;">
            Код действителен в течение <strong>15 минут</strong>.
          </p>
          <p style="font-size: 14px; color: #666;">
            Если вы не запрашивали сброс пароля, проигнорируйте это письмо.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="font-size: 12px; color: #999; text-align: center;">
            Admin House &mdash; SaaS для управления строительными проектами
          </p>
        </div>
      `,
    });
  }
}
