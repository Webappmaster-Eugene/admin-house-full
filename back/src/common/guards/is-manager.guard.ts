import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPrismaService } from '../types/main/prisma.interface';
import { KEYS_FOR_INJECTION } from '../utils/di';
import { MANAGER_ROLE_ID } from '../consts/consts';
import { ILogger } from '../types/main/logger.interface';
import { jsonStringify } from '../helpers/stringify';

@Injectable()
export class IsManagerInBodyGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private prismaService: IPrismaService,
    @Inject(KEYS_FOR_INJECTION.I_LOGGER) private readonly logger: ILogger,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      // достаем uuid нового потенциального владельца workspace
      const bodyUuid = context.switchToHttp().getRequest().body['uuid'];

      const newOwner = await this.prismaService.user.findUnique({
        where: {
          uuid: bodyUuid,
        },
        select: {
          role: {
            select: {
              idRole: true,
            },
          },
        },
      });

      // новый владелец менеджер?
      return newOwner.role.idRole === MANAGER_ROLE_ID;
    } catch (error) {
      this.logger.error(jsonStringify(error));
      return false;
    }
  }
}
