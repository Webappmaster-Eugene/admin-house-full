import { Inject, Injectable } from '@nestjs/common';
import { FieldUnitMeasurementEntity } from './entities/field-unit-measurement.entity';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import {
  InternalResponse,
  UniversalInternalResponse,
} from '../../common/types/responses/universal-internal-response.interface';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { IFieldUnitMeasurementRepository } from './types/field-unit-measurement.repository.interface';
import { FieldUnitMeasurementUpdateRequestDto } from './dto/controller/update-field-unit-measurement.dto';
import { IFieldUnitMeasurementService } from './types/field-unit-measurement.service.interface';
import { FieldUnitMeasurementCreateRequestDto } from './dto/controller/create-field-unit-measurement.dto';

@Injectable()
export class FieldUnitMeasurementService
  implements IFieldUnitMeasurementService
{
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_FIELD_UNIT_MEASUREMENT_REPOSITORY)
    private readonly fieldUnitMeasurementRepository: IFieldUnitMeasurementRepository,
  ) {}

  async getById(
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<FieldUnitMeasurementEntity>> {
    const findedFieldUnitMeasurement =
      await this.fieldUnitMeasurementRepository.getById(fieldUnitMeasurementId);
    return new InternalResponse<FieldUnitMeasurementEntity>(
      findedFieldUnitMeasurement,
    );
  }

  async getAll(): Promise<
    UniversalInternalResponse<FieldUnitMeasurementEntity[]>
  > {
    const allFieldUnitMeasurements =
      await this.fieldUnitMeasurementRepository.getAll();
    return new InternalResponse<FieldUnitMeasurementEntity[]>(
      allFieldUnitMeasurements,
    );
  }

  // для создания FieldUnitMeasurement нужно указать id пользователя (менеджера), для которого создается FieldUnitMeasurement
  async create(
    dto: FieldUnitMeasurementCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<FieldUnitMeasurementEntity>> {
    const createdFieldUnitMeasurement =
      await this.fieldUnitMeasurementRepository.create(dto, managerId);
    return new InternalResponse<FieldUnitMeasurementEntity>(
      createdFieldUnitMeasurement,
    );
  }

  async updateById(
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldUnitMeasurementUpdateRequestDto,
  ): Promise<UniversalInternalResponse<FieldUnitMeasurementEntity>> {
    const updatedFieldUnitMeasurement =
      await this.fieldUnitMeasurementRepository.updateById(
        field - unit - measurementId,
        dto,
      );
    return new InternalResponse<FieldUnitMeasurementEntity>(
      updatedFieldUnitMeasurement,
    );
  }

  async deleteById(
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<FieldUnitMeasurementEntity>> {
    const deletedFieldUnitMeasurement =
      await this.fieldUnitMeasurementRepository.deleteById(
        fieldUnitMeasurementId,
      );
    return new InternalResponse<FieldUnitMeasurementEntity>(
      deletedFieldUnitMeasurement,
    );
  }
}
