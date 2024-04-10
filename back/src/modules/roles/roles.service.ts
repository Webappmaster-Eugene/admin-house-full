import { Inject, Injectable, Logger } from '@nestjs/common';
import { EUserTypeVariants } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { RoleEntity } from './entities/role.entity';
import { IRoleService } from './types/role.service.interface';
import { RoleCreateRequestDto } from './dto/controller/create-role.dto';
import { IConfigService } from '../../common/types/main/config.service.interface';
import { ILogger } from '../../common/types/main/logger.interface';
import { IRoleRepository } from './types/role.repository.interface';
import {
  InternalResponse,
  UniversalInternalResponse,
} from '../../common/types/responses/universal-internal-response.interface';
import { RoleUpdateRequestDto } from './dto/controller/update-role.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { BACKEND_ERRORS } from '../../common/errors/errors.backend';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { ZodSerializerDto } from 'nestjs-zod';
import { RoleGetResponseDto } from './dto/controller/get-role.dto';

@Injectable()
export class RolesService implements IRoleService {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
    @Inject(KEYS_FOR_INJECTION.I_LOGGER) private readonly logger: ILogger,
    private readonly configService: ConfigService<IConfigService>,
  ) {}

  checkIsAdminSecretKey(key: string): boolean {
    return key === this.configService.get('STRICT_ADMIN_KEY');
  }

  async getById(
    id: EntityUrlParamCommand.RequestNumberParam,
  ): Promise<UniversalInternalResponse<RoleEntity | null>> {
    try {
      const concreteRole = await this.roleRepository.getById(id);
      return new InternalResponse<RoleEntity>(concreteRole);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.ROLE.ALL_ROLES_NOT_GETTED,
      );
    }
  }

  async getByValue(
    value: EUserTypeVariants,
  ): Promise<UniversalInternalResponse<RoleEntity | null>> {
    try {
      const concreteRole = await this.roleRepository.getByValue(value);
      return new InternalResponse<RoleEntity>(concreteRole);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.ROLE.ALL_ROLES_NOT_GETTED,
      );
    }
  }

  async getAll(): Promise<UniversalInternalResponse<RoleEntity[] | null>> {
    try {
      const allRoles = await this.roleRepository.getAll();
      //const allRolesCount = await this.roleRepository.getAllCount();
      return new InternalResponse<RoleEntity[]>(allRoles);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.ROLE.ALL_ROLES_NOT_GETTED,
      );
    }
  }

  async create(
    dto: RoleCreateRequestDto,
  ): Promise<UniversalInternalResponse<RoleEntity>> {
    if (this.checkIsAdminSecretKey(dto.key)) {
      try {
        const newRole = await this.roleRepository.create(dto);
        return new InternalResponse<RoleEntity>(newRole);
      } catch (error: unknown) {
        this.logger.error(BACKEND_ERRORS.ROLE.ROLE_NOT_CREATED.message);
        return new InternalResponse<RoleEntity>(
          null,
          false,
          BACKEND_ERRORS.ROLE.ROLE_NOT_CREATED,
        );
      }
    } else {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.ROLE.ROLE_NOT_CREATED,
      );
    }
  }

  async updateById(
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: RoleUpdateRequestDto,
  ): Promise<UniversalInternalResponse<RoleEntity>> {
    try {
      const updatedRole = await this.roleRepository.updateById(id, dto);
      return new InternalResponse<RoleEntity>(updatedRole);
    } catch (error) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.ROLE.ROLE_NOT_UPDATED,
      );
    }
  }

  async deleteById(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<RoleEntity>> {
    try {
      const deletedRole = await this.roleRepository.deleteById(id);
      return new InternalResponse<RoleEntity>(deletedRole);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.ROLE.ROLE_NOT_DELETED,
      );
    }
  }
}
