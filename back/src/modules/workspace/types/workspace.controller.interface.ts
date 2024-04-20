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
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { WorkspaceDeleteResponseDto } from '../dto/controller/delete-workspace.dto';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import {
  WorkspaceChangeOwnerRequestDto,
  WorkspaceChangeOwnerResponseDto,
} from '../dto/controller/change-owner-workspace.dto';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';

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
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<WorkspaceGetResponseDto>;
  getAllEP: (urlParams: IUrlParams) => Promise<WorkspaceGetAllResponseDto>;
  createEP: (
    dto: WorkspaceCreateRequestDto,
    urlParams: IUrlParams,
    userInfoFromJWT: IJWTPayload,
  ) => Promise<WorkspaceCreateResponseDto>;
  updateByIdEP: (
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceUpdateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<WorkspaceUpdateResponseDto>;
  deleteByIdEP: (
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<WorkspaceDeleteResponseDto>;
  changeWorkspaceOwnerEP: (
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceChangeOwnerRequestDto,
    urlParams: IUrlParams,
  ) => Promise<WorkspaceChangeOwnerResponseDto>;
}
