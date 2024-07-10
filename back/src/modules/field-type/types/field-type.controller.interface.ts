import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';
import { FieldTypeCreateRequestDto, FieldTypeCreateResponseDto } from '../dto/controller/create-field-type.dto';
import { FieldTypeUpdateRequestDto, FieldTypeUpdateResponseDto } from '../dto/controller/update-field-type.dto';
import { FieldTypeDeleteResponseDto } from '../dto/controller/delete-field-type.dto';
import { FieldTypeGetAllResponseDto } from '../dto/controller/get-all-field-types.dto';
import { FieldTypeGetResponseDto } from '../dto/controller/get-field-type.dto';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface IFieldTypeController
  extends IControllerCommon<
    FieldTypeCreateRequestDto,
    FieldTypeUpdateRequestDto,
    FieldTypeGetResponseDto,
    FieldTypeGetAllResponseDto,
    FieldTypeCreateResponseDto,
    FieldTypeUpdateResponseDto,
    FieldTypeDeleteResponseDto
  > {
  getByIdEP: (fieldTypeId: EntityUrlParamCommand.RequestUuidParam, urlParams: IUrlParams) => Promise<FieldTypeGetResponseDto>;
  getAllEP: (urlParams: IUrlParams, queryParams?: IQueryParams) => Promise<FieldTypeGetAllResponseDto>;
  createEP: (dto: FieldTypeCreateRequestDto, urlParams: IUrlParams, userInfoFromJWT: IJWTPayload) => Promise<FieldTypeCreateResponseDto>;
  updateByIdEP: (
    fieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldTypeUpdateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<FieldTypeUpdateResponseDto>;
  deleteByIdEP: (fieldTypeId: EntityUrlParamCommand.RequestUuidParam, urlParams: IUrlParams) => Promise<FieldTypeDeleteResponseDto>;
}
