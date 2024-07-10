import { CategoryMaterialCreateRequestDto } from '../dto/controller/create-category-material.dto';
import { CategoryMaterialUpdateRequestDto } from '../dto/controller/update-category-material.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';
import { CategoryMaterialEntity } from '../entities/category-material.entity';

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
  deleteById: (categoryMaterialId: EntityUrlParamCommand.RequestUuidParam) => Promise<CategoryMaterialEntity>;
}
