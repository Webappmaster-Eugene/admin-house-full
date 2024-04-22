import { TypeFieldCreateRequestDto } from '../dto/controller/create-type-field.dto';
import { TypeFieldUpdateRequestDto } from '../dto/controller/update-type-field.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../../common/types/main/count.data';
import { TypeFieldEntity } from '../entities/type-field.entity';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';

export interface ITypeFieldRepository
  extends IRepositoryCommon<
    TypeFieldCreateRequestDto,
    TypeFieldUpdateRequestDto,
    TypeFieldEntity
  > {
  getById: (
    typeFieldId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<TypeFieldEntity>;
  getAll: () => Promise<TypeFieldEntity[]>;
  create: (
    dto: TypeFieldCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<TypeFieldEntity>;
  updateById: (
    typeFieldId: EntityUrlParamCommand.RequestUuidParam,
    dto: TypeFieldUpdateRequestDto,
  ) => Promise<TypeFieldEntity>;
  deleteById: (
    typeFieldId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<TypeFieldEntity>;
}
