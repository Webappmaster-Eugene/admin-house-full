import { Inject, Injectable } from '@nestjs/common';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IFieldOfMaterialRepository } from './types/field-of-material.repository.interface';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { KFI } from '../../common/utils/di';
import { FieldOfMaterialEntity } from './entities/field-of-material.entity';
import { FieldOfMaterialCreateRequestDto } from './dto/controller/create-field-of-material.dto';
import { existenceEntityHandler } from '../../common/helpers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/error-repository.handler';
import { QUANTITY_LIMIT } from '../../common/consts/take-quantity.limitation';
import { limitTakeHandler } from '../../common/helpers/take-limit.handler';

@Injectable()
export class FieldOfMaterialRepository implements IFieldOfMaterialRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(fieldOfMaterialId: EntityUrlParamCommand.RequestUuidParam): Promise<FieldOfMaterialEntity> {
    try {
      const findedFieldOfMaterial = await this.databaseService.fieldType.findUnique({
        where: {
          uuid: fieldOfMaterialId,
        },
      });

      return existenceEntityHandler(findedFieldOfMaterial, FieldOfMaterialEntity, EntityName.FIELD_TYPE) as FieldOfMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
  async getAll(skip = 0, take = QUANTITY_LIMIT.TAKE_5): Promise<FieldOfMaterialEntity[]> {
    limitTakeHandler(take);

    try {
      const allFieldOfMaterials = await this.databaseService.fieldType.findMany({ take, skip });
      return existenceEntityHandler(allFieldOfMaterials, FieldOfMaterialEntity, EntityName.FIELD_TYPE) as FieldOfMaterialEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async create(
    dto: FieldOfMaterialCreateRequestDto,
    fieldOfMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<FieldOfMaterialEntity> {
    try {
      const { description, name } = dto;
      const newFieldOfMaterial = await this.databaseService.fieldType.create({
        data: {},
      });
      return existenceEntityHandler(newFieldOfMaterial, FieldOfMaterialEntity, EntityName.FIELD_TYPE) as FieldOfMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(
    typeFieldId: EntityUrlParamCommand.RequestUuidParam,
    { name, description }: FieldOfMaterialCreateRequestDto,
  ): Promise<FieldOfMaterialEntity> {
    try {
      const updatedFieldOfMaterial = await this.databaseService.fieldType.update({
        where: {
          uuid: typeFieldId,
        },
        data: {
          name,
          description,
        },
      });

      return existenceEntityHandler(updatedFieldOfMaterial, FieldOfMaterialEntity, EntityName.FIELD_TYPE) as FieldOfMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(fieldOfMaterialId: EntityUrlParamCommand.RequestUuidParam): Promise<FieldOfMaterialEntity> {
    try {
      const deletedFieldOfMaterial = await this.databaseService.fieldType.delete({
        where: {
          uuid: fieldOfMaterialId,
        },
      });

      return existenceEntityHandler(deletedFieldOfMaterial, FieldOfMaterialEntity, EntityName.FIELD_TYPE) as FieldOfMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
