import { MaterialCreateRequestDto } from '../dto/controller/create-material.dto';
import { MaterialUpdateRequestDto } from '../dto/controller/update-material.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../../common/types/main/count.data';
import { MaterialEntity } from '../entities/material.entity';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';

export interface IMaterialRepository
  extends IRepositoryCommon<
    MaterialCreateRequestDto,
    MaterialUpdateRequestDto,
    MaterialEntity
  > {
  getById: (
    materialId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<MaterialEntity>;
  getByManagerId: (
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<MaterialEntity>;
  getAllCount: () => Promise<CountData>;
  getAll: () => Promise<MaterialEntity[]>;
  create: (
    dto: MaterialCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<MaterialEntity>;
  updateById: (
    materialId: EntityUrlParamCommand.RequestUuidParam,
    dto: MaterialUpdateRequestDto,
  ) => Promise<MaterialEntity>;
  deleteById: (
    materialId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<MaterialEntity>;
}
