import { Inject, Injectable } from '@nestjs/common';
import { EUserTypeVariants } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { RoleEntity } from './entities/role.entity';
import { IRoleService } from './types/role.service.interface';
import { RoleCreateRequestDto } from './dto/controller/create-role.dto';
import { IConfigService } from '../../common/types/main/config.service.interface';
import { IRoleRepository } from './types/role.repository.interface';
import {
  InternalResponse,
  UniversalInternalResponse,
} from '../../common/types/responses/universal-internal-response.interface';
import { RoleUpdateRequestDto } from './dto/controller/update-role.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import {
  BackendErrorNames,
  InternalError,
} from '../../common/errors/errors.backend';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';

@Injectable()
export class RolesService implements IRoleService {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
    private readonly configService: ConfigService<IConfigService>,
  ) {}

  checkIsAdminSecretKey(key: string): boolean {
    return key === this.configService.get('STRICT_ADMIN_KEY');
  }

  async getById(
    roleId: EntityUrlParamCommand.RequestNumberParam,
  ): Promise<UniversalInternalResponse<RoleEntity>> {
    const concreteRole = await this.roleRepository.getById(roleId);
    return new InternalResponse<RoleEntity>(concreteRole);
  }

  async getByUuid(
    roleUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<RoleEntity>> {
    const concreteRole = await this.roleRepository.getByUuid(roleUuid);
    return new InternalResponse<RoleEntity>(concreteRole);
  }

  async getByValue(
    value: EUserTypeVariants,
  ): Promise<UniversalInternalResponse<RoleEntity>> {
    const concreteRole = await this.roleRepository.getByValue(value);
    return new InternalResponse<RoleEntity>(concreteRole);
  }

  async getAll(): Promise<UniversalInternalResponse<RoleEntity[]>> {
    const allRoles = await this.roleRepository.getAll();
    //const allRolesCount = await this.roleRepository.getAllCount();
    return new InternalResponse<RoleEntity[]>(allRoles);
  }

  async create(
    dto: RoleCreateRequestDto,
  ): Promise<UniversalInternalResponse<RoleEntity>> {
    if (this.checkIsAdminSecretKey(dto.key)) {
      const newRole = await this.roleRepository.create(dto);
      return new InternalResponse<RoleEntity>(newRole);
    } else {
      throw new InternalResponse(
        null,
        false,
        new InternalError(BackendErrorNames.UNAUTHORIZED_ACCESS),
      );
    }
  }

  async updateById(
    roleUuid: EntityUrlParamCommand.RequestUuidParam,
    dto: RoleUpdateRequestDto,
  ): Promise<UniversalInternalResponse<RoleEntity>> {
    const updatedRole = await this.roleRepository.updateById(roleUuid, dto);
    return new InternalResponse<RoleEntity>(updatedRole);
  }

  async deleteById(
    roleUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<RoleEntity>> {
    const deletedRole = await this.roleRepository.deleteById(roleUuid);
    return new InternalResponse<RoleEntity>(deletedRole);
  }
}
