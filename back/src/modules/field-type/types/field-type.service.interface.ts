import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { FieldTypeCreateRequestDto } from '../dto/controller/create-field-type.dto';
import { FieldTypeUpdateRequestDto } from '../dto/controller/update-field-type.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { FieldTypeEntity } from '../entities/field-type.entity';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface IFieldTypeService extends IServiceCommon<FieldTypeCreateRequestDto, FieldTypeUpdateRequestDto, FieldTypeEntity> {
  getById: (fieldTypeId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<FieldTypeEntity>>;
  getAll: (queryParams?: IQueryParams) => Promise<UniversalInternalResponse<FieldTypeEntity[]>>;
  create: (
    dto: FieldTypeCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<FieldTypeEntity>>;
  updateById: (
    fieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldTypeUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<FieldTypeEntity>>;
  deleteById: (fieldTypeId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<FieldTypeEntity>>;
}
