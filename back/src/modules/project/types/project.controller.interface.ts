import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import { ProjectCreateRequestDto, ProjectCreateResponseDto } from '../dto/controller/create-project.dto';
import { ProjectUpdateRequestDto, ProjectUpdateResponseDto } from '../dto/controller/update-project.dto';
import { ProjectGetResponseDto } from '../dto/controller/get-project.dto';
import { ProjectGetAllResponseDto } from '../dto/controller/get-all-projects.dto';
import { EntityUrlParamCommand } from 'libs/contracts';
import { ProjectDeleteResponseDto } from '../dto/controller/delete-project.dto';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

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
  getByIdEP: (projectId: EntityUrlParamCommand.RequestUuidParam, urlParams: IUrlParams) => Promise<ProjectGetResponseDto>;
  getAllEP: (urlParams: IUrlParams, queryParams?: IQueryParams) => Promise<ProjectGetAllResponseDto>;
  getAllInWorkspaceEP: (
    urlParams: IUrlParams,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<ProjectGetAllResponseDto>;
  getAllInOrganizationEP: (
    urlParams: IUrlParams,
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<ProjectGetAllResponseDto>;
  createEP: (
    dto: ProjectCreateRequestDto,
    urlParams: IUrlParams,
    userInfoFromJWT: IJWTPayload,
    organizationId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<ProjectCreateResponseDto>;
  updateByIdEP: (
    projectId: EntityUrlParamCommand.RequestUuidParam,
    dto: ProjectUpdateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<ProjectUpdateResponseDto>;
  deleteByIdEP: (projectId: EntityUrlParamCommand.RequestUuidParam, urlParams: IUrlParams) => Promise<ProjectDeleteResponseDto>;
}
