import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import { OrganizationCreateRequestDto, OrganizationCreateResponseDto } from '../dto/controller/create-organization.dto';
import { OrganizationUpdateRequestDto, OrganizationUpdateResponseDto } from '../dto/controller/update-organization.dto';
import { OrganizationGetResponseDto } from '../dto/controller/get-organization.dto';
import { OrganizationGetAllResponseDto } from '../dto/controller/get-all-organizations.dto';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';
import { OrganizationDeleteResponseDto } from '../dto/controller/delete-organization.dto';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface IOrganizationController
  extends IControllerCommon<
    OrganizationCreateRequestDto,
    OrganizationUpdateRequestDto,
    OrganizationGetResponseDto,
    OrganizationGetAllResponseDto,
    OrganizationCreateResponseDto,
    OrganizationUpdateResponseDto,
    OrganizationDeleteResponseDto
  > {
  getByIdEP: (organizationId: EntityUrlParamCommand.RequestUuidParam, urlParams: IUrlParams) => Promise<OrganizationGetResponseDto>;
  getAllEP: (urlParams: IUrlParams, queryParams?: IQueryParams) => Promise<OrganizationGetAllResponseDto>;
  getAllInWorkspaceEP: (
    urlParams: IUrlParams,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<OrganizationGetAllResponseDto>;
  createEP: (
    dto: OrganizationCreateRequestDto,
    urlParams: IUrlParams,
    userInfoFromJWT: IJWTPayload,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<OrganizationCreateResponseDto>;
  updateByIdEP: (
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    dto: OrganizationUpdateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<OrganizationUpdateResponseDto>;
  deleteByIdEP: (organizationId: EntityUrlParamCommand.RequestUuidParam, urlParams: IUrlParams) => Promise<OrganizationDeleteResponseDto>;
}
