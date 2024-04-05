import { RoleCreateRequestDto } from '../dto/create-role.dto';
import { RoleUpdateRequestDto } from '../dto/update-role.dto';
import { EUserTypeVariants, Prisma } from '@prisma/client';
import { RoleDbEntity } from '../entities/role.db.entity';
import { IRepositoryDbCommon } from '../../../common/types/main/slices/repositorydb.interface';
import { EntityGetCommand } from '../../../../libs/contracts/commands/common/get-param.command';
import { USER_TYPE_VARIANTS } from '../../../common/consts/consts';
import { CountData } from '../../../common/types/main/count.data';

export interface IRoleRepository
  extends IRepositoryDbCommon<
    RoleCreateRequestDto,
    RoleUpdateRequestDto,
    RoleDbEntity
  > {
  getById: (id: EntityGetCommand.RequestParam) => Promise<RoleDbEntity>;
  getByValue: (value: EUserTypeVariants) => Promise<RoleDbEntity>;
  getAllCount: () => Promise<CountData>;
  getAll: () => Promise<RoleDbEntity[]>;
  create: (dto: RoleCreateRequestDto) => Promise<RoleDbEntity>;
  updateById: (
    id: EntityGetCommand.RequestParam,
    dto: RoleUpdateRequestDto,
  ) => Promise<RoleDbEntity>;
  deleteByIds: (
    ids: EntityGetCommand.RequestParam[],
  ) => Promise<Prisma.BatchPayload>;
}
