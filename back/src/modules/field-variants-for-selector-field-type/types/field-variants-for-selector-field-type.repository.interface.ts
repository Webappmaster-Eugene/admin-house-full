import { FieldVariantsForSelectorFieldTypeCreateRequestDto } from '../dto/controller/create-field-variants-for-selector-field-type.dto';
import { FieldVariantsForSelectorFieldTypeUpdateRequestDto } from '../dto/controller/update-field-variants-for-selector-field-type.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { FieldVariantsForSelectorFieldTypeEntity } from '../entities/field-variants-for-selector-field-type.entity';

export interface IFieldVariantsForSelectorFieldTypeRepository
  extends IRepositoryCommon<
    FieldVariantsForSelectorFieldTypeCreateRequestDto,
    FieldVariantsForSelectorFieldTypeUpdateRequestDto,
    FieldVariantsForSelectorFieldTypeEntity
  > {
  getById: (
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<FieldVariantsForSelectorFieldTypeEntity>;
  getAll: () => Promise<FieldVariantsForSelectorFieldTypeEntity[]>;
  create: (
    dto: FieldVariantsForSelectorFieldTypeCreateRequestDto,
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<FieldVariantsForSelectorFieldTypeEntity>;
  updateById: (
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldVariantsForSelectorFieldTypeUpdateRequestDto,
  ) => Promise<FieldVariantsForSelectorFieldTypeEntity>;
  deleteById: (
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<FieldVariantsForSelectorFieldTypeEntity>;
}
