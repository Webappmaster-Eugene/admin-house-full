import { Inject, Injectable } from '@nestjs/common';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IFieldTypeRepository } from './types/field-type.repository.interface';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { KFI } from '../../common/utils/di';
import { FieldTypeEntity } from './entities/field-type.entity';
import { FieldTypeCreateRequestDto } from './dto/controller/create-field-type.dto';
import { existenceEntityHandler } from '../../common/helpers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/error-repository.handler';
import { QUANTITY_LIMIT } from '../../common/consts/take-quantity.limitation';
import { limitTakeHandler } from '../../common/helpers/take-limit.handler';

@Injectable()
export class FieldTypeRepository implements IFieldTypeRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(fieldTypeId: EntityUrlParamCommand.RequestUuidParam): Promise<FieldTypeEntity> {
    try {
      const findedTypeField = await this.databaseService.fieldType.findUnique({
        where: {
          uuid: fieldTypeId,
        },
      });

      return existenceEntityHandler(findedTypeField, FieldTypeEntity, EntityName.FIELD_TYPE) as FieldTypeEntity;
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

  async create(dto: FieldTypeCreateRequestDto, fieldTypeId: EntityUrlParamCommand.RequestUuidParam): Promise<FieldTypeEntity> {
    try {
      const {} = dto;
      const newTypeField = await this.databaseService.fieldType.create({
        data: {},
      });
      return existenceEntityHandler(newTypeField, FieldTypeEntity, EntityName.FIELD_TYPE) as FieldTypeEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(
    typeFieldId: EntityUrlParamCommand.RequestUuidParam,
    { name, description }: FieldTypeCreateRequestDto,
  ): Promise<FieldTypeEntity> {
    try {
      const updatedTypeField = await this.databaseService.fieldType.update({
        where: {
          uuid: typeFieldId,
        },
        data: {
          name,
          description,
        },
      });

      return existenceEntityHandler(updatedTypeField, FieldTypeEntity, EntityName.FIELD_TYPE) as FieldTypeEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(fieldTypeId: EntityUrlParamCommand.RequestUuidParam): Promise<FieldTypeEntity> {
    try {
      const deletedTypeField = await this.databaseService.fieldType.delete({
        where: {
          uuid: fieldTypeId,
        },
      });

      return existenceEntityHandler(deletedTypeField, FieldTypeEntity, EntityName.FIELD_TYPE) as FieldTypeEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
