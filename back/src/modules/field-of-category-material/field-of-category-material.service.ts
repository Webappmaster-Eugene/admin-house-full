import { Inject, Injectable } from '@nestjs/common';
import { EntityUrlParamCommand } from 'libs/contracts';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { KFI } from '../../common/utils/di';
import { FieldOfCategoryMaterialEntity } from './entities/field-of-category-material.entity';
import { IFieldOfCategoryMaterialRepository } from './types/field-of-category-material.repository.interface';
import { IFieldOfCategoryMaterialService } from './types/field-of-category-material.service.interface';
import { FieldOfCategoryMaterialUpdateRequestDto } from './dto/controller/update-field-of-category-material.dto';
import { FieldOfCategoryMaterialCreateRequestDto } from './dto/controller/create-field-of-category-material.dto';
import { IQueryParams } from '../../common/decorators/query-params.decorator';

@Injectable()
export class FieldOfCategoryMaterialService implements IFieldOfCategoryMaterialService {
  constructor(
    @Inject(KFI.FIELD_OF_CATEGORY_MATERIAL_REPOSITORY)
    private readonly fieldOfCategoryMaterialRepository: IFieldOfCategoryMaterialRepository,
  ) {}

  async getById(
    fieldOfCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<FieldOfCategoryMaterialEntity>> {
    const findedFieldOfCategoryMaterial = await this.fieldOfCategoryMaterialRepository.getById(fieldOfCategoryMaterialId);
    return new InternalResponse(findedFieldOfCategoryMaterial);
  }

  async getAll(queryParams?: IQueryParams): Promise<UniversalInternalResponse<FieldOfCategoryMaterialEntity[]>> {
    const { skip, take } = queryParams;
    const allFieldOfCategoryMaterials = await this.fieldOfCategoryMaterialRepository.getAll(skip, take);
    return new InternalResponse(allFieldOfCategoryMaterials);
  }

  async getAllInHandbook(
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ): Promise<UniversalInternalResponse<FieldOfCategoryMaterialEntity[]>> {
    const { skip, take } = queryParams;
    const allFieldOfCategoryMaterials = await this.fieldOfCategoryMaterialRepository.getAllInHandbook(handbookId, skip, take);
    return new InternalResponse(allFieldOfCategoryMaterials);
  }

  async getAllInCategoryMaterial(
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ): Promise<UniversalInternalResponse<FieldOfCategoryMaterialEntity[]>> {
    const { skip, take } = queryParams;
    const allFieldOfCategoryMaterials = await this.fieldOfCategoryMaterialRepository.getAllInCategoryMaterial(
      categoryMaterialId,
      skip,
      take,
    );
    return new InternalResponse(allFieldOfCategoryMaterials);
  }

  async create(
    dto: FieldOfCategoryMaterialCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<FieldOfCategoryMaterialEntity>> {
    const createdFieldOfCategoryMaterial = await this.fieldOfCategoryMaterialRepository.create(dto, handbookId, categoryMaterialId, userId);
    return new InternalResponse(createdFieldOfCategoryMaterial);
  }

  async updateById(
    fieldOfCategoryMaterialIdId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldOfCategoryMaterialUpdateRequestDto,
  ): Promise<UniversalInternalResponse<FieldOfCategoryMaterialEntity>> {
    const updatedFieldOfCategoryMaterial = await this.fieldOfCategoryMaterialRepository.updateById(fieldOfCategoryMaterialIdId, dto);
    return new InternalResponse(updatedFieldOfCategoryMaterial);
  }

  async deleteById(
    fieldOfCategoryMaterialIdId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<FieldOfCategoryMaterialEntity>> {
    const deletedFieldOfCategoryMaterial = await this.fieldOfCategoryMaterialRepository.deleteById(fieldOfCategoryMaterialIdId);
    return new InternalResponse(deletedFieldOfCategoryMaterial);
  }
}
