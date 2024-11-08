import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import { CategoryMaterialCreateRequestDto, CategoryMaterialCreateResponseDto } from '../dto/controller/create-category-material.dto';
import { CategoryMaterialUpdateRequestDto, CategoryMaterialUpdateResponseDto } from '../dto/controller/update-category-material.dto';
import { CategoryMaterialGetResponseDto } from '../dto/controller/get-category-material.dto';
import { CategoryMaterialGetAllResponseDto } from '../dto/controller/get-all-category-materials.dto';
import { CategoryMaterialDeleteResponseDto } from '../dto/controller/delete-category-material.dto';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';
import { EntityUrlParamCommand } from 'libs/contracts';
import {
  CategoryMaterialDeleteManyRequestDto,
  CategoryMaterialDeleteManyResponseDto,
} from 'src/modules/category-material/dto/controller/delete-many-category-material.dto';

export interface ICategoryMaterialController
  extends IControllerCommon<
    CategoryMaterialCreateRequestDto,
    CategoryMaterialUpdateRequestDto,
    CategoryMaterialGetResponseDto,
    CategoryMaterialGetAllResponseDto,
    CategoryMaterialCreateResponseDto,
    CategoryMaterialUpdateResponseDto,
    CategoryMaterialDeleteResponseDto
  > {
  getByIdEP: (categoryMaterialId: EntityUrlParamCommand.RequestUuidParam, urlParams: IUrlParams) => Promise<CategoryMaterialGetResponseDto>;
  getAllEP: (urlParams: IUrlParams, queryParams?: IQueryParams) => Promise<CategoryMaterialGetAllResponseDto>;
  getAllInHandbookEP: (
    urlParams: IUrlParams,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<CategoryMaterialGetAllResponseDto>;
  createEP: (
    dto: CategoryMaterialCreateRequestDto,
    urlParams: IUrlParams,
    userInfoFromJWT: IJWTPayload,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<CategoryMaterialCreateResponseDto>;
  updateByIdEP: (
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: CategoryMaterialUpdateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<CategoryMaterialUpdateResponseDto>;
  deleteByIdEP: (
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<CategoryMaterialDeleteResponseDto>;
  deleteManyByIdsEP: (
    dto: CategoryMaterialDeleteManyRequestDto,
    urlParams: IUrlParams,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<CategoryMaterialDeleteManyResponseDto>;
}
