import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import {
  GlobalCategoryCreateRequestDto,
  GlobalCategoryCreateResponseDto,
} from '../dto/controller/create-global-category.dto';
import {
  GlobalCategoryUpdateRequestDto,
  GlobalCategoryUpdateResponseDto,
} from '../dto/controller/update-global-category.dto';
import { GlobalCategoryGetResponseDto } from '../dto/controller/get-global-category.dto';
import { GlobalCategoryGetAllResponseDto } from '../dto/controller/get-all-global-categorys.dto';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { GlobalCategoryDeleteResponseDto } from '../dto/controller/delete-global-category.dto';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';

export interface IGlobalCategoryController
  extends IControllerCommon<
    GlobalCategoryCreateRequestDto,
    GlobalCategoryUpdateRequestDto,
    GlobalCategoryGetResponseDto,
    GlobalCategoryGetAllResponseDto,
    GlobalCategoryCreateResponseDto,
    GlobalCategoryUpdateResponseDto,
    GlobalCategoryDeleteResponseDto
  > {
  getByIdEP: (
    globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<GlobalCategoryGetResponseDto>;
  getAllEP: (urlParams: IUrlParams) => Promise<GlobalCategoryGetAllResponseDto>;
  createEP: (
    dto: GlobalCategoryCreateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<GlobalCategoryCreateResponseDto>;
  updateByIdEP: (
    globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
    dto: GlobalCategoryUpdateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<GlobalCategoryUpdateResponseDto>;
  deleteByIdEP: (
    globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<GlobalCategoryDeleteResponseDto>;
}
