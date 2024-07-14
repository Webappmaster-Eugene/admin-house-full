import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { EntityUrlParamCommand } from 'libs/contracts';
import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { PriceChangingCreateRequestDto } from '../dto/controller/create-price-changing.dto';
import { PriceChangingUpdateRequestDto } from '../dto/controller/update-price-changing.dto';
import { PriceChangingEntity } from '../entities/price-changing.entity';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface IPriceChangingService
  extends IServiceCommon<PriceChangingCreateRequestDto, PriceChangingUpdateRequestDto, PriceChangingEntity> {
  getById: (priceChangingId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<PriceChangingEntity>>;
  getAll: (queryParams?: IQueryParams) => Promise<UniversalInternalResponse<PriceChangingEntity[]>>;
  getAllInHandbook: (
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<UniversalInternalResponse<PriceChangingEntity[]>>;
  getAllInCategoryMaterial: (
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<UniversalInternalResponse<PriceChangingEntity[]>>;
  getAllInMaterial: (
    materialId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<UniversalInternalResponse<PriceChangingEntity[]>>;
  create: (
    dto: PriceChangingCreateRequestDto,
    materialId: EntityUrlParamCommand.RequestUuidParam,
    changedById: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<PriceChangingEntity>>;
  updateById: (
    priceChangingId: EntityUrlParamCommand.RequestUuidParam,
    dto: PriceChangingUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<PriceChangingEntity>>;
  deleteById: (priceChangingId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<PriceChangingEntity>>;
}
