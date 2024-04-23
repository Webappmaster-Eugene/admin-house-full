import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';
import {
  GlobalCategoryMaterialCreateRequestDto,
  GlobalCategoryMaterialCreateResponseDto,
} from '../dto/controller/create-global-category-material.dto';
import { GlobalCategoryMaterialGetResponseDto } from '../dto/controller/get-global-category-material.dto';
import { GlobalCategoryMaterialGetAllResponseDto } from '../dto/controller/get-all-global-category-materials.dto';
import { GlobalCategoryMaterialDeleteResponseDto } from '../dto/controller/delete-global-category-material.dto';
import {
  GlobalCategoryMaterialUpdateRequestDto,
  GlobalCategoryMaterialUpdateResponseDto,
} from '../dto/controller/update-global-category-material.dto';

export interface IGlobalCategoryMaterialController
  extends IControllerCommon<
    GlobalCategoryMaterialCreateRequestDto,
    GlobalCategoryMaterialUpdateRequestDto,
    GlobalCategoryMaterialGetResponseDto,
    GlobalCategoryMaterialGetAllResponseDto,
    GlobalCategoryMaterialCreateResponseDto,
    GlobalCategoryMaterialUpdateResponseDto,
    GlobalCategoryMaterialDeleteResponseDto
  > {
  getByIdEP: (
    globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<GlobalCategoryMaterialGetResponseDto>;
  getAllEP: (
    urlParams: IUrlParams,
  ) => Promise<GlobalCategoryMaterialGetAllResponseDto>;
  createEP: (
    dto: GlobalCategoryMaterialCreateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<GlobalCategoryMaterialCreateResponseDto>;
  updateByIdEP: (
    globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
    dto: GlobalCategoryMaterialUpdateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<GlobalCategoryMaterialUpdateResponseDto>;
  deleteByIdEP: (
    globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<GlobalCategoryMaterialDeleteResponseDto>;
}
