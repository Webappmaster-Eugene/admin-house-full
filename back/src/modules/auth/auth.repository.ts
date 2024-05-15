import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
}
