import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { CharacteristicsMaterialCreateRequestDto } from '../dto/controller/create-characteristics-material.dto';
import { CharacteristicsMaterialUpdateRequestDto } from '../dto/controller/update-characteristics-material.dto';
import { CharacteristicsMaterialEntity } from '../entities/characteristics-material.entity';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';

export interface ICharacteristicsMaterialRepository
  extends IRepositoryCommon<
    CharacteristicsMaterialCreateRequestDto,
    CharacteristicsMaterialUpdateRequestDto,
    CharacteristicsMaterialEntity
  > {
  getById: (characteristicsMaterialId: EntityUrlParamCommand.RequestUuidParam) => Promise<CharacteristicsMaterialEntity>;
  getAll: (skip?: number, take?: number) => Promise<CharacteristicsMaterialEntity[]>;
  getAllInHandbook: (
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    skip?: number,
    take?: number,
  ) => Promise<CharacteristicsMaterialEntity[]>;
  getAllInCategoryMaterial: (
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    skip?: number,
    take?: number,
  ) => Promise<CharacteristicsMaterialEntity[]>;
  getAllInMaterial: (
    materialId: EntityUrlParamCommand.RequestUuidParam,
    skip?: number,
    take?: number,
  ) => Promise<CharacteristicsMaterialEntity[]>;
  create: (
    dto: CharacteristicsMaterialCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    materialId: EntityUrlParamCommand.RequestUuidParam,
    fieldCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    fieldTypeUuid: EntityUrlParamCommand.RequestUuidParam,
    unitOfMeasurementUuid: EntityUrlParamCommand.RequestUuidParam,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<CharacteristicsMaterialEntity>;
  updateById: (
    characteristicsMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: CharacteristicsMaterialUpdateRequestDto,
  ) => Promise<CharacteristicsMaterialEntity>;
  deleteById: (characteristicsMaterialId: EntityUrlParamCommand.RequestUuidParam) => Promise<CharacteristicsMaterialEntity>;
}
