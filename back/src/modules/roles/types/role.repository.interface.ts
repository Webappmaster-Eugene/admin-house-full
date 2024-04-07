import { RoleCreateRequestDto } from '../dto/controller/create-project.dto';
import { RoleUpdateRequestDto } from '../dto/controller/update-project.dto';
import { EUserTypeVariants } from '@prisma/client';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../../common/types/main/count.data';
import { RoleEntity } from '../entities/project.entity';

export interface IRoleRepository
  extends IRepositoryCommon<
    RoleCreateRequestDto,
    RoleUpdateRequestDto,
    RoleEntity,
    void,
    EntityUrlParamCommand.RequestParam,
    EntityUrlParamCommand.RequestParamNumber
  > {
  getById: (
    id: EntityUrlParamCommand.RequestParamNumber,
  ) => Promise<RoleEntity>;
  getByValue: (value: EUserTypeVariants) => Promise<RoleEntity>;
  getAllCount: () => Promise<CountData>;
  getAll: () => Promise<RoleEntity[]>;
  create: (dto: RoleCreateRequestDto) => Promise<RoleEntity>;
  updateById: (
    id: EntityUrlParamCommand.RequestParam,
    dto: RoleUpdateRequestDto,
  ) => Promise<RoleEntity>;
  deleteById: (id: EntityUrlParamCommand.RequestParam) => Promise<RoleEntity>;
}
