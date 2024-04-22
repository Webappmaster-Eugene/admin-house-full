import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import {
  CategoryMaterialCreateRequestDto,
  CategoryMaterialCreateResponseDto,
} from '../dto/controller/create-category-material.dto';
import {
  CategoryMaterialUpdateRequestDto,
  CategoryMaterialUpdateResponseDto,
} from '../dto/controller/update-category-material.dto';
import { CategoryMaterialGetResponseDto } from '../dto/controller/get-category-material.dto';
import { CategoryMaterialGetAllResponseDto } from '../dto/controller/get-all-category-materials.dto';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { CategoryMaterialDeleteResponseDto } from '../dto/controller/delete-category-material.dto';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';

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
  getByIdEP: (
    category-materialId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<CategoryMaterialGetResponseDto>;
  getAllEP: (urlParams: IUrlParams) => Promise<CategoryMaterialGetAllResponseDto>;
  createEP: (
    dto: CategoryMaterialCreateRequestDto,
    urlParams: IUrlParams,
    userInfoFromJWT: IJWTPayload,
  ) => Promise<CategoryMaterialCreateResponseDto>;
  updateByIdEP: (
    category-materialId: EntityUrlParamCommand.RequestUuidParam,
    dto: CategoryMaterialUpdateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<CategoryMaterialUpdateResponseDto>;
  deleteByIdEP: (
    category-materialId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<CategoryMaterialDeleteResponseDto>;
}
