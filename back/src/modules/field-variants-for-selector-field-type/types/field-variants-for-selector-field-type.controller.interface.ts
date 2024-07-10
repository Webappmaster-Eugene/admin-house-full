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
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';
import { FieldVariantsForSelectorFieldTypeDeleteResponseDto } from '../dto/controller/delete-field-variants-for-selector-field-type.dto';
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
  getAllInHandbookEP: (
    urlParams: IUrlParams,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<FieldVariantsForSelectorFieldTypeGetAllResponseDto>;
  getAllInCategoryMaterialEP: (
    urlParams: IUrlParams,
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<FieldVariantsForSelectorFieldTypeGetAllResponseDto>;
  getAllInFieldOfCategoryMaterialEP: (
    urlParams: IUrlParams,
    fieldOfCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<FieldVariantsForSelectorFieldTypeGetAllResponseDto>;
  createEP: (
    dto: FieldVariantsForSelectorFieldTypeCreateRequestDto,
    urlParams: IUrlParams,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    fieldOfCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
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
