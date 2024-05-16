import { FieldUnitMeasurementCreateRequestDto } from '../dto/controller/create-field-unit-measurement.dto';
import { FieldUnitMeasurementUpdateRequestDto } from '../dto/controller/update-field-unit-measurement.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { FieldUnitMeasurementEntity } from '../entities/field-unit-measurement.entity';

export interface IFieldUnitMeasurementRepository
  extends IRepositoryCommon<FieldUnitMeasurementCreateRequestDto, FieldUnitMeasurementUpdateRequestDto, FieldUnitMeasurementEntity> {
  getById: (fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam) => Promise<FieldUnitMeasurementEntity>;
  getAll: (skip?: number, take?: number) => Promise<FieldUnitMeasurementEntity[]>;
  create: (
    dto: FieldUnitMeasurementCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<FieldUnitMeasurementEntity>;
  updateById: (
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldUnitMeasurementUpdateRequestDto,
  ) => Promise<FieldUnitMeasurementEntity>;
  deleteById: (fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam) => Promise<FieldUnitMeasurementEntity>;
}
