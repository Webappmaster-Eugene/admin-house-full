import { EntityUrlParamCommand } from 'libs/contracts';
import { FieldOfCategoryMaterialCreateRequestDto } from '../dto/controller/create-field-of-category-material.dto';
import { FieldOfCategoryMaterialUpdateRequestDto } from '../dto/controller/update-field-of-category-material.dto';
import { FieldOfCategoryMaterialEntity } from '../entities/field-of-category-material.entity';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';

export interface IFieldOfCategoryMaterialRepository
  extends IRepositoryCommon<
    FieldOfCategoryMaterialCreateRequestDto,
    FieldOfCategoryMaterialUpdateRequestDto,
    FieldOfCategoryMaterialEntity
  > {
  getById: (fieldOfCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam) => Promise<FieldOfCategoryMaterialEntity>;
  getAllInHandbook: (
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    skip?: number,
    take?: number,
  ) => Promise<FieldOfCategoryMaterialEntity[]>;
  getAllInCategoryMaterial: (
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    skip?: number,
    take?: number,
  ) => Promise<FieldOfCategoryMaterialEntity[]>;
  create: (
    dto: FieldOfCategoryMaterialCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<FieldOfCategoryMaterialEntity>;
  updateById: (
    fieldOfCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldOfCategoryMaterialUpdateRequestDto,
  ) => Promise<FieldOfCategoryMaterialEntity>;
  deleteById: (fieldOfCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam) => Promise<FieldOfCategoryMaterialEntity>;
}
