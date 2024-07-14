import { WorkspaceCreateRequestDto } from '../dto/controller/create-workspace.dto';
import { WorkspaceUpdateRequestDto } from '../dto/controller/update-workspace.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from 'libs/contracts';
import { CountData } from '../../../common/types/main/count.data';
import { WorkspaceEntity } from '../entities/workspace.entity';
import { WorkspaceChangeOwnerRequestDto } from '../dto/controller/change-owner-workspace.dto';
import { TransactionDbClient } from '../../../common/types/transaction-prisma-client.type';

export interface IWorkspaceRepository extends IRepositoryCommon<WorkspaceCreateRequestDto, WorkspaceUpdateRequestDto, WorkspaceEntity> {
  getById: (workspaceId: EntityUrlParamCommand.RequestUuidParam) => Promise<WorkspaceEntity>;
  getByManagerId: (managerId: EntityUrlParamCommand.RequestUuidParam) => Promise<WorkspaceEntity>;
  getAllCount: () => Promise<CountData>;
  getAll: (skip: number, take: number) => Promise<WorkspaceEntity[]>;
  create: (
    dto: WorkspaceCreateRequestDto,
    userId: EntityUrlParamCommand.RequestUuidParam,
    transactionDbClient?: TransactionDbClient,
  ) => Promise<WorkspaceEntity>;
  updateById: (
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceUpdateRequestDto,
    transactionDbClient?: TransactionDbClient,
  ) => Promise<WorkspaceEntity>;
  deleteById: (workspaceId: EntityUrlParamCommand.RequestUuidParam) => Promise<WorkspaceEntity>;
  changeWorkspaceOwner: (
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceChangeOwnerRequestDto,
  ) => Promise<WorkspaceEntity>;
}
