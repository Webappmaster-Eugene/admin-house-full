import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { FieldUnitMeasurementCreateRequestDto } from '../dto/controller/create-field-unit-measurement.dto';
import { FieldUnitMeasurementUpdateRequestDto } from '../dto/controller/update-field-unit-measurement.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { FieldUnitMeasurementEntity } from '../entities/field-unit-measurement.entity';
import { EntityUrlParamCommand } from 'libs/contracts';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface IFieldUnitMeasurementService
  extends IServiceCommon<FieldUnitMeasurementCreateRequestDto, FieldUnitMeasurementUpdateRequestDto, FieldUnitMeasurementEntity> {
  getById: (
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<FieldUnitMeasurementEntity>>;
  getAll: (queryParams?: IQueryParams) => Promise<UniversalInternalResponse<FieldUnitMeasurementEntity[]>>;
  getAllInHandbook: (
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<UniversalInternalResponse<FieldUnitMeasurementEntity[]>>;
  create: (
    dto: FieldUnitMeasurementCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<FieldUnitMeasurementEntity>>;
  updateById: (
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldUnitMeasurementUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<FieldUnitMeasurementEntity>>;
  deleteById: (
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<FieldUnitMeasurementEntity>>;
}
