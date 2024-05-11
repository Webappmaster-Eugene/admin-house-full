import { Inject, Injectable } from '@nestjs/common';
import { WorkspaceEntity } from './entities/workspace.entity';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { KFI } from '../../common/utils/di';
import { IWorkspaceRepository } from './types/workspace.repository.interface';
import { WorkspaceUpdateRequestDto } from './dto/controller/update-workspace.dto';
import { WorkspaceChangeOwnerRequestDto } from './dto/controller/change-owner-workspace.dto';
import { IWorkspaceService } from './types/workspace.service.interface';
import { WorkspaceCreateRequestDto } from './dto/controller/create-workspace.dto';
import { TransactionDbClient } from '../../common/types/transaction-prisma-client.type';

@Injectable()
export class WorkspaceService implements IWorkspaceService {
  constructor(
    @Inject(KFI.WORKSPACE_REPOSITORY)
    private readonly workspaceRepository: IWorkspaceRepository,
  ) {}

  async getById(workspaceId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<WorkspaceEntity>> {
    const findedWorkspace = await this.workspaceRepository.getById(workspaceId);
    return new InternalResponse<WorkspaceEntity>(findedWorkspace);
  }

  async getByManagerId(managerId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<WorkspaceEntity>> {
    const findedWorkspace = await this.workspaceRepository.getByManagerId(managerId);
    return new InternalResponse<WorkspaceEntity>(findedWorkspace);
  }

  async getAll(): Promise<UniversalInternalResponse<WorkspaceEntity[]>> {
    const allWorkspaces = await this.workspaceRepository.getAll();
    return new InternalResponse<WorkspaceEntity[]>(allWorkspaces);
  }

  // для создания Workspace нужно указать id пользователя (менеджера), для которого создается Workspace
  async create(
    dto: WorkspaceCreateRequestDto,
    userId: EntityUrlParamCommand.RequestUuidParam,
    transactionDbClient?: TransactionDbClient,
  ): Promise<UniversalInternalResponse<WorkspaceEntity>> {
    const createdWorkspace = await this.workspaceRepository.create(dto, userId, transactionDbClient);
    return new InternalResponse<WorkspaceEntity>(createdWorkspace);
  }

  async updateById(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceUpdateRequestDto,
  ): Promise<UniversalInternalResponse<WorkspaceEntity>> {
    const updatedWorkspace = await this.workspaceRepository.updateById(workspaceId, dto);
    return new InternalResponse<WorkspaceEntity>(updatedWorkspace);
  }

  async deleteById(workspaceId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<WorkspaceEntity>> {
    const deletedWorkspace = await this.workspaceRepository.deleteById(workspaceId);
    return new InternalResponse<WorkspaceEntity>(deletedWorkspace);
  }

  async changeWorkspaceOwner(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceChangeOwnerRequestDto,
  ): Promise<UniversalInternalResponse<WorkspaceEntity>> {
    // Этого мало, нужно еще у старого пользователя все поменять, а новому передать handbook и следить за истинностью данных. Для этого нужно будет перенести в Users данную ручку (чтобы избежать кольцевых зависимостей)
    const updatedWorkspace = await this.workspaceRepository.changeWorkspaceOwner(workspaceId, dto);
    return new InternalResponse<WorkspaceEntity>(updatedWorkspace);
  }
}
