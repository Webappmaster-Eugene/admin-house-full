import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { FieldOfMaterialCreateRequestDto } from '../dto/controller/create-field-of-material.dto';
import { FieldOfMaterialUpdateRequestDto } from '../dto/controller/update-field-of-material.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { FieldOfMaterialEntity } from '../entities/field-of-material.entity';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface IFieldOfMaterialService
  extends IServiceCommon<FieldOfMaterialCreateRequestDto, FieldOfMaterialUpdateRequestDto, FieldOfMaterialEntity> {
  getById: (fieldOfMaterialId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<FieldOfMaterialEntity>>;
  getAll: (queryParams?: IQueryParams) => Promise<UniversalInternalResponse<FieldOfMaterialEntity[]>>;
  create: (
    dto: FieldOfMaterialCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<FieldOfMaterialEntity>>;
  updateById: (
    fieldOfMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldOfMaterialUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<FieldOfMaterialEntity>>;
  deleteById: (fieldOfMaterialId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<FieldOfMaterialEntity>>;
}
