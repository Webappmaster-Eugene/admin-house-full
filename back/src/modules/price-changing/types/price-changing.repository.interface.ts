import { PriceChangingCreateRequestDto } from '../dto/controller/create-price-changing.dto';
import { PriceChangingUpdateRequestDto } from '../dto/controller/update-price-changing.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../../common/types/main/count.data';
import { PriceChangingEntity } from '../entities/price-changing.entity';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';

export interface IPriceChangingRepository
  extends IRepositoryCommon<
    PriceChangingCreateRequestDto,
    PriceChangingUpdateRequestDto,
    PriceChangingEntity
  > {
  getById: (
    price-changingId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<PriceChangingEntity>;
  getByManagerId: (
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<PriceChangingEntity>;
  getAllCount: () => Promise<CountData>;
  getAll: () => Promise<PriceChangingEntity[]>;
  create: (
    dto: PriceChangingCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<PriceChangingEntity>;
  updateById: (
    price-changingId: EntityUrlParamCommand.RequestUuidParam,
    dto: PriceChangingUpdateRequestDto,
  ) => Promise<PriceChangingEntity>;
  deleteById: (
    price-changingId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<PriceChangingEntity>;
}
