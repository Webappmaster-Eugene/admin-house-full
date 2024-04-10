import { Inject, Injectable } from '@nestjs/common';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IAuthRepository } from './types/auth.repository.interface';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly prismaService: IPrismaService,
  ) {}

  async generateStrictAdminKey(strictKey: string): Promise<{ key: string }> {
    const { key } = await this.prismaService.registerWithRoleKey.create({
      data: {
        key: strictKey,
      },
    });
    return { key };
  }

  async getStrictAdminKey(): Promise<{ key: string }> {
    const { key } = await this.prismaService.registerWithRoleKey.findFirst();
    return { key };
  }
}
