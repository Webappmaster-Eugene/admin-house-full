import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { TypeFieldCreateRequestDto } from '../dto/controller/create-type-field.dto';
import { TypeFieldUpdateRequestDto } from '../dto/controller/update-type-field.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { TypeFieldEntity } from '../entities/type-field.entity';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';

export interface ITypeFieldService
  extends IServiceCommon<
    TypeFieldCreateRequestDto,
    TypeFieldUpdateRequestDto,
    TypeFieldEntity
  > {
  getById: (
    typeFieldId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<TypeFieldEntity>>;
  getAll: () => Promise<UniversalInternalResponse<TypeFieldEntity[]>>;
  create: (
    dto: TypeFieldCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<TypeFieldEntity>>;
  updateById: (
    typeFieldId: EntityUrlParamCommand.RequestUuidParam,
    dto: TypeFieldUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<TypeFieldEntity>>;
  deleteById: (
    typeFieldId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<TypeFieldEntity>>;
}
