import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PasswordResetCode } from '.prisma/client';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IAuthRepository } from './types/auth.repository.interface';
import { KFI } from '../../common/utils/di';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async generateStrictAdminKey(oldKey: string, newKey: string): Promise<{ key: string }> {
    const { key } = await this.databaseService.registerWithRoleKey.update({
      where: {
        key: oldKey,
      },
      data: {
        key: newKey,
      },
    });
    return { key };
  }

  async getStrictAdminKey(): Promise<{ key: string }> {
    try {
      const { key } = await this.databaseService.registerWithRoleKey.findFirst();
      if (key) {
        return { key };
      } else {
        throw new NotFoundException({
          message: `Strict admin key not found`,
          description: 'Strict admin key from your request did not found in the database',
        });
      }
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async createPasswordResetCode(email: string, code: string, expiresAt: Date): Promise<PasswordResetCode> {
    return this.databaseService.passwordResetCode.create({
      data: { email, code, expiresAt },
    });
  }

  async findValidResetCode(email: string, code: string): Promise<PasswordResetCode | null> {
    return this.databaseService.passwordResetCode.findFirst({
      where: {
        email,
        code,
        used: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markResetCodeAsUsed(uuid: string): Promise<void> {
    await this.databaseService.passwordResetCode.update({
      where: { uuid },
      data: { used: true },
    });
  }

  async deleteExpiredResetCodes(email: string): Promise<void> {
    await this.databaseService.passwordResetCode.deleteMany({
      where: {
        email,
        OR: [{ used: true }, { expiresAt: { lt: new Date() } }],
      },
    });
  }

  async updateUserPassword(userUuid: string, hashedPassword: string): Promise<void> {
    await this.databaseService.user.update({
      where: { uuid: userUuid },
      data: { password: hashedPassword },
    });
  }

  async findUserByEmail(email: string): Promise<{ uuid: string; email: string; password: string } | null> {
    return this.databaseService.user.findUnique({
      where: { email },
      select: { uuid: true, email: true, password: true },
    });
  }
}
