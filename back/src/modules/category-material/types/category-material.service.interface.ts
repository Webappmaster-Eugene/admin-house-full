import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { CategoryMaterialCreateRequestDto } from '../dto/controller/create-category-material.dto';
import { CategoryMaterialUpdateRequestDto } from '../dto/controller/update-category-material.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { CategoryMaterialEntity } from '../entities/category-material.entity';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';
import { EntityUrlParamCommand } from 'libs/contracts';
import { Param, ParseUUIDPipe } from '@nestjs/common';

export interface ICategoryMaterialService
  extends IServiceCommon<CategoryMaterialCreateRequestDto, CategoryMaterialUpdateRequestDto, CategoryMaterialEntity> {
  getById: (categoryMaterialId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<CategoryMaterialEntity>>;
  getDefaultCategory: (handbookId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<CategoryMaterialEntity>>;
  getAll: (queryParams?: IQueryParams) => Promise<UniversalInternalResponse<CategoryMaterialEntity[]>>;
  getAllWithIds: (
    categoryIds: EntityUrlParamCommand.RequestUuidParam[],
    queryParams?: IQueryParams,
  ) => Promise<UniversalInternalResponse<CategoryMaterialEntity[]>>;
  getAllInHandbook: (
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<UniversalInternalResponse<CategoryMaterialEntity[]>>;
  create: (
    dto: CategoryMaterialCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<CategoryMaterialEntity>>;
  updateById: (
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: CategoryMaterialUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<CategoryMaterialEntity>>;
  rebuildCategoryMaterialNameById: (
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<CategoryMaterialEntity>>;
  deleteById: (
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<CategoryMaterialEntity>>;
  deleteManyByIds: (
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    categoryMaterialIds: EntityUrlParamCommand.RequestUuidParam[],
  ) => Promise<UniversalInternalResponse<CategoryMaterialEntity[]>>;
}
