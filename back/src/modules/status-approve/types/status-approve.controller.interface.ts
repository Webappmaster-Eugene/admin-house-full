import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import {
  StatusApproveCreateRequestDto,
  StatusApproveCreateResponseDto,
} from 'src/modules/status-approve/dto/controller/create-status-approve.dto';
import {
  StatusApproveUpdateRequestDto,
  StatusApproveUpdateResponseDto,
} from 'src/modules/status-approve/dto/controller/update-status-approve.dto';
import { StatusApproveGetResponseDto } from 'src/modules/status-approve/dto/controller/get-status-approve.dto';
import { StatusApproveGetAllResponseDto } from 'src/modules/status-approve/dto/controller/get-all-status-approve.dto';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { StatusApproveDeleteResponseDto } from 'src/modules/status-approve/dto/controller/delete-status-approve.dto';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface IStatusApproveController
  extends IControllerCommon<
    StatusApproveCreateRequestDto,
    StatusApproveUpdateRequestDto,
    StatusApproveGetResponseDto,
    StatusApproveGetAllResponseDto,
    StatusApproveCreateResponseDto,
    StatusApproveUpdateResponseDto,
    StatusApproveDeleteResponseDto
  > {
  getByIdEP: (statusApproveId: EntityUrlParamCommand.RequestUuidParam, urlParams: IUrlParams) => Promise<StatusApproveGetResponseDto>;
  getAllEP: (urlParams: IUrlParams, queryParams?: IQueryParams) => Promise<StatusApproveGetAllResponseDto>;
  createEP: (
    dto: StatusApproveCreateRequestDto,
    urlParams: IUrlParams,
    userInfoFromJWT: IJWTPayload,
  ) => Promise<StatusApproveCreateResponseDto>;
  updateByIdEP: (
    statusApproveId: EntityUrlParamCommand.RequestUuidParam,
    dto: StatusApproveUpdateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<StatusApproveUpdateResponseDto>;
  deleteByIdEP: (statusApproveId: EntityUrlParamCommand.RequestUuidParam, urlParams: IUrlParams) => Promise<StatusApproveDeleteResponseDto>;
}