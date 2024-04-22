import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { FieldUnitMeasurementCreateRequestDto } from '../dto/controller/create-field-unit-measurement.dto';
import { FieldUnitMeasurementUpdateRequestDto } from '../dto/controller/update-field-unit-measurement.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { FieldUnitMeasurementEntity } from '../entities/field-unit-measurement.entity';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';

export interface IFieldUnitMeasurementService
  extends IServiceCommon<
    FieldUnitMeasurementCreateRequestDto,
    FieldUnitMeasurementUpdateRequestDto,
    FieldUnitMeasurementEntity
  > {
  getById: (
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<FieldUnitMeasurementEntity>>;
  getAll: () => Promise<
    UniversalInternalResponse<FieldUnitMeasurementEntity[]>
  >;
  create: (
    dto: FieldUnitMeasurementCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<FieldUnitMeasurementEntity>>;
  updateById: (
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldUnitMeasurementUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<FieldUnitMeasurementEntity>>;
  deleteById: (
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<FieldUnitMeasurementEntity>>;
}
