import { Inject, Injectable } from '@nestjs/common';
import { FieldUnitMeasurementCreateRequestDto } from './dto/controller/create-field-unit-measurement.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IFieldUnitMeasurementRepository } from './types/field-unit-measurement.repository.interface';
import { FieldUnitMeasurementUpdateRequestDto } from './dto/controller/update-field-unit-measurement.dto';
import { EntityUrlParamCommand } from 'libs/contracts';
import { FieldUnitMeasurementEntity } from './entities/field-unit-measurement.entity';
import { KFI } from '../../common/utils/di';
import { existenceEntityHandler } from '../../common/helpers/handlers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { QUANTITY_LIMIT } from '../../common/consts/take-quantity.limitation';
import { limitTakeHandler } from '../../common/helpers/handlers/take-limit.handler';

@Injectable()
export class FieldUnitMeasurementRepository implements IFieldUnitMeasurementRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam): Promise<FieldUnitMeasurementEntity> {
    try {
      const findedFieldUnitMeasurement = await this.databaseService.fieldUnitMeasurement.findUnique({
        where: {
          uuid: fieldUnitMeasurementId,
        },
        include: {
          handbook: true,
        },
      });

      return existenceEntityHandler(
        findedFieldUnitMeasurement,
        FieldUnitMeasurementEntity,
        EntityName.FIELD_UNIT_MEASUREMENT,
      ) as FieldUnitMeasurementEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAll(skip = 0, take = QUANTITY_LIMIT.TAKE_MAX_LIMIT): Promise<FieldUnitMeasurementEntity[]> {
    limitTakeHandler(take);

    try {
      const allFieldUnitMeasurements = await this.databaseService.fieldUnitMeasurement.findMany({
        skip,
        take,
        include: {
          handbook: true,
        },
      });
      return existenceEntityHandler(
        allFieldUnitMeasurements,
        FieldUnitMeasurementEntity,
        EntityName.FIELD_UNIT_MEASUREMENT,
      ) as FieldUnitMeasurementEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAllInHandbook(
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    skip = 0,
    take = QUANTITY_LIMIT.TAKE_MAX_LIMIT,
  ): Promise<FieldUnitMeasurementEntity[]> {
    limitTakeHandler(take);

    try {
      const allFieldUnitMeasurements = await this.databaseService.fieldUnitMeasurement.findMany({
        where: { handbookUuid: handbookId },
        skip,
        take,
        include: {
          handbook: true,
        },
      });
      return existenceEntityHandler(
        allFieldUnitMeasurements,
        FieldUnitMeasurementEntity,
        EntityName.FIELD_UNIT_MEASUREMENT,
      ) as FieldUnitMeasurementEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async create(
    dto: FieldUnitMeasurementCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<FieldUnitMeasurementEntity> {
    try {
      const { name, comment, fieldUnitMeasurementStatus } = dto;
      const lastFieldUnitMeasurementInHandbook = await this.databaseService.material.findFirst({
        where: {
          handbookUuid: handbookId,
        },
      });
      const numInOrder = lastFieldUnitMeasurementInHandbook?.numInOrder + 1 || 1;

      const newFieldUnitMeasurement = await this.databaseService.fieldUnitMeasurement.create({
        data: { name, comment, numInOrder, handbookUuid: handbookId, fieldUnitMeasurementStatus },
        include: {
          handbook: true,
        },
      });
      return existenceEntityHandler(
        newFieldUnitMeasurement,
        FieldUnitMeasurementEntity,
        EntityName.FIELD_UNIT_MEASUREMENT,
      ) as FieldUnitMeasurementEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
    { name, comment, fieldUnitMeasurementStatus }: FieldUnitMeasurementUpdateRequestDto,
  ): Promise<FieldUnitMeasurementEntity> {
    try {
      const updatedFieldUnitMeasurement = await this.databaseService.fieldUnitMeasurement.update({
        where: {
          uuid: fieldUnitMeasurementId,
        },
        data: {
          fieldUnitMeasurementStatus,
          name,
          comment,
        },
        include: {
          handbook: true,
        },
      });

      return existenceEntityHandler(
        updatedFieldUnitMeasurement,
        FieldUnitMeasurementEntity,
        EntityName.FIELD_UNIT_MEASUREMENT,
      ) as FieldUnitMeasurementEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam): Promise<FieldUnitMeasurementEntity> {
    try {
      const deletedFieldUnitMeasurement = await this.databaseService.fieldUnitMeasurement.delete({
        where: {
          uuid: fieldUnitMeasurementId,
        },
        include: {
          handbook: true,
        },
      });

      return existenceEntityHandler(
        deletedFieldUnitMeasurement,
        FieldUnitMeasurementEntity,
        EntityName.FIELD_UNIT_MEASUREMENT,
      ) as FieldUnitMeasurementEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
