import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { GlobalCategoryCreateRequestDto } from '../dto/controller/create-global-category.dto';
import { GlobalCategoryUpdateRequestDto } from '../dto/controller/update-global-category.dto';
import { GlobalCategoryEntity } from '../entities/global-category.entity';

export interface IGlobalCategoryService
  extends IServiceCommon<
    GlobalCategoryCreateRequestDto,
    GlobalCategoryUpdateRequestDto,
    GlobalCategoryEntity
  > {
  getById: (
    globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<GlobalCategoryEntity>>;
  getAll: () => Promise<UniversalInternalResponse<GlobalCategoryEntity[]>>;
  create: (
    dto: GlobalCategoryCreateRequestDto,
  ) => Promise<UniversalInternalResponse<GlobalCategoryEntity>>;
  updateById: (
    globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
    dto: GlobalCategoryUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<GlobalCategoryEntity>>;
  deleteById: (
    globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<GlobalCategoryEntity>>;
}
