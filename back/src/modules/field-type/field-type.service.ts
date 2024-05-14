import { Inject, Injectable } from '@nestjs/common';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { KFI } from '../../common/utils/di';
import { FieldTypeEntity } from './entities/field-type.entity';
import { IFieldTypeRepository } from './types/field-type.repository.interface';
import { IFieldTypeService } from './types/field-type.service.interface';
import { FieldTypeUpdateRequestDto } from './dto/controller/update-field-type.dto';
import { FieldTypeCreateRequestDto } from './dto/controller/create-field-type.dto';
import { IQueryParams } from '../../common/decorators/query-params.decorator';

@Injectable()
export class FieldTypeService implements IFieldTypeService {
  constructor(
    @Inject(KFI.FIELD_TYPE_REPOSITORY)
    private readonly fieldTypeRepository: IFieldTypeRepository,
  ) {}

  async getById(fieldTypeId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<FieldTypeEntity>> {
    const findedTypeField = await this.fieldTypeRepository.getById(fieldTypeId);
    return new InternalResponse(findedTypeField);
  }

  async getAll(queryParams?: IQueryParams): Promise<UniversalInternalResponse<FieldTypeEntity[]>> {
    const { skip, take } = queryParams;
    const allTypeFields = await this.fieldTypeRepository.getAll(skip, take);
    return new InternalResponse(allTypeFields);
  }

  // для создания TypeField нужно указать id пользователя (менеджера), для которого создается TypeField
  async create(
    dto: FieldTypeCreateRequestDto,
    fieldTypeId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<FieldTypeEntity>> {
    const createdTypeField = await this.fieldTypeRepository.create(dto, fieldTypeId);
    return new InternalResponse(createdTypeField);
  }

  async updateById(
    fieldTypeIdId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldTypeUpdateRequestDto,
  ): Promise<UniversalInternalResponse<FieldTypeEntity>> {
    const updatedTypeField = await this.fieldTypeRepository.updateById(fieldTypeIdId, dto);
    return new InternalResponse(updatedTypeField);
  }

  async deleteById(fieldTypeIdId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<FieldTypeEntity>> {
    const deletedTypeField = await this.fieldTypeRepository.deleteById(fieldTypeIdId);
    return new InternalResponse(deletedTypeField);
  }
}
