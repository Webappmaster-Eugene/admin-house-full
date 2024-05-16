import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { CategoryMaterialCreateRequestDto } from '../dto/controller/create-category-material.dto';
import { CategoryMaterialUpdateRequestDto } from '../dto/controller/update-category-material.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { CategoryMaterialEntity } from '../entities/category-material.entity';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface ICategoryMaterialService
  extends IServiceCommon<CategoryMaterialCreateRequestDto, CategoryMaterialUpdateRequestDto, CategoryMaterialEntity> {
  getById: (categoryMaterialId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<CategoryMaterialEntity>>;
  getAll: (queryParams?: IQueryParams) => Promise<UniversalInternalResponse<CategoryMaterialEntity[]>>;
  create: (
    dto: CategoryMaterialCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<CategoryMaterialEntity>>;
  updateById: (
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: CategoryMaterialUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<CategoryMaterialEntity>>;
  deleteById: (categoryMaterialId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<CategoryMaterialEntity>>;
}
