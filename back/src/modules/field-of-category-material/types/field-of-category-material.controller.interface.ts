import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import { EntityUrlParamCommand } from 'libs/contracts';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';
import {
  FieldOfCategoryMaterialCreateRequestDto,
  FieldOfCategoryMaterialCreateResponseDto,
} from '../dto/controller/create-field-of-category-material.dto';
import {
  FieldOfCategoryMaterialUpdateRequestDto,
  FieldOfCategoryMaterialUpdateResponseDto,
} from '../dto/controller/update-field-of-category-material.dto';
import { FieldOfCategoryMaterialDeleteResponseDto } from '../dto/controller/delete-field-of-category-material.dto';
import { FieldOfCategoryMaterialGetAllResponseDto } from '../dto/controller/get-all-field-of-category-materials.dto';
import { FieldOfCategoryMaterialGetResponseDto } from '../dto/controller/get-field-of-category-material.dto';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface IFieldOfCategoryMaterialController
  extends IControllerCommon<
    FieldOfCategoryMaterialCreateRequestDto,
    FieldOfCategoryMaterialUpdateRequestDto,
    FieldOfCategoryMaterialGetResponseDto,
    FieldOfCategoryMaterialGetAllResponseDto,
    FieldOfCategoryMaterialCreateResponseDto,
    FieldOfCategoryMaterialUpdateResponseDto,
    FieldOfCategoryMaterialDeleteResponseDto
  > {
  getByIdEP: (
    fieldOfCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<FieldOfCategoryMaterialGetResponseDto>;
  getAllEP: (urlParams: IUrlParams, queryParams?: IQueryParams) => Promise<FieldOfCategoryMaterialGetAllResponseDto>;
  getAllInHandbookEP: (
    urlParams: IUrlParams,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<FieldOfCategoryMaterialGetAllResponseDto>;
  getAllInCategoryMaterialEP: (
    urlParams: IUrlParams,
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<FieldOfCategoryMaterialGetAllResponseDto>;
  createEP: (
    dto: FieldOfCategoryMaterialCreateRequestDto,
    urlParams: IUrlParams,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    userInfoFromJWT: IJWTPayload,
  ) => Promise<FieldOfCategoryMaterialCreateResponseDto>;
  updateByIdEP: (
    fieldOfCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldOfCategoryMaterialUpdateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<FieldOfCategoryMaterialUpdateResponseDto>;
  deleteByIdEP: (
    fieldOfCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<FieldOfCategoryMaterialDeleteResponseDto>;
}
