import { CategoryMaterialCreateRequestDto } from '../dto/controller/create-category-material.dto';
import { CategoryMaterialUpdateRequestDto } from '../dto/controller/update-category-material.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { CategoryMaterialEntity } from '../entities/category-material.entity';
import { EntityUrlParamCommand } from 'libs/contracts';
import { UniversalInternalResponse } from 'src/common/types/responses/universal-internal-response.interface';

export interface ICategoryMaterialRepository
  extends IRepositoryCommon<CategoryMaterialCreateRequestDto, CategoryMaterialUpdateRequestDto, CategoryMaterialEntity> {
  getById: (categoryMaterialId: EntityUrlParamCommand.RequestUuidParam) => Promise<CategoryMaterialEntity>;
  getAll: (skip?: number, take?: number) => Promise<CategoryMaterialEntity[]>;
  getAllInHandbook: (handbookId: EntityUrlParamCommand.RequestUuidParam, skip?: number, take?: number) => Promise<CategoryMaterialEntity[]>;
  create: (dto: CategoryMaterialCreateRequestDto, handbookId: EntityUrlParamCommand.RequestUuidParam) => Promise<CategoryMaterialEntity>;
  updateById: (
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: CategoryMaterialUpdateRequestDto,
  ) => Promise<CategoryMaterialEntity>;
  rebuildCategoryMaterialNameById: (categoryMaterialId: EntityUrlParamCommand.RequestUuidParam) => Promise<CategoryMaterialEntity>;
  deleteById: (categoryMaterialId: EntityUrlParamCommand.RequestUuidParam) => Promise<CategoryMaterialEntity>;
}
