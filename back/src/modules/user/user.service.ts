import { HttpException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from './entities/user.entity';
import { IWorkspaceService } from '../workspace/types/workspace.service.interface';
import { ILogger } from '../../common/types/main/logger.interface';
import { DEFAULT_ROLE_ID } from '../../common/consts/consts';
import { IUserRepository } from './types/user.repository.interface';
import {
  InternalResponse,
  UniversalInternalResponse,
} from '../../common/types/responses/universal-internal-response.interface';
import { BACKEND_ERRORS } from '../../common/errors/errors.backend';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { IUserService } from './types/user.service.interface';
import { IConfigService } from '../../common/types/main/config.service.interface';
import { UserCreateRequestDto } from './dto/controller/create-user.dto';
import { UserUpdateRequestDto } from './dto/controller/update-user.dto';
import { IRoleService } from '../roles/types/role.service.interface';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { ZodSerializerDto } from 'nestjs-zod';
import { RoleGetResponseReturnDto } from '../roles/dto/controller/get-role.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(KEYS_FOR_INJECTION.I_LOGGER) private readonly logger: ILogger,
    private readonly configService: ConfigService<IConfigService>,
    @Inject(KEYS_FOR_INJECTION.I_ROLE_SERVICE)
    private readonly roleService: IRoleService,
    @Inject(KEYS_FOR_INJECTION.I_WORKSPACE_SERVICE)
    private readonly workspaceService: IWorkspaceService,
  ) {}

  async getById(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<UserEntity | null>> {
    try {
      const concreteUser = await this.userRepository.getById(id);
      return new InternalResponse<UserEntity>(concreteUser);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.USER.USER_NOT_GETTED_BY_ID,
      );
    }
  }

  async getByEmail(
    email: EntityUrlParamCommand.RequestEmailParam,
  ): Promise<UniversalInternalResponse<UserEntity | null>> {
    try {
      const concreteUser = await this.userRepository.getByEmail(email);
      return new InternalResponse<UserEntity>(concreteUser);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.USER.USER_NOT_GETTED_BY_EMAIL,
      );
    }
  }

  async getAll(): Promise<UniversalInternalResponse<UserEntity[] | null>> {
    try {
      const allUsers = await this.userRepository.getAll();
      return new InternalResponse<UserEntity[]>(allUsers);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.USER.ALL_USERS_NOT_GETTED,
      );
    }
  }

  async create(
    dto: UserCreateRequestDto,
    roleId?: EntityUrlParamCommand.RequestNumberParam,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    let newUserWithWorkspace: null | UniversalInternalResponse<UserEntity> =
      null;

    try {
      const roleNumberId = roleId ? roleId : DEFAULT_ROLE_ID;
      const role = await this.roleService.getById(roleNumberId);

      dto.password = await bcrypt.hash(dto.password, 10);
      dto.roleUuid = role.data.uuid;

      const createdUser = await this.userRepository.create(dto);

      if (roleNumberId === 2) {
        const newUserWorkspace = await this.workspaceService.create(
          { name: null, description: null },
          createdUser.uuid,
        );

        newUserWithWorkspace = await this.addExistedWorkspaceToManager(
          createdUser.uuid,
          newUserWorkspace.data.uuid,
        );
      }

      if (newUserWithWorkspace) {
        const { data } = newUserWithWorkspace;
        return new InternalResponse<UserEntity>(data);
      } else {
        return new InternalResponse<UserEntity>(createdUser);
      }
    } catch (error: any | string) {
      return new InternalResponse(null, false, {
        code: 'P2002',
        message: error.message,
        httpCode: 500,
      });
      //     code: 'P2002',
      //     message: objError.message,
      //     httpCode: 500,
      //   });
      // const objError = JSON.parse(error as string);
      // const code = objError.code;
      // if (error instanceof HttpException && code === 'P2002') {
      //   return new InternalResponse(null, false, {
      //     code: 'P2002',
      //     message: objError.message,
      //     httpCode: 500,
      //   });
      // }
    }
  }

  async updateById(
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: UserUpdateRequestDto,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    try {
      const updatedUser = await this.userRepository.updateById(id, dto);
      return new InternalResponse<UserEntity>(updatedUser);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.USER.USER_NOT_UPDATED,
      );
    }
  }

  async deleteById(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    try {
      const deletedUser = await this.userRepository.deleteById(id);
      return new InternalResponse<UserEntity>(deletedUser);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.USER.USER_NOT_GETTED_BY_ID,
      );
    }
  }
  async addExistedWorkspaceToManager(
    workspaceCreatorId: EntityUrlParamCommand.RequestUuidParam,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    try {
      const updatedUserWithWorkspace =
        await this.userRepository.addExistedWorkspaceToManager(
          workspaceId,
          workspaceCreatorId,
        );
      //return updatedUserWithWorkspace;
      return new InternalResponse<UserEntity>(updatedUserWithWorkspace);
    } catch (error) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.USER.USER_NOT_GETTED_BY_ID,
      );
    }
  }
}
