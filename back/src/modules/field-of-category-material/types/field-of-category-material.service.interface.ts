import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { FieldOfCategoryMaterialCreateRequestDto } from '../dto/controller/create-field-of-category-material.dto';
import { FieldOfCategoryMaterialUpdateRequestDto } from '../dto/controller/update-field-of-category-material.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';
import { FieldOfCategoryMaterialEntity } from '../entities/field-of-category-material.entity';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface IFieldOfCategoryMaterialService
  extends IServiceCommon<FieldOfCategoryMaterialCreateRequestDto, FieldOfCategoryMaterialUpdateRequestDto, FieldOfCategoryMaterialEntity> {
  getById: (
    fieldOfCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<FieldOfCategoryMaterialEntity>>;
  getAll: (queryParams?: IQueryParams) => Promise<UniversalInternalResponse<FieldOfCategoryMaterialEntity[]>>;
  getAllInHandbook: (
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<UniversalInternalResponse<FieldOfCategoryMaterialEntity[]>>;
  getAllInCategoryMaterial: (
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<UniversalInternalResponse<FieldOfCategoryMaterialEntity[]>>;
  create: (
    dto: FieldOfCategoryMaterialCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<FieldOfCategoryMaterialEntity>>;
  updateById: (
    fieldOfCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldOfCategoryMaterialUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<FieldOfCategoryMaterialEntity>>;
  deleteById: (
    fieldOfCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<FieldOfCategoryMaterialEntity>>;
}
