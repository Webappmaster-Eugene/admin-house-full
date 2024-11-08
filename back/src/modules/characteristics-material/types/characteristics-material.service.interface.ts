import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { CharacteristicsMaterialCreateRequestDto } from '../dto/controller/create-characteristics-material.dto';
import { CharacteristicsMaterialUpdateRequestDto } from '../dto/controller/update-characteristics-material.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { CharacteristicsMaterialEntity } from '../entities/characteristics-material.entity';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';
import { EntityUrlParamCommand } from 'libs/contracts';

export interface ICharacteristicsMaterialService
  extends IServiceCommon<CharacteristicsMaterialCreateRequestDto, CharacteristicsMaterialUpdateRequestDto, CharacteristicsMaterialEntity> {
  getById: (
    characteristicsMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<CharacteristicsMaterialEntity>>;
  getAll: (queryParams?: IQueryParams) => Promise<UniversalInternalResponse<CharacteristicsMaterialEntity[]>>;
  getAllInHandbook: (
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<UniversalInternalResponse<CharacteristicsMaterialEntity[]>>;
  getAllInCategoryMaterial: (
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<UniversalInternalResponse<CharacteristicsMaterialEntity[]>>;
  getAllInMaterial: (
    materialId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<UniversalInternalResponse<CharacteristicsMaterialEntity[]>>;
  create: (
    dto: CharacteristicsMaterialCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    materialId: EntityUrlParamCommand.RequestUuidParam,
    fieldCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<CharacteristicsMaterialEntity>>;
  updateById: (
    characteristicsMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: CharacteristicsMaterialUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<CharacteristicsMaterialEntity>>;
  updateManyStatusByMaterialId: (
    materialId: EntityUrlParamCommand.RequestUuidParam,
    dto: CharacteristicsMaterialCreateRequestDto,
  ) => Promise<UniversalInternalResponse<CharacteristicsMaterialEntity[]>>;
  deleteById: (
    characteristicsMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<CharacteristicsMaterialEntity>>;
}
