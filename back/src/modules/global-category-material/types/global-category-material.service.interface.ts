import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { GlobalCategoryMaterialCreateRequestDto } from '../dto/controller/create-global-category-material.dto';
import { GlobalCategoryMaterialUpdateRequestDto } from '../dto/controller/update-global-category-material.dto';
import { GlobalCategoryMaterialEntity } from '../entities/global-category-material.entity';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface IGlobalCategoryMaterialService
  extends IServiceCommon<GlobalCategoryMaterialCreateRequestDto, GlobalCategoryMaterialUpdateRequestDto, GlobalCategoryMaterialEntity> {
  getById: (
    globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<GlobalCategoryMaterialEntity>>;
  getAll: () => Promise<UniversalInternalResponse<GlobalCategoryMaterialEntity[]>>;
  create: (dto: GlobalCategoryMaterialCreateRequestDto) => Promise<UniversalInternalResponse<GlobalCategoryMaterialEntity>>;
  updateById: (
    globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: GlobalCategoryMaterialUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<GlobalCategoryMaterialEntity>>;
  deleteById: (
    globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<GlobalCategoryMaterialEntity>>;
}
