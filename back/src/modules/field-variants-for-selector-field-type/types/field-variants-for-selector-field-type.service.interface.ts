import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { FieldVariantsForSelectorFieldTypeCreateRequestDto } from '../dto/controller/create-field-variants-for-selector-field-type.dto';
import { FieldVariantsForSelectorFieldTypeUpdateRequestDto } from '../dto/controller/update-field-variants-for-selector-field-type.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { FieldVariantsForSelectorFieldTypeEntity } from '../entities/field-variants-for-selector-field-type.entity';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface IFieldVariantsForSelectorFieldTypeService
  extends IServiceCommon<
    FieldVariantsForSelectorFieldTypeCreateRequestDto,
    FieldVariantsForSelectorFieldTypeUpdateRequestDto,
    FieldVariantsForSelectorFieldTypeEntity
  > {
  getById: (
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<FieldVariantsForSelectorFieldTypeEntity>>;
  getAll: (queryParams?: IQueryParams) => Promise<UniversalInternalResponse<FieldVariantsForSelectorFieldTypeEntity[]>>;
  create: (
    dto: FieldVariantsForSelectorFieldTypeCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<FieldVariantsForSelectorFieldTypeEntity>>;
  updateById: (
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldVariantsForSelectorFieldTypeUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<FieldVariantsForSelectorFieldTypeEntity>>;
  deleteById: (
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<FieldVariantsForSelectorFieldTypeEntity>>;
}