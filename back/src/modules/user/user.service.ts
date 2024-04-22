import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { IWorkspaceService } from '../workspace/types/workspace.service.interface';
import { DEFAULT_ROLE_ID } from '../../common/consts/consts';
import { IUserRepository } from './types/user.repository.interface';
import {
  InternalResponse,
  UniversalInternalResponse,
} from '../../common/types/responses/universal-internal-response.interface';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { IUserService } from './types/user.service.interface';
import { UserCreateRequestDto } from './dto/controller/create-user.dto';
import { UserUpdateRequestDto } from './dto/controller/update-user.dto';
import { IRoleService } from '../roles/types/role.service.interface';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { IHandbookService } from '../handbook/types/handbook.service.interface';
import * as argon2 from 'argon2';
import { AddUserToWorkspaceRequestDto } from './dto/controller/add-to-workspace.dto';
import { IOrganizationService } from '../organization/types/organization.service.interface';
import {
  BackendErrorNames,
  InternalError,
} from '../../common/errors/errors.backend';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(KEYS_FOR_INJECTION.I_ROLE_SERVICE)
    private readonly roleService: IRoleService,
    @Inject(KEYS_FOR_INJECTION.I_WORKSPACE_SERVICE)
    private readonly workspaceService: IWorkspaceService,
    @Inject(KEYS_FOR_INJECTION.I_ORGANIZATION_SERVICE)
    private readonly organizationService: IOrganizationService,
    @Inject(KEYS_FOR_INJECTION.I_HANDBOOK_SERVICE)
    private readonly handbookService: IHandbookService,
  ) {}

  async getById(
    userId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    const concreteUser = await this.userRepository.getById(userId);
    return new InternalResponse<UserEntity>(concreteUser);
  }

  async getByEmail(
    userEmail: EntityUrlParamCommand.RequestEmailParam,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    const concreteUser = await this.userRepository.getByEmail(userEmail);
    return new InternalResponse<UserEntity>(concreteUser);
  }

  async getAll(): Promise<UniversalInternalResponse<UserEntity[]>> {
    const allUsers = await this.userRepository.getAll();
    return new InternalResponse<UserEntity[]>(allUsers);
  }

  async create(
    dto: UserCreateRequestDto,
    roleId?: EntityUrlParamCommand.RequestNumberParam,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    let newUserWithWorkspaceAndHandbook: UniversalInternalResponse<UserEntity> | null =
      null;

    const roleNumberId = roleId ? roleId : DEFAULT_ROLE_ID;

    const role = await this.roleService.getById(roleNumberId);

    dto.password = await argon2.hash(dto.password);
    const roleUuid = role.data.uuid;

    const createdUser = await this.userRepository.create(dto, roleUuid);

    if (roleNumberId === 2) {
      const newManagerWorkspace = await this.workspaceService.create(
        { name: null, description: null },
        createdUser.uuid,
      );

      const newWorkspaceInfo = newManagerWorkspace.data;

      const newManagerHandbook = await this.handbookService.create(
        {
          name: null,
          description: null,
          canCustomerView: false,
          workspaceUuid: newWorkspaceInfo.uuid,
        },
        createdUser.uuid,
      );

      const newHandbookInfo = newManagerHandbook.data;

      const updatedWorkspace = await this.workspaceService.updateById(
        newWorkspaceInfo.uuid,
        { handbookOfWorkspaceUuid: newHandbookInfo.uuid },
      );

      newUserWithWorkspaceAndHandbook = await this.addExistedWorkspaceToManager(
        createdUser.uuid,
        newWorkspaceInfo.uuid,
      );

      newUserWithWorkspaceAndHandbook = await this.addExistedHandbookToManager(
        createdUser.uuid,
        newHandbookInfo.uuid,
      );
    }

    if (newUserWithWorkspaceAndHandbook) {
      const { data } = newUserWithWorkspaceAndHandbook;
      return new InternalResponse<UserEntity>(data);
    } else {
      return new InternalResponse<UserEntity>(createdUser);
    }
  }

  async updateById(
    userId: EntityUrlParamCommand.RequestUuidParam,
    dto: UserUpdateRequestDto,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    const updatedUser = await this.userRepository.updateById(userId, dto);
    return new InternalResponse<UserEntity>(updatedUser);
  }

  async deleteById(
    userId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    const deletedUser = await this.userRepository.deleteById(userId);
    return new InternalResponse<UserEntity>(deletedUser);
  }
  async addExistedWorkspaceToManager(
    workspaceCreatorId: EntityUrlParamCommand.RequestUuidParam,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    const updatedUserWithWorkspace =
      await this.userRepository.addExistedWorkspaceToManager(
        workspaceCreatorId,
        workspaceId,
      );
    return new InternalResponse<UserEntity>(updatedUserWithWorkspace);
  }

  async addExistedHandbookToManager(
    handbookCreatorId: EntityUrlParamCommand.RequestUuidParam,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    const updatedUserWithHandbook =
      await this.userRepository.addExistedHandbookToManager(
        handbookCreatorId,
        handbookId,
      );
    return new InternalResponse<UserEntity>(updatedUserWithHandbook);
  }

  async addUserToManagerWorkspace(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    dto: AddUserToWorkspaceRequestDto,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    const findedUser = await this.userRepository.getById(dto.uuid);

    if (!findedUser.memberOfWorkspaceUuid) {
      const dtoToUpdateUser = { memberOfWorkspaceUuid: workspaceId };
      const updatedUser = await this.userRepository.updateById(
        dto.uuid,
        dtoToUpdateUser,
      );
      return new InternalResponse<UserEntity>(updatedUser);
    } else {
      throw new InternalResponse(
        null,
        false,
        new InternalError(BackendErrorNames.WORKSPACE_MISMATCH),
      );
    }
  }

  async addUserToManagerOrganization(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    dto: AddUserToWorkspaceRequestDto,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    const findedUser = await this.userRepository.getById(dto.uuid);

    if (findedUser.memberOfWorkspaceUuid === workspaceId) {
      const dtoToUpdateUser = { memberOfOrganizationUuid: organizationId };
      const updatedUser = await this.userRepository.updateById(
        dto.uuid,
        dtoToUpdateUser,
      );
      return new InternalResponse<UserEntity>(updatedUser);
    } else {
      throw new InternalResponse(
        null,
        false,
        new InternalError(BackendErrorNames.WORKSPACE_MISMATCH),
      );
    }
  }

  async addUserToManagerProject(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    projectId: EntityUrlParamCommand.RequestUuidParam,
    dto: AddUserToWorkspaceRequestDto,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    const findedUser = await this.userRepository.getById(dto.uuid);

    if (
      findedUser.memberOfWorkspaceUuid === workspaceId &&
      findedUser.memberOfOrganizationUuid === organizationId
    ) {
      const dtoToUpdateUser = { memberOfProjectUuid: projectId };
      const updatedUser = await this.userRepository.updateById(
        dto.uuid,
        dtoToUpdateUser,
      );
      return new InternalResponse<UserEntity>(updatedUser);
    } else {
      throw new InternalResponse(
        null,
        false,
        new InternalError(BackendErrorNames.WORKSPACE_MISMATCH),
      );
    }
  }
}
