import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { CharacteristicsMaterialCreateRequestDto } from '../dto/controller/create-characteristics-material.dto';
import { CharacteristicsMaterialUpdateRequestDto } from '../dto/controller/update-characteristics-material.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { CharacteristicsMaterialEntity } from '../entities/characteristics-material.entity';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface ICharacteristicsMaterialService
  extends IServiceCommon<CharacteristicsMaterialCreateRequestDto, CharacteristicsMaterialUpdateRequestDto, CharacteristicsMaterialEntity> {
  getById: (
    characteristicsMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<CharacteristicsMaterialEntity>>;
  getAll: (queryParams?: IQueryParams) => Promise<UniversalInternalResponse<CharacteristicsMaterialEntity[]>>;
  create: (
    dto: CharacteristicsMaterialCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    materialId: EntityUrlParamCommand.RequestUuidParam,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<CharacteristicsMaterialEntity>>;
  updateById: (
    characteristicsMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: CharacteristicsMaterialUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<CharacteristicsMaterialEntity>>;
  deleteById: (
    characteristicsMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<CharacteristicsMaterialEntity>>;
}
