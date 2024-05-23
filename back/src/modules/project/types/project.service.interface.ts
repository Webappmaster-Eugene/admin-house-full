import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { ProjectCreateRequestDto } from '../dto/controller/create-project.dto';
import { ProjectUpdateRequestDto } from '../dto/controller/update-project.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { ProjectEntity } from '../entities/project.entity';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface IProjectService extends IServiceCommon<ProjectCreateRequestDto, ProjectUpdateRequestDto, ProjectEntity> {
  getById: (projectId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<ProjectEntity>>;
  getAll: (queryParams?: IQueryParams) => Promise<UniversalInternalResponse<ProjectEntity[]>>;
  getAllInWorkspace: (
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<UniversalInternalResponse<ProjectEntity[]>>;
  getAllInOrganization: (
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<UniversalInternalResponse<ProjectEntity[]>>;
  create: (
    dto: ProjectCreateRequestDto,
    userInfo: IJWTPayload,
    organizationId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<ProjectEntity>>;
  updateById: (
    projectId: EntityUrlParamCommand.RequestUuidParam,
    dto: ProjectUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<ProjectEntity>>;
  deleteById: (projectId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<ProjectEntity>>;
}
