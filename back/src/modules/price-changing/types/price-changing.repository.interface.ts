import { PriceChangingCreateRequestDto } from '../dto/controller/create-price-changing.dto';
import { PriceChangingUpdateRequestDto } from '../dto/controller/update-price-changing.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from 'libs/contracts';
import { PriceChangingEntity } from '../entities/price-changing.entity';

export interface IPriceChangingRepository
  extends IRepositoryCommon<PriceChangingCreateRequestDto, PriceChangingUpdateRequestDto, PriceChangingEntity> {
  getById: (priceChangingId: EntityUrlParamCommand.RequestUuidParam) => Promise<PriceChangingEntity>;
  getAll: (skip?: number, take?: number) => Promise<PriceChangingEntity[]>;
  getAllInHandbook: (handbookId: EntityUrlParamCommand.RequestUuidParam, skip?: number, take?: number) => Promise<PriceChangingEntity[]>;
  getAllInCategoryMaterial: (
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    skip?: number,
    take?: number,
  ) => Promise<PriceChangingEntity[]>;
  getAllInMaterial: (materialId: EntityUrlParamCommand.RequestUuidParam, skip?: number, take?: number) => Promise<PriceChangingEntity[]>;
  create: (
    dto: PriceChangingCreateRequestDto,
    materialId: EntityUrlParamCommand.RequestUuidParam,
    changedById: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<PriceChangingEntity>;
  updateById: (priceChangingId: EntityUrlParamCommand.RequestUuidParam, dto: PriceChangingUpdateRequestDto) => Promise<PriceChangingEntity>;
  deleteById: (priceChangingId: EntityUrlParamCommand.RequestUuidParam) => Promise<PriceChangingEntity>;
}
