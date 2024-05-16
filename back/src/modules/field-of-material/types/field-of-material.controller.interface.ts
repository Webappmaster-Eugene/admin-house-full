import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';
import { FieldOfMaterialCreateRequestDto, FieldOfMaterialCreateResponseDto } from '../dto/controller/create-field-of-material.dto';
import { FieldOfMaterialUpdateRequestDto, FieldOfMaterialUpdateResponseDto } from '../dto/controller/update-field-of-material.dto';
import { FieldOfMaterialDeleteResponseDto } from '../dto/controller/delete-field-of-material.dto';
import { FieldOfMaterialGetAllResponseDto } from '../dto/controller/get-all-field-of-materials.dto';
import { FieldOfMaterialGetResponseDto } from '../dto/controller/get-field-of-material.dto';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface IFieldOfMaterialController
  extends IControllerCommon<
    FieldOfMaterialCreateRequestDto,
    FieldOfMaterialUpdateRequestDto,
    FieldOfMaterialGetResponseDto,
    FieldOfMaterialGetAllResponseDto,
    FieldOfMaterialCreateResponseDto,
    FieldOfMaterialUpdateResponseDto,
    FieldOfMaterialDeleteResponseDto
  > {
  getByIdEP: (fieldOfMaterialId: EntityUrlParamCommand.RequestUuidParam, urlParams: IUrlParams) => Promise<FieldOfMaterialGetResponseDto>;
  getAllEP: (urlParams: IUrlParams, queryParams?: IQueryParams) => Promise<FieldOfMaterialGetAllResponseDto>;
  createEP: (
    dto: FieldOfMaterialCreateRequestDto,
    urlParams: IUrlParams,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    userInfoFromJWT: IJWTPayload,
  ) => Promise<FieldOfMaterialCreateResponseDto>;
  updateByIdEP: (
    fieldOfMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldOfMaterialUpdateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<FieldOfMaterialUpdateResponseDto>;
  deleteByIdEP: (
    fieldOfMaterialId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<FieldOfMaterialDeleteResponseDto>;
}
