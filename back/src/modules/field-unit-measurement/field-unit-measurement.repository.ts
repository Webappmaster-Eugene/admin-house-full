import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FieldUnitMeasurementCreateRequestDto } from './dto/controller/create-field-unit-measurement.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IFieldUnitMeasurementRepository } from './types/field-unit-measurement.repository.interface';
import { FieldUnitMeasurementUpdateRequestDto } from './dto/controller/update-field-unit-measurement.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { FieldUnitMeasurementEntity } from './entities/field-unit-measurement.entity';
import { toEntityArray } from '../../common/utils/mappers';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import {
  BackendErrorNames,
  InternalError,
} from '../../common/errors/errors.backend';
import { jsonStringify } from '../../common/helpers/stringify';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class FieldUnitMeasurementRepository
  implements IFieldUnitMeasurementRepository
{
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<FieldUnitMeasurementEntity> {
    try {
      const findedFieldUnitMeasurement =
        await this.databaseService.fieldUnitMeasurement.findUnique({
          where: {
            uuid: fieldUnitMeasurementId,
          },
        });

      if (findedFieldUnitMeasurement) {
        return new FieldUnitMeasurementEntity(findedFieldUnitMeasurement);
      } else {
        throw new NotFoundException({
          message: `FieldUnitMeasurement with id=${fieldUnitMeasurementId} not found`,
          description:
            'FieldUnitMeasurement from your request did not found in the database',
        });
      }
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)),
        );
      }

      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }
  async getAll(): Promise<FieldUnitMeasurementEntity[]> {
    try {
      const allFieldUnitMeasurements =
        (await this.databaseService.field) - unit - measurement.findMany();
      return toEntityArray<FieldUnitMeasurementEntity>(
        allFieldUnitMeasurements,
        FieldUnitMeasurementEntity,
      );
    } catch (error: unknown) {
      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }
  async create(
    dto: FieldUnitMeasurementCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<FieldUnitMeasurementEntity> {
    try {
      const {} = dto;
      const newFieldUnitMeasurement =
        await this.databaseService.fieldUnitMeasurement.create({
          data: {},
        });
      return new FieldUnitMeasurementEntity(newFieldUnitMeasurement);
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(
            BackendErrorNames.CONFLICT_ERROR,
            jsonStringify(error),
          ),
        );
      }
      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async updateById(
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
    {}: FieldUnitMeasurementUpdateRequestDto,
  ): Promise<FieldUnitMeasurementEntity> {
    try {
      const updatedFieldUnitMeasurement =
        await this.databaseService.fieldUnitMeasurement.update({
          where: {
            uuid: fieldUnitMeasurementId,
          },
          data: {
            name,
            description,
          },
        });

      return new FieldUnitMeasurementEntity(updatedFieldUnitMeasurement);
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)),
        );
      }

      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async deleteById(
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<FieldUnitMeasurementEntity> {
    try {
      const deletedFieldUnitMeasurement =
        await this.databaseService.fieldUnitMeasurement.delete({
          where: {
            uuid: fieldUnitMeasurementId,
          },
        });

      return new FieldUnitMeasurementEntity(deletedFieldUnitMeasurement);
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)),
        );
      }

      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }
}
