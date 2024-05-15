import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import {
  FieldVariantsForSelectorFieldTypeCreateRequestDto,
  FieldVariantsForSelectorFieldTypeCreateResponseDto,
} from '../dto/controller/create-field-variants-for-selector-field-type.dto';
import {
  FieldVariantsForSelectorFieldTypeUpdateRequestDto,
  FieldVariantsForSelectorFieldTypeUpdateResponseDto,
} from '../dto/controller/update-field-variants-for-selector-field-type.dto';
import { FieldVariantsForSelectorFieldTypeGetResponseDto } from '../dto/controller/get-field-variants-for-selector-field-type.dto';
import { FieldVariantsForSelectorFieldTypeGetAllResponseDto } from '../dto/controller/get-all-field-variants-for-selector-field-type.dto';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { FieldVariantsForSelectorFieldTypeDeleteResponseDto } from '../dto/controller/delete-field-variants-for-selector-field-type.dto';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface IFieldVariantsForSelectorFieldTypeController
  extends IControllerCommon<
    FieldVariantsForSelectorFieldTypeCreateRequestDto,
    FieldVariantsForSelectorFieldTypeUpdateRequestDto,
    FieldVariantsForSelectorFieldTypeGetResponseDto,
    FieldVariantsForSelectorFieldTypeGetAllResponseDto,
    FieldVariantsForSelectorFieldTypeCreateResponseDto,
    FieldVariantsForSelectorFieldTypeUpdateResponseDto,
    FieldVariantsForSelectorFieldTypeDeleteResponseDto
  > {
  getByIdEP: (
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<FieldVariantsForSelectorFieldTypeGetResponseDto>;
  getAllEP: (urlParams: IUrlParams, queryParams?: IQueryParams) => Promise<FieldVariantsForSelectorFieldTypeGetAllResponseDto>;
  createEP: (
    dto: FieldVariantsForSelectorFieldTypeCreateRequestDto,
    urlParams: IUrlParams,
    userInfoFromJWT: IJWTPayload,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<FieldVariantsForSelectorFieldTypeCreateResponseDto>;
  updateByIdEP: (
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldVariantsForSelectorFieldTypeUpdateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<FieldVariantsForSelectorFieldTypeUpdateResponseDto>;
  deleteByIdEP: (
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<FieldVariantsForSelectorFieldTypeDeleteResponseDto>;
}
