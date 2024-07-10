import { Inject, Injectable } from '@nestjs/common';
import { FieldUnitMeasurementEntity } from './entities/field-unit-measurement.entity';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { KFI } from '../../common/utils/di';
import { IFieldUnitMeasurementRepository } from './types/field-unit-measurement.repository.interface';
import { FieldUnitMeasurementUpdateRequestDto } from './dto/controller/update-field-unit-measurement.dto';
import { IFieldUnitMeasurementService } from './types/field-unit-measurement.service.interface';
import { FieldUnitMeasurementCreateRequestDto } from './dto/controller/create-field-unit-measurement.dto';
import { IQueryParams } from '../../common/decorators/query-params.decorator';

@Injectable()
export class FieldUnitMeasurementService implements IFieldUnitMeasurementService {
  constructor(
    @Inject(KFI.FIELD_UNIT_MEASUREMENT_REPOSITORY)
    private readonly fieldUnitMeasurementRepository: IFieldUnitMeasurementRepository,
  ) {}

  async getById(
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<FieldUnitMeasurementEntity>> {
    const findedFieldUnitMeasurement = await this.fieldUnitMeasurementRepository.getById(fieldUnitMeasurementId);
    return new InternalResponse(findedFieldUnitMeasurement);
  }

  async getAll(queryParams?: IQueryParams): Promise<UniversalInternalResponse<FieldUnitMeasurementEntity[]>> {
    const { skip, take } = queryParams;
    const allFieldUnitMeasurements = await this.fieldUnitMeasurementRepository.getAll(skip, take);
    return new InternalResponse(allFieldUnitMeasurements);
  }

  async getAllInHandbook(
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ): Promise<UniversalInternalResponse<FieldUnitMeasurementEntity[]>> {
    const { skip, take } = queryParams;
    const allFieldUnitMeasurements = await this.fieldUnitMeasurementRepository.getAllInHandbook(handbookId, skip, take);
    return new InternalResponse(allFieldUnitMeasurements);
  }

  async create(
    dto: FieldUnitMeasurementCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<FieldUnitMeasurementEntity>> {
    const createdFieldUnitMeasurement = await this.fieldUnitMeasurementRepository.create(dto, handbookId);
    return new InternalResponse(createdFieldUnitMeasurement);
  }

  async updateById(
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldUnitMeasurementUpdateRequestDto,
  ): Promise<UniversalInternalResponse<FieldUnitMeasurementEntity>> {
    const updatedFieldUnitMeasurement = await this.fieldUnitMeasurementRepository.updateById(fieldUnitMeasurementId, dto);
    return new InternalResponse(updatedFieldUnitMeasurement);
  }

  async deleteById(
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<FieldUnitMeasurementEntity>> {
    const deletedFieldUnitMeasurement = await this.fieldUnitMeasurementRepository.deleteById(fieldUnitMeasurementId);
    return new InternalResponse(deletedFieldUnitMeasurement);
  }
}
