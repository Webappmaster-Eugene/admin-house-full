import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import {
  ProjectCreateRequestDto,
  ProjectCreateResponseDto,
} from '../dto/controller/create-project.dto';
import {
  ProjectUpdateRequestDto,
  ProjectUpdateResponseDto,
} from '../dto/controller/update-project.dto';
import { ProjectGetResponseDto } from '../dto/controller/get-project.dto';
import { ProjectGetAllResponseDto } from '../dto/controller/get-all-projects.dto';
import { UniversalExternalResponse } from '../../../common/types/responses/universal-external-response.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { ProjectDeleteResponseDto } from '../dto/controller/delete-project.dto';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';

export interface IProjectController
  extends IControllerCommon<
    ProjectCreateRequestDto,
    ProjectUpdateRequestDto,
    ProjectGetResponseDto,
    ProjectGetAllResponseDto,
    ProjectCreateResponseDto,
    ProjectUpdateResponseDto,
    ProjectDeleteResponseDto
  > {
  getByIdEP: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalExternalResponse<ProjectGetResponseDto | null>>;
  getAllEP: () => Promise<
    UniversalExternalResponse<ProjectGetAllResponseDto[] | null>
  >;
  createEP: (
    dto: ProjectCreateRequestDto,
    userInfo: IJWTPayload,
    organizationId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalExternalResponse<ProjectCreateResponseDto>>;
  updateByIdEP: (
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: ProjectUpdateRequestDto,
  ) => Promise<UniversalExternalResponse<ProjectUpdateResponseDto>>;
  deleteByIdEP: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalExternalResponse<ProjectDeleteResponseDto>>;
}
