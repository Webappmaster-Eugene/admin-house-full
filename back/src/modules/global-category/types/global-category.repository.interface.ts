import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../../common/types/main/count.data';
import { GlobalCategoryCreateRequestDto } from '../dto/controller/create-global-category.dto';
import { GlobalCategoryUpdateRequestDto } from '../dto/controller/update-global-category.dto';
import { GlobalCategoryEntity } from '../entities/global-category.entity';

export interface IGlobalCategoryRepository
  extends IRepositoryCommon<
    GlobalCategoryCreateRequestDto,
    GlobalCategoryUpdateRequestDto,
    GlobalCategoryEntity
  > {
  getById: (
    globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<GlobalCategoryEntity>;
  getAllCount: () => Promise<CountData>;
  getAll: () => Promise<GlobalCategoryEntity[]>;
  create: (
    dto: GlobalCategoryCreateRequestDto,
  ) => Promise<GlobalCategoryEntity>;
  updateById: (
    globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
    dto: GlobalCategoryUpdateRequestDto,
  ) => Promise<GlobalCategoryEntity>;
  deleteById: (
    globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<GlobalCategoryEntity>;
}
