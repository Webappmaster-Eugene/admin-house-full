import { Inject, Injectable } from '@nestjs/common';
import { TypeFieldEntity } from './entities/type-field.entity';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import {
  InternalResponse,
  UniversalInternalResponse,
} from '../../common/types/responses/universal-internal-response.interface';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { ITypeFieldRepository } from './types/type-field.repository.interface';
import { TypeFieldUpdateRequestDto } from './dto/controller/update-type-field.dto';
import { ITypeFieldService } from './types/type-field.service.interface';
import { TypeFieldCreateRequestDto } from './dto/controller/create-type-field.dto';

@Injectable()
export class TypeFieldService implements ITypeFieldService {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_TYPE_FIELD_REPOSITORY)
    private readonly typeFieldRepository: ITypeFieldRepository,
  ) {}

  async getById(
    typeFieldId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<TypeFieldEntity>> {
    const findedTypeField = await this.typeField.getById(typeFieldId);
    return new InternalResponse<TypeFieldEntity>(findedTypeField);
  }

  async getAll(): Promise<UniversalInternalResponse<TypeFieldEntity[]>> {
    const allTypeFields = await this.typeFieldRepository.getAll();
    return new InternalResponse<TypeFieldEntity[]>(allTypeFields);
  }

  // для создания TypeField нужно указать id пользователя (менеджера), для которого создается TypeField
  async create(
    dto: TypeFieldCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<TypeFieldEntity>> {
    const createdTypeField = await this.typeFieldRepository.create(
      dto,
      managerId,
    );
    return new InternalResponse<TypeFieldEntity>(createdTypeField);
  }

  async updateById(
    typeFieldId: EntityUrlParamCommand.RequestUuidParam,
    dto: TypeFieldUpdateRequestDto,
  ): Promise<UniversalInternalResponse<TypeFieldEntity>> {
    const updatedTypeField = await this.typeField.updateById(typeFieldId, dto);
    return new InternalResponse<TypeFieldEntity>(updatedTypeField);
  }

  async deleteById(
    typeFieldId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<TypeFieldEntity>> {
    const deletedTypeField =
      await this.typeFieldRepository.deleteById(typeFieldId);
    return new InternalResponse<TypeFieldEntity>(deletedTypeField);
  }
}
