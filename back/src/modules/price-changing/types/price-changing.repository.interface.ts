import { PriceChangingCreateRequestDto } from '../dto/controller/create-price-changing.dto';
import { PriceChangingUpdateRequestDto } from '../dto/controller/update-price-changing.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { CountData } from '../../../common/types/main/count.data';
import { PriceChangingEntity } from '../entities/price-changing.entity';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';

export interface IPriceChangingRepository
  extends IRepositoryCommon<PriceChangingCreateRequestDto, PriceChangingUpdateRequestDto, PriceChangingEntity> {
  getById: (priceChangingId: EntityUrlParamCommand.RequestUuidParam) => Promise<PriceChangingEntity>;
  getAll: (skip?: number, take?: number) => Promise<PriceChangingEntity[]>;
  create: (
    dto: PriceChangingCreateRequestDto,
    changedById: EntityUrlParamCommand.RequestUuidParam,
    materialId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<PriceChangingEntity>;
  updateById: (priceChangingId: EntityUrlParamCommand.RequestUuidParam, dto: PriceChangingUpdateRequestDto) => Promise<PriceChangingEntity>;
  deleteById: (priceChangingId: EntityUrlParamCommand.RequestUuidParam) => Promise<PriceChangingEntity>;
}