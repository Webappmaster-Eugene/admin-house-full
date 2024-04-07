import { Inject, Injectable, Logger } from '@nestjs/common';
import { EUserTypeVariants } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { RoleEntity } from './entities/project.entity';
import { IRoleService } from './types/project.service.interface';
import { RoleCreateRequestDto } from './dto/controller/create-project.dto';
import { IConfigService } from '../../common/types/main/config.service.interface';
import { ILogger } from '../../common/types/main/logger.interface';
import { IRoleRepository } from './types/project.repository.interface';
import {
  InternalResponse,
  UniversalInternalResponse,
} from '../../common/types/responses/universal-internal-response.interface';
import { RoleUpdateRequestDto } from './dto/controller/update-project.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { BACKEND_ERRORS } from '../../common/errors/errors.backend';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';

@Injectable()
export class RolesService implements IRoleService {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_USER_REPOSITORY)
    private readonly projectRepository: IRoleRepository,
    @Inject(KEYS_FOR_INJECTION.I_LOGGER) private readonly logger: ILogger,
    private readonly configService: ConfigService<IConfigService>,
  ) {}

  checkIsAdminSecretKey(key: string): boolean {
    return key === this.configService.get('STRICT_ADMIN_KEY');
  }

  async create(
    dto: RoleCreateRequestDto,
  ): Promise<UniversalInternalResponse<RoleEntity>> {
    if (this.checkIsAdminSecretKey(dto.key)) {
      try {
        const newRole = await this.projectRepository.create(dto);
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
    id: EntityUrlParamCommand.RequestParam,
    dto: RoleUpdateRequestDto,
  ): Promise<UniversalInternalResponse<RoleEntity>> {
    try {
      const updatedRole = await this.projectRepository.updateById(id, dto);
      return new InternalResponse<RoleEntity>(updatedRole);
    } catch (error) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.ROLE.ROLE_NOT_UPDATED,
      );
    }
  }

  async getAll(): Promise<UniversalInternalResponse<RoleEntity[] | null>> {
    try {
      const allRoles = await this.projectRepository.getAll();
      //const allRolesCount = await this.projectRepository.getAllCount();
      return new InternalResponse<RoleEntity[]>(allRoles);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.ROLE.ALL_ROLES_NOT_GETTED,
      );
    }
  }

  async deleteById(
    id: EntityUrlParamCommand.RequestParam,
  ): Promise<UniversalInternalResponse<RoleEntity>> {
    try {
      const deletedRole = await this.projectRepository.deleteById(id);
      return new InternalResponse<RoleEntity>(deletedRole);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.ROLE.ROLE_NOT_DELETED,
      );
    }
  }

  async getById(
    id: EntityUrlParamCommand.RequestParamNumber,
  ): Promise<UniversalInternalResponse<RoleEntity | null>> {
    try {
      const concreteRole = await this.projectRepository.getById(id);
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
      const concreteRole = await this.projectRepository.getByValue(value);
      return new InternalResponse<RoleEntity>(concreteRole);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.ROLE.ALL_ROLES_NOT_GETTED,
      );
    }
  }
}
