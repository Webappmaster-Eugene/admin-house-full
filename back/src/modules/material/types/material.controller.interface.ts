import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import { MaterialCreateRequestDto, MaterialCreateResponseDto } from '../dto/controller/create-material.dto';
import { MaterialUpdateRequestDto, MaterialUpdateResponseDto } from '../dto/controller/update-material.dto';
import { MaterialGetResponseDto } from '../dto/controller/get-material.dto';
import { MaterialGetAllResponseDto } from '../dto/controller/get-all-materials.dto';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { MaterialDeleteResponseDto } from '../dto/controller/delete-material.dto';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

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
  ) => Promise<MaterialUpdateResponseDto>;
  deleteByIdEP: (materialId: EntityUrlParamCommand.RequestUuidParam, urlParams: IUrlParams) => Promise<MaterialDeleteResponseDto>;
}
