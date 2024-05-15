import { Inject, Injectable } from '@nestjs/common';
import { CategoryMaterialEntity } from './entities/category-material.entity';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { KFI } from '../../common/utils/di';
import { ICategoryMaterialRepository } from './types/category-material.repository.interface';
import { CategoryMaterialUpdateRequestDto } from './dto/controller/update-category-material.dto';
import { ICategoryMaterialService } from './types/category-material.service.interface';
import { CategoryMaterialCreateRequestDto } from './dto/controller/create-category-material.dto';
import { IQueryParams } from '../../common/decorators/query-params.decorator';

@Injectable()
export class CategoryMaterialService implements ICategoryMaterialService {
  constructor(
    @Inject(KFI.CATEGORY_MATERIAL_REPOSITORY)
    private readonly categoryMaterialRepository: ICategoryMaterialRepository,
  ) {}

  async getById(categoryMaterialId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<CategoryMaterialEntity>> {
    const findedCategoryMaterial = await this.categoryMaterialRepository.getById(categoryMaterialId);
    return new InternalResponse(findedCategoryMaterial);
  }

  async getAll(queryParams?: IQueryParams): Promise<UniversalInternalResponse<CategoryMaterialEntity[]>> {
    const { skip, take } = queryParams;
    const allCategoryMaterials = await this.categoryMaterialRepository.getAll(skip, take);
    return new InternalResponse(allCategoryMaterials);
  }

  async create(
    dto: CategoryMaterialCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<CategoryMaterialEntity>> {
    const createdCategoryMaterial = await this.categoryMaterialRepository.create(dto, handbookId);
    return new InternalResponse(createdCategoryMaterial);
  }

  async updateById(
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: CategoryMaterialUpdateRequestDto,
  ): Promise<UniversalInternalResponse<CategoryMaterialEntity>> {
    const updatedCategoryMaterial = await this.categoryMaterialRepository.updateById(categoryMaterialId, dto);
    return new InternalResponse(updatedCategoryMaterial);
  }

  async deleteById(categoryMaterialId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<CategoryMaterialEntity>> {
    const deletedCategoryMaterial = await this.categoryMaterialRepository.deleteById(categoryMaterialId);
    return new InternalResponse(deletedCategoryMaterial);
  }
}
