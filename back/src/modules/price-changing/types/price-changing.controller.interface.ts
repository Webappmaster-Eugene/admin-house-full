import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import {
  PriceChangingCreateRequestDto,
  PriceChangingCreateResponseDto,
} from '../dto/controller/create-price-changing.dto';
import {
  PriceChangingUpdateRequestDto,
  PriceChangingUpdateResponseDto,
} from '../dto/controller/update-price-changing.dto';
import { PriceChangingGetResponseDto } from '../dto/controller/get-price-changing.dto';
import { PriceChangingGetAllResponseDto } from '../dto/controller/get-all-price-changings.dto';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { PriceChangingDeleteResponseDto } from '../dto/controller/delete-price-changing.dto';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';

export interface IPriceChangingController
  extends IControllerCommon<
    PriceChangingCreateRequestDto,
    PriceChangingUpdateRequestDto,
    PriceChangingGetResponseDto,
    PriceChangingGetAllResponseDto,
    PriceChangingCreateResponseDto,
    PriceChangingUpdateResponseDto,
    PriceChangingDeleteResponseDto
  > {
  getByIdEP: (
    priceChangingId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<PriceChangingGetResponseDto>;
  getAllEP: (urlParams: IUrlParams) => Promise<PriceChangingGetAllResponseDto>;
  createEP: (
    dto: PriceChangingCreateRequestDto,
    urlParams: IUrlParams,
    userInfoFromJWT: IJWTPayload,
  ) => Promise<PriceChangingCreateResponseDto>;
  updateByIdEP: (
    priceChangingId: EntityUrlParamCommand.RequestUuidParam,
    dto: PriceChangingUpdateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<PriceChangingUpdateResponseDto>;
  deleteByIdEP: (
    priceChangingId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<PriceChangingDeleteResponseDto>;
}
