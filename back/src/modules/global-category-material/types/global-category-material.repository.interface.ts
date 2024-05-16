import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { GlobalCategoryMaterialEntity } from '../entities/global-category-material.entity';
import { GlobalCategoryMaterialCreateRequestDto } from '../dto/controller/create-global-category-material.dto';
import { GlobalCategoryMaterialUpdateRequestDto } from '../dto/controller/update-global-category-material.dto';

export interface IGlobalCategoryMaterialRepository
  extends IRepositoryCommon<GlobalCategoryMaterialCreateRequestDto, GlobalCategoryMaterialUpdateRequestDto, GlobalCategoryMaterialEntity> {
  getById: (globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam) => Promise<GlobalCategoryMaterialEntity>;
  getAll: () => Promise<GlobalCategoryMaterialEntity[]>;
  create: (dto: GlobalCategoryMaterialCreateRequestDto) => Promise<GlobalCategoryMaterialEntity>;
  updateById: (
    globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: GlobalCategoryMaterialUpdateRequestDto,
  ) => Promise<GlobalCategoryMaterialEntity>;
  deleteById: (globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam) => Promise<GlobalCategoryMaterialEntity>;
}
