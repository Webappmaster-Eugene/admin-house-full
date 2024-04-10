import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { WorkspaceCreateRequestDto } from '../dto/controller/create-workspace.dto';
import { WorkspaceUpdateRequestDto } from '../dto/controller/update-workspace.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { WorkspaceEntity } from '../entities/workspace.entity';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { WorkspaceChangeOwnerRequestDto } from '../dto/controller/change-owner-workspace.dto';
import { WorkspaceAddUserToManagerRequestDto } from '../dto/controller/add-to-manager-workspace.dto';

export interface IWorkspaceService
  extends IServiceCommon<
    WorkspaceCreateRequestDto,
    WorkspaceUpdateRequestDto,
    WorkspaceEntity
  > {
  getById: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<WorkspaceEntity | null>>;
  getByManagerId: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<WorkspaceEntity | null>>;
  getAll: () => Promise<UniversalInternalResponse<WorkspaceEntity[] | null>>;
  create: (
    dto: WorkspaceCreateRequestDto,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<WorkspaceEntity>>;
  updateById: (
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<WorkspaceEntity>>;
  deleteById: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<WorkspaceEntity>>;
  changeWorkspaceOwner: (
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceChangeOwnerRequestDto,
  ) => Promise<UniversalInternalResponse<WorkspaceEntity | null>>;
  addUserToManagerWorkspace: (
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceAddUserToManagerRequestDto,
  ) => Promise<UniversalInternalResponse<WorkspaceEntity | null>>;
}
