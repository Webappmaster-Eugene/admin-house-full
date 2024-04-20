import { RoleCreateRequestDto } from '../dto/controller/create-role.dto';
import { RoleUpdateRequestDto } from '../dto/controller/update-role.dto';
import { EUserTypeVariants } from '@prisma/client';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../../common/types/main/count.data';
import { RoleEntity } from '../entities/role.entity';

export interface IRoleRepository
  extends IRepositoryCommon<
    RoleCreateRequestDto,
    RoleUpdateRequestDto,
    RoleEntity
  > {
  getById: (
    roleId: EntityUrlParamCommand.RequestNumberParam,
  ) => Promise<RoleEntity>;
  getByUuid: (
    roleUuid: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<RoleEntity>;
  getByValue: (roleName: EUserTypeVariants) => Promise<RoleEntity>;
  getAll: () => Promise<RoleEntity[]>;
  getAllCount: () => Promise<CountData>;
  create: (dto: RoleCreateRequestDto) => Promise<RoleEntity>;
  updateById: (
    roleUuid: EntityUrlParamCommand.RequestUuidParam,
    dto: RoleUpdateRequestDto,
  ) => Promise<RoleEntity>;
  deleteById: (
    roleUuid: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<RoleEntity>;
}
