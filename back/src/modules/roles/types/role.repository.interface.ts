import { RoleCreateRequestDto } from '../dto/controller/create-role.dto';
import { RoleUpdateRequestDto } from '../dto/controller/update-role.dto';
import { EUserTypeVariants, Prisma } from '@prisma/client';
import { IRepositoryDbCommon } from '../../../common/types/main/slices/repositorydb.interface';
import { EntityGetCommand } from '../../../../libs/contracts/commands/common/get-param.command';
import { CountData } from '../../../common/types/main/count.data';
import { RoleEntity } from '../entities/role.entity';

export interface IRoleRepository
  extends IRepositoryDbCommon<
    RoleCreateRequestDto,
    RoleUpdateRequestDto,
    RoleEntity
  > {
  getById: (id: EntityGetCommand.RequestParam) => Promise<RoleEntity>;
  getByValue: (value: EUserTypeVariants) => Promise<RoleEntity>;
  getAllCount: () => Promise<CountData>;
  getAll: () => Promise<RoleEntity[]>;
  create: (dto: RoleCreateRequestDto) => Promise<RoleEntity>;
  updateById: (
    id: EntityGetCommand.RequestParam,
    dto: RoleUpdateRequestDto,
  ) => Promise<RoleEntity>;
  deleteByIds: (
    ids: EntityGetCommand.RequestParam[],
  ) => Promise<Prisma.BatchPayload>;
}
