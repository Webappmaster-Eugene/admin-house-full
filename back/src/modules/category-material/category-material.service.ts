import { Inject, Injectable } from '@nestjs/common';
import { CategoryMaterialEntity } from './entities/category-material.entity';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import {
  InternalResponse,
  UniversalInternalResponse,
} from '../../common/types/responses/universal-internal-response.interface';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { ICategoryMaterialRepository } from './types/category-material.repository.interface';
import { CategoryMaterialUpdateRequestDto } from './dto/controller/update-category-material.dto';
import { ICategoryMaterialService } from './types/category-material.service.interface';
import { CategoryMaterialCreateRequestDto } from './dto/controller/create-category-material.dto';

@Injectable()
export class CategoryMaterialService implements ICategoryMaterialService {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_CATEGORY_MATERIAL_REPOSITORY)
    private readonly categoryMaterialRepository: ICategoryMaterialRepository,
  ) {}

  async getById(
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<CategoryMaterialEntity>> {
    const findedCategoryMaterial =
      await this.categoryMaterialRepository.getById(categoryMaterialId);
    return new InternalResponse<CategoryMaterialEntity>(findedCategoryMaterial);
  }

  async getAll(): Promise<UniversalInternalResponse<CategoryMaterialEntity[]>> {
    const allCategoryMaterials = await this.categoryMaterialRepository.getAll();
    return new InternalResponse<CategoryMaterialEntity[]>(allCategoryMaterials);
  }

  // для создания CategoryMaterial нужно указать id пользователя (менеджера), для которого создается CategoryMaterial
  async create(
    dto: CategoryMaterialCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<CategoryMaterialEntity>> {
    const createdCategoryMaterial =
      await this.categoryMaterialRepository.create(dto, managerId);
    return new InternalResponse<CategoryMaterialEntity>(
      createdCategoryMaterial,
    );
  }

  async updateById(
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: CategoryMaterialUpdateRequestDto,
  ): Promise<UniversalInternalResponse<CategoryMaterialEntity>> {
    const updatedCategoryMaterial =
      await this.categoryMaterialRepository.updateById(categoryMaterialId, dto);
    return new InternalResponse<CategoryMaterialEntity>(
      updatedCategoryMaterial,
    );
  }

  async deleteById(
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<CategoryMaterialEntity>> {
    const deletedCategoryMaterial =
      await this.categoryMaterialRepository.deleteById(categoryMaterialId);
    return new InternalResponse<CategoryMaterialEntity>(
      deletedCategoryMaterial,
    );
  }
}
