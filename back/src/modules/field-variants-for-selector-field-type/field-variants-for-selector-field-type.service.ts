import { Inject, Injectable } from '@nestjs/common';
import { FieldVariantsForSelectorFieldTypeEntity } from './entities/field-variants-for-selector-field-type.entity';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import {
  InternalResponse,
  UniversalInternalResponse,
} from '../../common/types/responses/universal-internal-response.interface';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { IFieldVariantsForSelectorFieldTypeRepository } from './types/field-variants-for-selector-field-type.repository.interface';
import { FieldVariantsForSelectorFieldTypeUpdateRequestDto } from './dto/controller/update-field-variants-for-selector-field-type.dto';
import { IFieldVariantsForSelectorFieldTypeService } from './types/field-variants-for-selector-field-type.service.interface';
import { FieldVariantsForSelectorFieldTypeCreateRequestDto } from './dto/controller/create-field-variants-for-selector-field-type.dto';

@Injectable()
export class FieldVariantsForSelectorFieldTypeService
  implements IFieldVariantsForSelectorFieldTypeService
{
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_SERVICE)
    private readonly fieldVariantsForSelectorFieldTypeRepository: IFieldVariantsForSelectorFieldTypeRepository,
  ) {}

  async getById(
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<
    UniversalInternalResponse<FieldVariantsForSelectorFieldTypeEntity>
  > {
    const findedFieldVariantsForSelectorFieldType =
      await this.fieldVariantsForSelectorFieldTypeRepository.getById(
        fieldVariantsForSelectorFieldTypeId,
      );
    return new InternalResponse<FieldVariantsForSelectorFieldTypeEntity>(
      findedFieldVariantsForSelectorFieldType,
    );
  }

  async getAll(): Promise<
    UniversalInternalResponse<FieldVariantsForSelectorFieldTypeEntity[]>
  > {
    const allFieldVariantsForSelectorFieldTypes =
      await this.fieldVariantsForSelectorFieldTypeRepository.getAll();
    return new InternalResponse<FieldVariantsForSelectorFieldTypeEntity[]>(
      allFieldVariantsForSelectorFieldTypes,
    );
  }

  // для создания FieldVariantsForSelectorFieldType нужно указать id пользователя (менеджера), для которого создается FieldVariantsForSelectorFieldType
  async create(
    dto: FieldVariantsForSelectorFieldTypeCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<
    UniversalInternalResponse<FieldVariantsForSelectorFieldTypeEntity>
  > {
    const createdFieldVariantsForSelectorFieldType =
      await this.fieldVariantsForSelectorFieldTypeRepository.create(
        dto,
        managerId,
      );
    return new InternalResponse<FieldVariantsForSelectorFieldTypeEntity>(
      createdFieldVariantsForSelectorFieldType,
    );
  }

  async updateById(
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldVariantsForSelectorFieldTypeUpdateRequestDto,
  ): Promise<
    UniversalInternalResponse<FieldVariantsForSelectorFieldTypeEntity>
  > {
    const updatedFieldVariantsForSelectorFieldType =
      await this.fieldVariantsForSelectorFieldTypeRepository.updateById(
        fieldVariantsForSelectorFieldTypeId,
        dto,
      );
    return new InternalResponse<FieldVariantsForSelectorFieldTypeEntity>(
      updatedFieldVariantsForSelectorFieldType,
    );
  }

  async deleteById(
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<
    UniversalInternalResponse<FieldVariantsForSelectorFieldTypeEntity>
  > {
    const deletedFieldVariantsForSelectorFieldType =
      await this.fieldVariantsForSelectorFieldTypeRepository.deleteById(
        fieldVariantsForSelectorFieldTypeId,
      );
    return new InternalResponse<FieldVariantsForSelectorFieldTypeEntity>(
      deletedFieldVariantsForSelectorFieldType,
    );
  }
}
