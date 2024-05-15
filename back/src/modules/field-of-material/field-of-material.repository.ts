import { Inject, Injectable } from '@nestjs/common';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IFieldOfMaterialRepository } from './types/field-of-material.repository.interface';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { KFI } from '../../common/utils/di';
import { FieldOfMaterialEntity } from './entities/field-of-material.entity';
import { FieldOfMaterialCreateRequestDto } from './dto/controller/create-field-of-material.dto';
import { existenceEntityHandler } from '../../common/helpers/handlers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { QUANTITY_LIMIT } from '../../common/consts/take-quantity.limitation';
import { limitTakeHandler } from '../../common/helpers/handlers/take-limit.handler';

@Injectable()
export class FieldOfMaterialRepository implements IFieldOfMaterialRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(fieldOfMaterialId: EntityUrlParamCommand.RequestUuidParam): Promise<FieldOfMaterialEntity> {
    try {
      const findedFieldOfMaterial = await this.databaseService.fieldOfMaterial.findUnique({
        where: {
          uuid: fieldOfMaterialId,
        },
      });

      return existenceEntityHandler(findedFieldOfMaterial, FieldOfMaterialEntity, EntityName.FIELD_OF_MATERIAL) as FieldOfMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
  async getAll(skip = 0, take = QUANTITY_LIMIT.TAKE_5): Promise<FieldOfMaterialEntity[]> {
    limitTakeHandler(take);

    try {
      const allFieldOfMaterials = await this.databaseService.fieldOfMaterial.findMany({ take, skip });
      return existenceEntityHandler(allFieldOfMaterials, FieldOfMaterialEntity, EntityName.FIELD_OF_MATERIAL) as FieldOfMaterialEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async create(
    dto: FieldOfMaterialCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<FieldOfMaterialEntity> {
    try {
      const { name, comment, defaultValue, fieldTypeUuid, isRequired, categoryMaterialUuid, unitOfMeasurementUuid } = dto;
      const newFieldOfMaterial = await this.databaseService.fieldOfMaterial.create({
        data: {
          name,
          comment,
          defaultValue,
          fieldTypeUuid,
          isRequired,
          categoryMaterialUuid,
          unitOfMeasurementUuid,
          handbookUuid: handbookId,
          createdByUuid: userId,
        },
      });
      return existenceEntityHandler(newFieldOfMaterial, FieldOfMaterialEntity, EntityName.FIELD_OF_MATERIAL) as FieldOfMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(
    fieldOfMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldOfMaterialCreateRequestDto,
  ): Promise<FieldOfMaterialEntity> {
    try {
      const { name, comment, defaultValue, fieldTypeUuid, isRequired, categoryMaterialUuid, unitOfMeasurementUuid } = dto;
      const updatedFieldOfMaterial = await this.databaseService.fieldOfMaterial.update({
        where: {
          uuid: fieldOfMaterialId,
        },
        data: {
          name,
          comment,
          defaultValue,
          fieldTypeUuid,
          isRequired,
          categoryMaterialUuid,
          unitOfMeasurementUuid,
        },
      });

      return existenceEntityHandler(updatedFieldOfMaterial, FieldOfMaterialEntity, EntityName.FIELD_OF_MATERIAL) as FieldOfMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(fieldOfMaterialId: EntityUrlParamCommand.RequestUuidParam): Promise<FieldOfMaterialEntity> {
    try {
      const deletedFieldOfMaterial = await this.databaseService.fieldOfMaterial.delete({
        where: {
          uuid: fieldOfMaterialId,
        },
      });

      return existenceEntityHandler(deletedFieldOfMaterial, FieldOfMaterialEntity, EntityName.FIELD_OF_MATERIAL) as FieldOfMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
