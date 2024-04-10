import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import {
  WorkspaceCreateRequestDto,
  WorkspaceCreateResponseDto,
} from '../dto/controller/create-workspace.dto';
import {
  WorkspaceUpdateRequestDto,
  WorkspaceUpdateResponseDto,
} from '../dto/controller/update-workspace.dto';
import { WorkspaceGetResponseDto } from '../dto/controller/get-workspace.dto';
import { WorkspaceGetAllResponseDto } from '../dto/controller/get-all-workspaces.dto';
import { UniversalExternalResponse } from '../../../common/types/responses/universal-external-response.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { WorkspaceDeleteResponseDto } from '../dto/controller/delete-workspace.dto';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import {
  WorkspaceChangeOwnerRequestDto,
  WorkspaceChangeOwnerResponseDto,
} from '../dto/controller/change-owner-workspace.dto';
import { WorkspaceAddUserToManagerRequestDto } from '../dto/controller/add-to-manager-workspace.dto';

export interface IWorkspaceController
  extends IControllerCommon<
    WorkspaceCreateRequestDto,
    WorkspaceUpdateRequestDto,
    WorkspaceGetResponseDto,
    WorkspaceGetAllResponseDto,
    WorkspaceCreateResponseDto,
    WorkspaceUpdateResponseDto,
    WorkspaceDeleteResponseDto
  > {
  getByIdEP: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalExternalResponse<WorkspaceGetResponseDto | null>>;
  getAllEP: () => Promise<
    UniversalExternalResponse<WorkspaceGetAllResponseDto[] | null>
  >;
  createEP: (
    dto: WorkspaceCreateRequestDto,
    user: IJWTPayload,
  ) => Promise<UniversalExternalResponse<WorkspaceCreateResponseDto>>;
  updateByIdEP: (
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceUpdateRequestDto,
  ) => Promise<UniversalExternalResponse<WorkspaceUpdateResponseDto>>;
  deleteByIdEP: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalExternalResponse<WorkspaceDeleteResponseDto>>;
  changeWorkspaceOwnerEP: (
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceChangeOwnerRequestDto,
  ) => Promise<
    UniversalExternalResponse<WorkspaceChangeOwnerResponseDto | null>
  >;
  addUserToManagerWorkspaceEP: (
    dto: WorkspaceAddUserToManagerRequestDto,
    userInfoFromJWT: IJWTPayload,
  ) => Promise<UniversalExternalResponse<WorkspaceGetResponseDto | null>>;
}
