import { WorkspaceCreateRequestDto } from '../dto/controller/create-workspace.dto';
import { WorkspaceUpdateRequestDto } from '../dto/controller/update-workspace.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../../common/types/main/count.data';
import { WorkspaceEntity } from '../entities/workspace.entity';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { WorkspaceChangeOwnerRequestDto } from '../dto/controller/change-owner-workspace.dto';
import { WorkspaceAddUserToManagerRequestDto } from '../dto/controller/add-to-manager-workspace.dto';

export interface IWorkspaceRepository
  extends IRepositoryCommon<
    WorkspaceCreateRequestDto,
    WorkspaceUpdateRequestDto,
    WorkspaceEntity
  > {
  getById: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<WorkspaceEntity>;
  getByManagerId: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<WorkspaceEntity>;
  getAllCount: () => Promise<CountData>;
  getAll: () => Promise<WorkspaceEntity[]>;
  create: (
    dto: WorkspaceCreateRequestDto,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<WorkspaceEntity>;
  updateById: (
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceUpdateRequestDto,
  ) => Promise<WorkspaceEntity>;
  deleteById: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<WorkspaceEntity>;
  changeWorkspaceOwner: (
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceChangeOwnerRequestDto,
  ) => Promise<WorkspaceEntity>;
  addUserToManagerWorkspace: (
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceAddUserToManagerRequestDto,
  ) => Promise<WorkspaceEntity>;
}
