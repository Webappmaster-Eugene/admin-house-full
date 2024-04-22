import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { CategoryMaterialCreateRequestDto } from '../dto/controller/create-category-material.dto';
import { CategoryMaterialUpdateRequestDto } from '../dto/controller/update-category-material.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { CategoryMaterialEntity } from '../entities/category-material.entity';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';

export interface ICategoryMaterialService
  extends IServiceCommon<
    CategoryMaterialCreateRequestDto,
    CategoryMaterialUpdateRequestDto,
    CategoryMaterialEntity
  > {
  getById: (
    category-materialId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<CategoryMaterialEntity>>;
  getByManagerId: (
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<CategoryMaterialEntity>>;
  getAll: () => Promise<UniversalInternalResponse<CategoryMaterialEntity[]>>;
  create: (
    dto: CategoryMaterialCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<CategoryMaterialEntity>>;
  updateById: (
    category-materialId: EntityUrlParamCommand.RequestUuidParam,
    dto: CategoryMaterialUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<CategoryMaterialEntity>>;
  deleteById: (
    category-materialId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<CategoryMaterialEntity>>;
}
