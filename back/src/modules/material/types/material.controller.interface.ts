import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import { MaterialCreateRequestDto, MaterialCreateResponseDto } from '../dto/controller/create-material.dto';
import { MaterialUpdateRequestDto, MaterialUpdateResponseDto } from '../dto/controller/update-material.dto';
import { MaterialGetResponseDto } from '../dto/controller/get-material.dto';
import { MaterialGetAllResponseDto } from '../dto/controller/get-all-materials.dto';
import { EntityUrlParamCommand } from 'libs/contracts';
import { MaterialDeleteResponseDto } from '../dto/controller/delete-material.dto';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';
import {
  MaterialUpdateNameRequestDto,
  MaterialUpdateNameResponseDto,
} from '../../../modules/material/dto/controller/update-name-material.dto';
import {
  MaterialUpdateCategoryRequestDto,
  MaterialUpdateCategoryResponseDto,
} from '../../../modules/material/dto/controller/update-category-material.dto';

export interface IMaterialController
  extends IControllerCommon<
    MaterialCreateRequestDto,
    MaterialUpdateRequestDto,
    MaterialGetResponseDto,
    MaterialGetAllResponseDto,
    MaterialCreateResponseDto,
    MaterialUpdateResponseDto,
    MaterialDeleteResponseDto
  > {
  getByIdEP: (materialId: EntityUrlParamCommand.RequestUuidParam, urlParams: IUrlParams) => Promise<MaterialGetResponseDto>;
  getAllEP: (urlParams: IUrlParams, queryParams?: IQueryParams) => Promise<MaterialGetAllResponseDto>;
  getAllInHandbookEP: (
    urlParams: IUrlParams,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<MaterialGetAllResponseDto>;
  getAllInCategoryMaterialEP: (
    urlParams: IUrlParams,
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<MaterialGetAllResponseDto>;
  createEP: (
    dto: MaterialCreateRequestDto,
    urlParams: IUrlParams,
    userInfoFromJWT: IJWTPayload,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<MaterialCreateResponseDto>;
  updateByIdEP: (
    materialId: EntityUrlParamCommand.RequestUuidParam,
    dto: MaterialUpdateRequestDto,
    urlParams: IUrlParams,
    userInfoFromJWT: IJWTPayload,
  ) => Promise<MaterialUpdateResponseDto>;
  changeCategoryOfMaterialByIdEP: (
    materialId: EntityUrlParamCommand.RequestUuidParam,
    dto: MaterialUpdateCategoryRequestDto,
    urlParams: IUrlParams,
    userInfoFromJWT: IJWTPayload,
  ) => Promise<MaterialUpdateCategoryResponseDto>;
  updateNameForMaterialByIdEP: (
    materialId: EntityUrlParamCommand.RequestUuidParam,
    dto: MaterialUpdateNameRequestDto,
    urlParams: IUrlParams,
    userInfoFromJWT: IJWTPayload,
  ) => Promise<MaterialUpdateNameResponseDto>;
  deleteByIdEP: (materialId: EntityUrlParamCommand.RequestUuidParam, urlParams: IUrlParams) => Promise<MaterialDeleteResponseDto>;
}
