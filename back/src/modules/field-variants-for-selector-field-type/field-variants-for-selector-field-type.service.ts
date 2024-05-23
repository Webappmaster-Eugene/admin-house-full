import { Inject, Injectable } from '@nestjs/common';
import { FieldVariantsForSelectorFieldTypeEntity } from './entities/field-variants-for-selector-field-type.entity';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { KFI } from '../../common/utils/di';
import { IFieldVariantsForSelectorFieldTypeRepository } from './types/field-variants-for-selector-field-type.repository.interface';
import { FieldVariantsForSelectorFieldTypeUpdateRequestDto } from './dto/controller/update-field-variants-for-selector-field-type.dto';
import { IFieldVariantsForSelectorFieldTypeService } from './types/field-variants-for-selector-field-type.service.interface';
import { FieldVariantsForSelectorFieldTypeCreateRequestDto } from './dto/controller/create-field-variants-for-selector-field-type.dto';
import { IQueryParams } from '../../common/decorators/query-params.decorator';

@Injectable()
export class FieldVariantsForSelectorFieldTypeService implements IFieldVariantsForSelectorFieldTypeService {
  constructor(
    @Inject(KFI.FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_REPOSITORY)
    private readonly fieldVariantsForSelectorFieldTypeRepository: IFieldVariantsForSelectorFieldTypeRepository,
  ) {}

  async getById(
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<FieldVariantsForSelectorFieldTypeEntity>> {
    const findedFieldVariantsForSelectorFieldType =
      await this.fieldVariantsForSelectorFieldTypeRepository.getById(fieldVariantsForSelectorFieldTypeId);
    return new InternalResponse(findedFieldVariantsForSelectorFieldType);
  }

  async getAll(queryParams?: IQueryParams): Promise<UniversalInternalResponse<FieldVariantsForSelectorFieldTypeEntity[]>> {
    const { skip, take } = queryParams;
    const allFieldVariantsForSelectorFieldTypes = await this.fieldVariantsForSelectorFieldTypeRepository.getAll(skip, take);
    return new InternalResponse(allFieldVariantsForSelectorFieldTypes);
  }

  async getAllInHandbook(
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ): Promise<UniversalInternalResponse<FieldVariantsForSelectorFieldTypeEntity[]>> {
    const { skip, take } = queryParams;
    const allFieldVariantsForSelectorFieldTypes = await this.fieldVariantsForSelectorFieldTypeRepository.getAllInHandbook(
      handbookId,
      skip,
      take,
    );
    return new InternalResponse(allFieldVariantsForSelectorFieldTypes);
  }

  async getAllInFieldOfCategoryMaterial(
    fieldOfCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ): Promise<UniversalInternalResponse<FieldVariantsForSelectorFieldTypeEntity[]>> {
    const { skip, take } = queryParams;
    const allFieldVariantsForSelectorFieldTypes = await this.fieldVariantsForSelectorFieldTypeRepository.getAllInFieldOfCategoryMaterial(
      fieldOfCategoryMaterialId,
      skip,
      take,
    );
    return new InternalResponse(allFieldVariantsForSelectorFieldTypes);
  }

  async create(
    dto: FieldVariantsForSelectorFieldTypeCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    fieldOfCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<FieldVariantsForSelectorFieldTypeEntity>> {
    const createdFieldVariantsForSelectorFieldType = await this.fieldVariantsForSelectorFieldTypeRepository.create(
      dto,
      handbookId,
      fieldOfCategoryMaterialId,
    );
    return new InternalResponse(createdFieldVariantsForSelectorFieldType);
  }

  async updateById(
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldVariantsForSelectorFieldTypeUpdateRequestDto,
  ): Promise<UniversalInternalResponse<FieldVariantsForSelectorFieldTypeEntity>> {
    const updatedFieldVariantsForSelectorFieldType = await this.fieldVariantsForSelectorFieldTypeRepository.updateById(
      fieldVariantsForSelectorFieldTypeId,
      dto,
    );
    return new InternalResponse(updatedFieldVariantsForSelectorFieldType);
  }

  async deleteById(
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<FieldVariantsForSelectorFieldTypeEntity>> {
    const deletedFieldVariantsForSelectorFieldType =
      await this.fieldVariantsForSelectorFieldTypeRepository.deleteById(fieldVariantsForSelectorFieldTypeId);
    return new InternalResponse(deletedFieldVariantsForSelectorFieldType);
  }
}
