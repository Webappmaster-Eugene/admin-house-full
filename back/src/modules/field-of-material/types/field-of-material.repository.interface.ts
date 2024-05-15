import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { FieldOfMaterialCreateRequestDto } from '../dto/controller/create-field-of-material.dto';
import { FieldOfMaterialUpdateRequestDto } from '../dto/controller/update-field-of-material.dto';
import { FieldOfMaterialEntity } from '../entities/field-of-material.entity';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';

export interface IFieldOfMaterialRepository
  extends IRepositoryCommon<FieldOfMaterialCreateRequestDto, FieldOfMaterialUpdateRequestDto, FieldOfMaterialEntity> {
  getById: (fieldOfMaterialId: EntityUrlParamCommand.RequestUuidParam) => Promise<FieldOfMaterialEntity>;
  getAll: (skip?: number, take?: number) => Promise<FieldOfMaterialEntity[]>;
  create: (
    dto: FieldOfMaterialCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<FieldOfMaterialEntity>;
  updateById: (
    fieldOfMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldOfMaterialUpdateRequestDto,
  ) => Promise<FieldOfMaterialEntity>;
  deleteById: (fieldOfMaterialId: EntityUrlParamCommand.RequestUuidParam) => Promise<FieldOfMaterialEntity>;
}
