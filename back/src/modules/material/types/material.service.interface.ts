import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { MaterialCreateRequestDto } from '../dto/controller/create-material.dto';
import { MaterialUpdateRequestDto } from '../dto/controller/update-material.dto';
import { InternalResponse, UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { MaterialEntity } from '../entities/material.entity';
import { EntityUrlParamCommand } from 'libs/contracts';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { MaterialUpdateNameRequestDto } from 'src/modules/material/dto/controller/update-name-material.dto';
import { MaterialUpdateCategoryRequestDto } from 'src/modules/material/dto/controller/update-category-material.dto';

export interface IMaterialService extends IServiceCommon<MaterialCreateRequestDto, MaterialUpdateRequestDto, MaterialEntity> {
  getById: (materialId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<MaterialEntity>>;
  getAll: (queryParams?: IQueryParams) => Promise<UniversalInternalResponse<MaterialEntity[]>>;
  getAllInHandbook: (
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<UniversalInternalResponse<MaterialEntity[]>>;
  getAllInCategoryMaterial: (
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<UniversalInternalResponse<MaterialEntity[]>>;
  create: (
    dto: MaterialCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<MaterialEntity>>;
  updateById: (
    materialId: EntityUrlParamCommand.RequestUuidParam,
    dto: MaterialUpdateRequestDto,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<MaterialEntity>>;
  updateNameForMaterialById: (
    materialId: EntityUrlParamCommand.RequestUuidParam,
    dto: MaterialUpdateNameRequestDto,
  ) => Promise<UniversalInternalResponse<MaterialEntity>>;
  rebuildNameForMaterialById: (materialId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<MaterialEntity>>;
  changeCategoryMaterialById: (
    materialId: EntityUrlParamCommand.RequestUuidParam,
    dto: MaterialUpdateCategoryRequestDto,
  ) => Promise<UniversalInternalResponse<MaterialEntity>>;
  deleteById: (materialId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<MaterialEntity>>;
}
