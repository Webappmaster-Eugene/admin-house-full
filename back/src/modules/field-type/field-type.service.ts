import { Inject, Injectable } from '@nestjs/common';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import {
  InternalResponse,
  UniversalInternalResponse,
} from '../../common/types/responses/universal-internal-response.interface';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { FieldTypeEntity } from './entities/field-type.entity';
import { IFieldTypeRepository } from './types/field-type.repository.interface';
import { IFieldTypeService } from './types/field-type.service.interface';
import { FieldTypeUpdateRequestDto } from './dto/controller/update-field-type.dto';
import { FieldTypeCreateRequestDto } from './dto/controller/create-field-type.dto';

@Injectable()
export class FieldTypeService implements IFieldTypeService {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_FIELD_TYPE_SERVICE)
    private readonly fieldTypeRepository: IFieldTypeRepository,
  ) {}

  async getById(
    fieldTypeId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<FieldTypeEntity>> {
    const findedTypeField = await this.fieldTypeRepository.getById(fieldTypeId);
    return new InternalResponse<FieldTypeEntity>(findedTypeField);
  }

  async getAll(): Promise<UniversalInternalResponse<FieldTypeEntity[]>> {
    const allTypeFields = await this.fieldTypeRepository.getAll();
    return new InternalResponse<FieldTypeEntity[]>(allTypeFields);
  }

  // для создания TypeField нужно указать id пользователя (менеджера), для которого создается TypeField
  async create(
    dto: FieldTypeCreateRequestDto,
    fieldTypeId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<FieldTypeEntity>> {
    const createdTypeField = await this.fieldTypeRepository.create(
      dto,
      fieldTypeId,
    );
    return new InternalResponse<FieldTypeEntity>(createdTypeField);
  }

  async updateById(
    fieldTypeIdId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldTypeUpdateRequestDto,
  ): Promise<UniversalInternalResponse<FieldTypeEntity>> {
    const updatedTypeField = await this.fieldTypeRepository.updateById(
      fieldTypeIdId,
      dto,
    );
    return new InternalResponse<FieldTypeEntity>(updatedTypeField);
  }

  async deleteById(
    fieldTypeIdId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<FieldTypeEntity>> {
    const deletedTypeField =
      await this.fieldTypeRepository.deleteById(fieldTypeIdId);
    return new InternalResponse<FieldTypeEntity>(deletedTypeField);
  }
}
