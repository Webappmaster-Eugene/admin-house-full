import { MaterialCreateRequestDto } from '../dto/controller/create-material.dto';
import { MaterialUpdateRequestDto } from '../dto/controller/update-material.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from 'libs/contracts';
import { MaterialEntity } from '../entities/material.entity';
import { MaterialUpdateNameRequestDto } from '../../../modules/material/dto/controller/update-name-material.dto';
import { MaterialUpdateCategoryRequestDto } from '../../../modules/material/dto/controller/update-category-material.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';

export interface IMaterialRepository extends IRepositoryCommon<MaterialCreateRequestDto, MaterialUpdateRequestDto, MaterialEntity> {
  getById: (materialId: EntityUrlParamCommand.RequestUuidParam) => Promise<MaterialEntity>;
  getAll: (skip?: number, take?: number) => Promise<MaterialEntity[]>;
  getAllInHandbook: (handbookId: EntityUrlParamCommand.RequestUuidParam, skip?: number, take?: number) => Promise<MaterialEntity[]>;
  getAllInCategoryMaterial: (
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    skip?: number,
    take?: number,
  ) => Promise<MaterialEntity[]>;
  create: (
    dto: MaterialCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<MaterialEntity>;
  updateById: (materialId: EntityUrlParamCommand.RequestUuidParam, dto: MaterialUpdateRequestDto) => Promise<MaterialEntity>;
  rebuildNameForMaterialById: (material: MaterialEntity, newName?: string) => Promise<MaterialEntity>;
  updateNameForMaterialById: (
    materialId: EntityUrlParamCommand.RequestUuidParam,
    dto: MaterialUpdateNameRequestDto,
  ) => Promise<MaterialEntity>;
  changeCategoryMaterialById: (
    materialId: EntityUrlParamCommand.RequestUuidParam,
    dto: MaterialUpdateCategoryRequestDto,
  ) => Promise<MaterialEntity>;
  deleteById: (materialId: EntityUrlParamCommand.RequestUuidParam) => Promise<MaterialEntity>;
}
