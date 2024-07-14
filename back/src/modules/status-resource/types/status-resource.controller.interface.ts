import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import { StatusResourceCreateRequestDto, StatusResourceCreateResponseDto } from '../dto/controller/create-status-resource.dto';
import { StatusResourceUpdateRequestDto, StatusResourceUpdateResponseDto } from '../dto/controller/update-status-resource.dto';
import { StatusResourceGetResponseDto } from '../dto/controller/get-status-resource.dto';
import { StatusResourceGetAllResponseDto } from '../dto/controller/get-all-status-resources.dto';
import { EntityUrlParamCommand } from 'libs/contracts';
import { StatusResourceDeleteResponseDto } from '../dto/controller/delete-status-resource.dto';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface IStatusResourceController
  extends IControllerCommon<
    StatusResourceCreateRequestDto,
    StatusResourceUpdateRequestDto,
    StatusResourceGetResponseDto,
    StatusResourceGetAllResponseDto,
    StatusResourceCreateResponseDto,
    StatusResourceUpdateResponseDto,
    StatusResourceDeleteResponseDto
  > {
  getByIdEP: (statusResourceId: EntityUrlParamCommand.RequestUuidParam, urlParams: IUrlParams) => Promise<StatusResourceGetResponseDto>;
  getAllEP: (urlParams: IUrlParams, queryParams?: IQueryParams) => Promise<StatusResourceGetAllResponseDto>;
  createEP: (
    dto: StatusResourceCreateRequestDto,
    urlParams: IUrlParams,
    userInfoFromJWT: IJWTPayload,
  ) => Promise<StatusResourceCreateResponseDto>;
  updateByIdEP: (
    statusResourceId: EntityUrlParamCommand.RequestUuidParam,
    dto: StatusResourceUpdateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<StatusResourceUpdateResponseDto>;
  deleteByIdEP: (
    statusResourceId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<StatusResourceDeleteResponseDto>;
}
