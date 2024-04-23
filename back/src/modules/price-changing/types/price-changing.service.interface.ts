import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { FieldUnitMeasurementCreateRequestDto } from '../../field-unit-measurement/dto/controller/create-field-unit-measurement.dto';
import { FieldUnitMeasurementUpdateRequestDto } from '../../field-unit-measurement/dto/controller/update-field-unit-measurement.dto';
import { FieldUnitMeasurementEntity } from '../../field-unit-measurement/entities/field-unit-measurement.entity';
import { PriceChangingCreateRequestDto } from '../dto/controller/create-price-changing.dto';
import { PriceChangingUpdateRequestDto } from '../dto/controller/update-price-changing.dto';
import { PriceChangingEntity } from '../entities/price-changing.entity';

export interface IPriceChangingService
  extends IServiceCommon<
    PriceChangingCreateRequestDto,
    PriceChangingUpdateRequestDto,
    PriceChangingEntity
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
