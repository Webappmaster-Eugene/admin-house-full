import { CategoryMaterialCreateRequestDto } from '../dto/controller/create-category-material.dto';
import { CategoryMaterialUpdateRequestDto } from '../dto/controller/update-category-material.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../../common/types/main/count.data';
import { CategoryMaterialEntity } from '../entities/category-material.entity';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';

export interface ICategoryMaterialRepository
  extends IRepositoryCommon<
    CategoryMaterialCreateRequestDto,
    CategoryMaterialUpdateRequestDto,
    CategoryMaterialEntity
  > {
  getById: (
    category-materialId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<CategoryMaterialEntity>;
  getByManagerId: (
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<CategoryMaterialEntity>;
  getAllCount: () => Promise<CountData>;
  getAll: () => Promise<CategoryMaterialEntity[]>;
  create: (
    dto: CategoryMaterialCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<CategoryMaterialEntity>;
  updateById: (
    category-materialId: EntityUrlParamCommand.RequestUuidParam,
    dto: CategoryMaterialUpdateRequestDto,
  ) => Promise<CategoryMaterialEntity>;
  deleteById: (
    category-materialId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<CategoryMaterialEntity>;
}
