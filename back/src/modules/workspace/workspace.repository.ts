import { Inject, Injectable } from '@nestjs/common';
import { WorkspaceCreateRequestDto } from './dto/controller/create-workspace.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IWorkspaceRepository } from './types/workspace.repository.interface';
import { WorkspaceUpdateRequestDto } from './dto/controller/update-workspace.dto';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { WorkspaceEntity } from './entities/workspace.entity';
import { DEFAULT_WORKSPACE_DESCRIPTION, DEFAULT_WORKSPACE_NAME } from './lib/consts/workspace.default-data';
import { WorkspaceChangeOwnerRequestDto } from './dto/controller/change-owner-workspace.dto';
import { KFI } from '../../common/utils/di';
import { TransactionDbClient } from '../../common/types/transaction-prisma-client.type';
import { QUANTITY_LIMIT } from '../../common/consts/take-quantity.limitation';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { EntityName } from '../../common/types/entity.enum';
import { existenceEntityHandler } from '../../common/helpers/handlers/existance-entity-handler';
import { limitTakeHandler } from '../../common/helpers/handlers/take-limit.handler';

@Injectable()
export class WorkspaceRepository implements IWorkspaceRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(workspaceId: EntityUrlParamCommand.RequestUuidParam): Promise<WorkspaceEntity> {
    try {
      const findedWorkspace = await this.databaseService.workspace.findUnique({
        where: {
          uuid: workspaceId,
        },
      });

      return existenceEntityHandler(findedWorkspace, WorkspaceEntity, EntityName.WORKSPACE) as WorkspaceEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getByManagerId(managerId: EntityUrlParamCommand.RequestUuidParam): Promise<WorkspaceEntity> {
    try {
      const findedWorkspace = await this.databaseService.workspace.findUnique({
        where: {
          workspaceCreatorUuid: managerId,
        },
      });

      return existenceEntityHandler(findedWorkspace, WorkspaceEntity, EntityName.WORKSPACE) as WorkspaceEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAll(skip = 0, take = QUANTITY_LIMIT.TAKE_5): Promise<WorkspaceEntity[]> {
    limitTakeHandler(take);

    try {
      const allWorkspaces = await this.databaseService.workspace.findMany({ take, skip });
      return existenceEntityHandler(allWorkspaces, WorkspaceEntity, EntityName.WORKSPACE) as WorkspaceEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAllCount(): Promise<CountData> {
    try {
      const total = await this.databaseService.workspace.count({
        select: {
          _all: true, // Count all records
        },
      });
      return { total: total._all };
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async create(
    { name, description }: WorkspaceCreateRequestDto,
    userId: EntityUrlParamCommand.RequestUuidParam,
    transactionDbClient: TransactionDbClient = this.databaseService,
  ): Promise<WorkspaceEntity> {
    try {
      const newWorkspace = await transactionDbClient.workspace.create({
        data: {
          name: name || DEFAULT_WORKSPACE_NAME + ` of user #${userId}`,
          description: description || DEFAULT_WORKSPACE_DESCRIPTION + ` of user #${userId}`,
          workspaceCreatorUuid: userId,
        },
      });
      return existenceEntityHandler(newWorkspace, WorkspaceEntity, EntityName.WORKSPACE) as WorkspaceEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(
    workspaceId: string,
    { name, description }: WorkspaceUpdateRequestDto,
    transactionDbClient: TransactionDbClient = this.databaseService,
  ): Promise<WorkspaceEntity> {
    try {
      const updatedWorkspace = await transactionDbClient.workspace.update({
        where: {
          uuid: workspaceId,
        },
        data: {
          name,
          description,
        },
      });

      return existenceEntityHandler(updatedWorkspace, WorkspaceEntity, EntityName.WORKSPACE) as WorkspaceEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(workspaceId: EntityUrlParamCommand.RequestUuidParam): Promise<WorkspaceEntity> {
    try {
      const deletedWorkspace = await this.databaseService.workspace.delete({
        where: {
          uuid: workspaceId,
        },
      });

      return existenceEntityHandler(deletedWorkspace, WorkspaceEntity, EntityName.WORKSPACE) as WorkspaceEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async changeWorkspaceOwner(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceChangeOwnerRequestDto,
  ): Promise<WorkspaceEntity> {
    try {
      const changedWorkspace = await this.databaseService.workspace.update({
        where: {
          uuid: workspaceId,
        },
        data: {
          workspaceCreatorUuid: dto.uuid,
        },
      });

      return existenceEntityHandler(changedWorkspace, WorkspaceEntity, EntityName.WORKSPACE) as WorkspaceEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
