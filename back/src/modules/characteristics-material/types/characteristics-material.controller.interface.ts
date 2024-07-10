import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';
import {
  CharacteristicsMaterialCreateRequestDto,
  CharacteristicsMaterialCreateResponseDto,
} from '../dto/controller/create-characteristics-material.dto';
import {
  CharacteristicsMaterialUpdateRequestDto,
  CharacteristicsMaterialUpdateResponseDto,
} from '../dto/controller/update-characteristics-material.dto';
import { CharacteristicsMaterialDeleteResponseDto } from '../dto/controller/delete-characteristics-material.dto';
import { CharacteristicsMaterialGetAllResponseDto } from '../dto/controller/get-all-characteristics-materials.dto';
import { CharacteristicsMaterialGetResponseDto } from '../dto/controller/get-characteristics-material.dto';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface ICharacteristicsMaterialController
  extends IControllerCommon<
    CharacteristicsMaterialCreateRequestDto,
    CharacteristicsMaterialUpdateRequestDto,
    CharacteristicsMaterialGetResponseDto,
    CharacteristicsMaterialGetAllResponseDto,
    CharacteristicsMaterialCreateResponseDto,
    CharacteristicsMaterialUpdateResponseDto,
    CharacteristicsMaterialDeleteResponseDto
  > {
  getByIdEP: (
    characteristicsMaterialId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<CharacteristicsMaterialGetResponseDto>;
  getAllEP: (urlParams: IUrlParams, queryParams?: IQueryParams) => Promise<CharacteristicsMaterialGetAllResponseDto>;
  getAllInHandbookEP: (
    urlParams: IUrlParams,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<CharacteristicsMaterialGetAllResponseDto>;
  getAllInCategoryMaterialEP: (
    urlParams: IUrlParams,
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<CharacteristicsMaterialGetAllResponseDto>;
  getAllInMaterialEP: (
    urlParams: IUrlParams,
    materialId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<CharacteristicsMaterialGetAllResponseDto>;
  createEP: (
    dto: CharacteristicsMaterialCreateRequestDto,
    urlParams: IUrlParams,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    materialId: EntityUrlParamCommand.RequestUuidParam,
    fieldCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    userInfoFromJWT: IJWTPayload,
  ) => Promise<CharacteristicsMaterialCreateResponseDto>;
  updateByIdEP: (
    characteristicsMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: CharacteristicsMaterialUpdateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<CharacteristicsMaterialUpdateResponseDto>;
  deleteByIdEP: (
    characteristicsMaterialId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<CharacteristicsMaterialDeleteResponseDto>;
}
