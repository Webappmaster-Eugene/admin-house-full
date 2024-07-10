import { Inject, Injectable } from '@nestjs/common';
import { WorkspaceEntity } from './entities/workspace.entity';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { KFI } from '../../common/utils/di';
import { IWorkspaceRepository } from './types/workspace.repository.interface';
import { WorkspaceUpdateRequestDto } from './dto/controller/update-workspace.dto';
import { WorkspaceChangeOwnerRequestDto } from './dto/controller/change-owner-workspace.dto';
import { IWorkspaceService } from './types/workspace.service.interface';
import { WorkspaceCreateRequestDto } from './dto/controller/create-workspace.dto';
import { TransactionDbClient } from '../../common/types/transaction-prisma-client.type';
import { IQueryParams } from '../../common/decorators/query-params.decorator';

@Injectable()
export class WorkspaceService implements IWorkspaceService {
  constructor(
    @Inject(KFI.WORKSPACE_REPOSITORY)
    private readonly workspaceRepository: IWorkspaceRepository,
  ) {}

  async getById(workspaceId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<WorkspaceEntity>> {
    const findedWorkspace = await this.workspaceRepository.getById(workspaceId);
    return new InternalResponse(findedWorkspace);
  }

  async getByManagerId(managerId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<WorkspaceEntity>> {
    const findedWorkspace = await this.workspaceRepository.getByManagerId(managerId);
    return new InternalResponse(findedWorkspace);
  }

  async getAll(queryParams?: IQueryParams): Promise<UniversalInternalResponse<WorkspaceEntity[]>> {
    const { skip, take } = queryParams;
    const allWorkspaces = await this.workspaceRepository.getAll(skip, take);
    return new InternalResponse(allWorkspaces);
  }

  // DOC для создания Workspace нужно указать id пользователя (менеджера), для которого создается Workspace
  async create(
    dto: WorkspaceCreateRequestDto,
    userId: EntityUrlParamCommand.RequestUuidParam,
    transactionDbClient?: TransactionDbClient,
  ): Promise<UniversalInternalResponse<WorkspaceEntity>> {
    const createdWorkspace = await this.workspaceRepository.create(dto, userId, transactionDbClient);
    return new InternalResponse(createdWorkspace);
  }

  async updateById(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceUpdateRequestDto,
    transactionDbClient?: TransactionDbClient,
  ): Promise<UniversalInternalResponse<WorkspaceEntity>> {
    const updatedWorkspace = await this.workspaceRepository.updateById(workspaceId, dto, transactionDbClient);
    return new InternalResponse(updatedWorkspace);
  }

  async deleteById(workspaceId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<WorkspaceEntity>> {
    const deletedWorkspace = await this.workspaceRepository.deleteById(workspaceId);
    return new InternalResponse(deletedWorkspace);
  }

  async changeWorkspaceOwner(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceChangeOwnerRequestDto,
  ): Promise<UniversalInternalResponse<WorkspaceEntity>> {
    // TODO Этого мало, нужно еще у старого пользователя все поменять, а новому передать handbook и следить за истинностью данных. Для этого нужно будет перенести в Users данную ручку (чтобы избежать кольцевых зависимостей)
    const updatedWorkspace = await this.workspaceRepository.changeWorkspaceOwner(workspaceId, dto);
    return new InternalResponse(updatedWorkspace);
  }
}
