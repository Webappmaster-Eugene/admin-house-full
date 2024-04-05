import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { EUserTypeVariants, Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { RoleEntity } from './entities/role.entity';
import { IRoleService } from './types/role.service.interface';
import { RoleCreateRequestDto } from './dto/controller/create-role.dto';
import { IConfigService } from '../../common/types/main/config.service.interface';
import { ILogger } from '../../common/types/main/logger.interface';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IRoleRepository } from './types/role.repository.interface';
import {
  InternalResponse,
  UniversalInternalResponse,
} from '../../common/types/responses/universal-internal-response.interface';
import { RoleUpdateRequestDto } from './dto/controller/update-role.dto';
import { EntityGetCommand } from '../../../libs/contracts/commands/common/get-param.command';

@Injectable()
export class RolesService implements IRoleService {
  constructor(
    private readonly roleRepository: IRoleRepository,
    private readonly configService: ConfigService<IConfigService>,
    private readonly logger: ILogger,
  ) {}

  checkIsAdminSecretKey(key: string): boolean {
    return key === this.configService.get('STRICT_ADMIN_KEY');
  }

  async create(
    dto: RoleCreateRequestDto,
  ): Promise<UniversalInternalResponse<RoleEntity>> {
    if (this.checkIsAdminSecretKey(dto.key)) {
      try {
        const newRole = await this.roleRepository.create(dto);
        return new InternalResponse<RoleEntity>(newRole);
      } catch (error: unknown) {
        return new InternalResponse<RoleEntity>(null, false, 'R001');
      }
    } else {
      return new InternalResponse<RoleEntity>(null, false, 'R001');
    }
  }

  async updateById(
    id: EntityGetCommand.RequestParam,
    dto: RoleUpdateRequestDto,
  ): Promise<UniversalInternalResponse<RoleEntity>> {
    try {
      const updatedRole = await this.roleRepository.updateById(id, dto);
      return new InternalResponse<RoleEntity>(updatedRole);
    } catch (error) {
      return new InternalResponse<RoleEntity>(null, false, 'R001');
    }
  }

  async getAll(): Promise<UniversalInternalResponse<RoleEntity[] | null>> {
    try {
      const allRoles = await this.roleRepository.getAll();
      return new InternalResponse<RoleEntity[]>(allRoles);
    } catch (error: unknown) {
      return new InternalResponse(null, false, 'R001');
    }
  }

  async deleteByIds(): Promise<UniversalInternalResponse<RoleEntity[] | null>> {
    try {
      const allRoles = await this.roleRepository.getAll();
      return new InternalResponse<RoleEntity[]>(allRoles);
    } catch (error: unknown) {
      return new InternalResponse(null, false, 'R001');
    }
  }

  async getById(
    id: EntityGetCommand.RequestParam,
  ): Promise<UniversalInternalResponse<RoleEntity | null>> {
    try {
      const concreteRole = await this.roleRepository.getById(id);
      return new InternalResponse<RoleEntity>(concreteRole);
    } catch (error: unknown) {
      return new InternalResponse<RoleEntity>(null, false, 'R001');
    }
  }

  async getByValue(
    value: EUserTypeVariants,
  ): Promise<UniversalInternalResponse<RoleEntity | null>> {
    try {
      const concreteRole = await this.roleRepository.getByValue(value);
      return new InternalResponse<RoleEntity>(concreteRole);
    } catch (error: unknown) {
      return new InternalResponse<RoleEntity>(null, false, 'R001');
    }
  }
}
