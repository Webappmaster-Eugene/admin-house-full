import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { WorkspaceCreateRequestDto } from '../dto/controller/create-workspace.dto';
import { WorkspaceUpdateRequestDto } from '../dto/controller/update-workspace.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { WorkspaceEntity } from '../entities/workspace.entity';
import { EntityUrlParamCommand } from 'libs/contracts';
import { WorkspaceChangeOwnerRequestDto } from '../dto/controller/change-owner-workspace.dto';
import { TransactionDbClient } from '../../../common/types/transaction-prisma-client.type';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface IWorkspaceService extends IServiceCommon<WorkspaceCreateRequestDto, WorkspaceUpdateRequestDto, WorkspaceEntity> {
  getById: (workspaceId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<WorkspaceEntity>>;
  getByManagerId: (workspaceId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<WorkspaceEntity>>;
  getAll: (queryParams?: IQueryParams) => Promise<UniversalInternalResponse<WorkspaceEntity[]>>;
  create: (
    dto: WorkspaceCreateRequestDto,
    userId: EntityUrlParamCommand.RequestUuidParam,
    transactionDbClient?: TransactionDbClient,
  ) => Promise<UniversalInternalResponse<WorkspaceEntity>>;
  updateById: (
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceUpdateRequestDto,
    transactionDbClient?: TransactionDbClient,
  ) => Promise<UniversalInternalResponse<WorkspaceEntity>>;
  deleteById: (workspaceId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<WorkspaceEntity>>;
  changeWorkspaceOwner: (
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceChangeOwnerRequestDto,
  ) => Promise<UniversalInternalResponse<WorkspaceEntity>>;
}
