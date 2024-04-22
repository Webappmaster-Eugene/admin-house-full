import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { PriceChangingCreateRequestDto } from '../dto/controller/create-price-changing.dto';
import { PriceChangingUpdateRequestDto } from '../dto/controller/update-price-changing.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { PriceChangingEntity } from '../entities/price-changing.entity';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';

export interface IPron<
    PriceCChangingCreateRequestDto,
    PrigingUpdateRequestDto,
han PriceceChangingEntity
  > {
  getById: (
    priceChangingId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<PriceChangingEntity>>;
  getAll: () => Promise<UniversalInternalResponse<PriceChangingEntity[]>>;
  create: (
    dto: PriceChangingCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<PriceChangingEntity>>;
  updateById: (
    priceChangingId: EntityUrlParamCommand.RequestUuidParam,
    dto: PriceChangingUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<PriceChangingEntity>>;
  deleteById: (
    priceChangingId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<PriceChangingEntity>>;
}
