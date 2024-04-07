import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import { EUserTypeVariants } from '@prisma/client';
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

export interface IWorkspaceController
  extends IControllerCommon<
    WorkspaceCreateRequestDto,
    WorkspaceUpdateRequestDto,
    WorkspaceGetResponseDto,
    WorkspaceGetAllResponseDto,
    WorkspaceCreateResponseDto,
    WorkspaceUpdateResponseDto,
    void,
    void,
    EntityUrlParamCommand.RequestParam,
    EntityUrlParamCommand.RequestParamNumber
  > {
  getByIdEP: (
    id: EntityUrlParamCommand.RequestParamNumber,
  ) => Promise<UniversalExternalResponse<WorkspaceGetResponseDto | null>>;
  getByValueEP: (
    value: EUserTypeVariants,
  ) => Promise<UniversalExternalResponse<WorkspaceGetResponseDto | null>>;
  getAllEP: () => Promise<
    UniversalExternalResponse<WorkspaceGetAllResponseDto[] | null>
  >;
  createEP: (
    dto: WorkspaceCreateRequestDto,
  ) => Promise<UniversalExternalResponse<WorkspaceCreateResponseDto>>;
  updateByIdEP: (
    id: EntityUrlParamCommand.RequestParam,
    dto: WorkspaceUpdateRequestDto,
  ) => Promise<UniversalExternalResponse<WorkspaceUpdateResponseDto>>;
  deleteByIdEP: (
    id: EntityUrlParamCommand.RequestParam,
  ) => Promise<UniversalExternalResponse<WorkspaceDeleteResponseDto>>;
}
