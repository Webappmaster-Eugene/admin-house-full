import { Inject, Injectable } from '@nestjs/common';
import { FieldVariantsForSelectorFieldTypeEntity } from './entities/field-variants-for-selector-field-type.entity';
import { EntityUrlParamCommand } from 'libs/contracts';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { KFI } from '../../common/utils/di';
import { IFieldVariantsForSelectorFieldTypeRepository } from './types/field-variants-for-selector-field-type.repository.interface';
import { FieldVariantsForSelectorFieldTypeUpdateRequestDto } from './dto/controller/update-field-variants-for-selector-field-type.dto';
import { IFieldVariantsForSelectorFieldTypeService } from './types/field-variants-for-selector-field-type.service.interface';
import { FieldVariantsForSelectorFieldTypeCreateRequestDto } from './dto/controller/create-field-variants-for-selector-field-type.dto';
import { IQueryParams } from '../../common/decorators/query-params.decorator';
import { IFieldOfCategoryMaterialRepository } from '../../modules/field-of-category-material/types/field-of-category-material.repository.interface';
import { IFieldOfCategoryMaterialService } from '../../modules/field-of-category-material/types/field-of-category-material.service.interface';
import { dataInternalExtractor } from '../../common/helpers/extractors/data-internal.extractor';
import { BackendErrorNames, InternalError } from '../../common/errors';

@Injectable()
export class FieldVariantsForSelectorFieldTypeService implements IFieldVariantsForSelectorFieldTypeService {
  constructor(
    @Inject(KFI.FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_REPOSITORY)
    private readonly fieldVariantsForSelectorFieldTypeRepository: IFieldVariantsForSelectorFieldTypeRepository,
    @Inject(KFI.FIELD_OF_CATEGORY_MATERIAL_SERVICE)
    private readonly fieldOfCategoryMaterialService: IFieldOfCategoryMaterialService,
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
    const fieldOfCategoryMaterial = dataInternalExtractor(await this.fieldOfCategoryMaterialService.getById(fieldOfCategoryMaterialId));

    if (fieldOfCategoryMaterial.fieldType.jsType !== 'array') {
      throw new InternalResponse(new InternalError(BackendErrorNames.FIELD_TYPE_ERROR));
    }
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
    const fieldVariantsForSelectorFieldType =
      await this.fieldVariantsForSelectorFieldTypeRepository.getById(fieldVariantsForSelectorFieldTypeId);
    const fieldOfCategoryMaterial = dataInternalExtractor(
      await this.fieldOfCategoryMaterialService.getById(fieldVariantsForSelectorFieldType.fieldOfCategoryMaterialUuid),
    );

    if (fieldOfCategoryMaterial.fieldType.jsType !== 'array') {
      throw new InternalResponse(new InternalError(BackendErrorNames.FIELD_TYPE_ERROR));
    }
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
