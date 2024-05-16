import { Inject, Injectable } from '@nestjs/common';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IFieldTypeRepository } from './types/field-type.repository.interface';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { KFI } from '../../common/utils/di';
import { FieldTypeEntity } from './entities/field-type.entity';
import { FieldTypeCreateRequestDto } from './dto/controller/create-field-type.dto';
import { existenceEntityHandler } from '../../common/helpers/handlers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { QUANTITY_LIMIT } from '../../common/consts/take-quantity.limitation';
import { limitTakeHandler } from '../../common/helpers/handlers/take-limit.handler';

@Injectable()
export class FieldTypeRepository implements IFieldTypeRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(fieldTypeId: EntityUrlParamCommand.RequestUuidParam): Promise<FieldTypeEntity> {
    try {
      const findedFieldType = await this.databaseService.fieldType.findUnique({
        where: {
          uuid: fieldTypeId,
        },
      });

      return existenceEntityHandler(findedFieldType, FieldTypeEntity, EntityName.FIELD_TYPE) as FieldTypeEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
  async getAll(skip = 0, take = QUANTITY_LIMIT.TAKE_5): Promise<FieldTypeEntity[]> {
    limitTakeHandler(take);

    try {
      const allFieldTypes = await this.databaseService.fieldType.findMany({ take, skip });
      return existenceEntityHandler(allFieldTypes, FieldTypeEntity, EntityName.FIELD_TYPE) as FieldTypeEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async create(dto: FieldTypeCreateRequestDto): Promise<FieldTypeEntity> {
    try {
      const { jsType, description, name } = dto;
      const newFieldType = await this.databaseService.fieldType.create({
        data: { jsType, description, name },
      });
      return existenceEntityHandler(newFieldType, FieldTypeEntity, EntityName.FIELD_TYPE) as FieldTypeEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(
    fieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    { name, description }: FieldTypeCreateRequestDto,
  ): Promise<FieldTypeEntity> {
    try {
      const updatedFieldType = await this.databaseService.fieldType.update({
        where: {
          uuid: fieldTypeId,
        },
        data: {
          name,
          description,
        },
      });

      return existenceEntityHandler(updatedFieldType, FieldTypeEntity, EntityName.FIELD_TYPE) as FieldTypeEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(fieldTypeId: EntityUrlParamCommand.RequestUuidParam): Promise<FieldTypeEntity> {
    try {
      const deletedFieldType = await this.databaseService.fieldType.delete({
        where: {
          uuid: fieldTypeId,
        },
      });

      return existenceEntityHandler(deletedFieldType, FieldTypeEntity, EntityName.FIELD_TYPE) as FieldTypeEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
