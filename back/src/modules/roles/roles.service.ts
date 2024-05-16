import { Inject, Injectable } from '@nestjs/common';
import { EUserTypeVariants } from '.prisma/client';
import { ConfigService } from '@nestjs/config';
import { RoleEntity } from './entities/role.entity';
import { IRoleService } from './types/role.service.interface';
import { RoleCreateRequestDto } from './dto/controller/create-role.dto';
import { IConfigService } from '../../common/types/main/config.service.interface';
import { IRoleRepository } from './types/role.repository.interface';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { RoleUpdateRequestDto } from './dto/controller/update-role.dto';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { BackendErrorNames, InternalError } from '../../common/errors/errors.backend';
import { KFI } from '../../common/utils/di';
import { CACHE_KEYS } from '../../common/consts/cache-keys';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

@Injectable()
export class RolesService implements IRoleService {
  constructor(
    @Inject(KFI.ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
    private readonly configService: ConfigService<IConfigService>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: CacheStore,
  ) {}

  checkIsAdminSecretKey(key: string): boolean {
    return key === this.configService.get('STRICT_ADMIN_KEY');
  }

  async getById(roleId: EntityUrlParamCommand.RequestNumberParam): Promise<UniversalInternalResponse<RoleEntity>> {
    const concreteRole = await this.roleRepository.getById(roleId);
    return new InternalResponse(concreteRole);
  }

  async getByUuid(roleUuid: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<RoleEntity>> {
    const concreteRole = await this.roleRepository.getByUuid(roleUuid);
    return new InternalResponse(concreteRole);
  }

  async getByValue(value: EUserTypeVariants): Promise<UniversalInternalResponse<RoleEntity>> {
    const concreteRole = await this.roleRepository.getByValue(value);
    return new InternalResponse(concreteRole);
  }

  async getAll(): Promise<UniversalInternalResponse<RoleEntity[]>> {
    const cachedData: RoleEntity[] = await this.cacheManager.get(CACHE_KEYS.ROLE_ALL);
    if (cachedData) {
      return new InternalResponse(cachedData);
    }
    const allRoles = await this.roleRepository.getAll();
    await this.cacheManager.set(CACHE_KEYS.ROLE_ALL, allRoles);
    //const allRolesCount = await this.roleRepository.getAllCount();
    return new InternalResponse(allRoles);
  }

  async create(dto: RoleCreateRequestDto): Promise<UniversalInternalResponse<RoleEntity>> {
    if (this.checkIsAdminSecretKey(dto.key)) {
      const newRole = await this.roleRepository.create(dto);
      return new InternalResponse(newRole);
    } else {
      throw new InternalResponse(new InternalError(BackendErrorNames.UNAUTHORIZED_ACCESS));
    }
  }

  async updateById(
    roleUuid: EntityUrlParamCommand.RequestUuidParam,
    dto: RoleUpdateRequestDto,
  ): Promise<UniversalInternalResponse<RoleEntity>> {
    const updatedRole = await this.roleRepository.updateById(roleUuid, dto);
    return new InternalResponse(updatedRole);
  }

  async deleteById(roleUuid: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<RoleEntity>> {
    const deletedRole = await this.roleRepository.deleteById(roleUuid);
    return new InternalResponse(deletedRole);
  }
}
