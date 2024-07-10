import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';
import { FieldTypeCreateRequestDto } from '../dto/controller/create-field-type.dto';
import { FieldTypeUpdateRequestDto } from '../dto/controller/update-field-type.dto';
import { FieldTypeEntity } from '../entities/field-type.entity';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';

export interface IFieldTypeRepository extends IRepositoryCommon<FieldTypeCreateRequestDto, FieldTypeUpdateRequestDto, FieldTypeEntity> {
  getById: (fieldTypeId: EntityUrlParamCommand.RequestUuidParam) => Promise<FieldTypeEntity>;
  getAll: (skip?: number, take?: number) => Promise<FieldTypeEntity[]>;
  create: (dto: FieldTypeCreateRequestDto, managerId: EntityUrlParamCommand.RequestUuidParam) => Promise<FieldTypeEntity>;
  updateById: (fieldTypeId: EntityUrlParamCommand.RequestUuidParam, dto: FieldTypeUpdateRequestDto) => Promise<FieldTypeEntity>;
  deleteById: (fieldTypeId: EntityUrlParamCommand.RequestUuidParam) => Promise<FieldTypeEntity>;
}
