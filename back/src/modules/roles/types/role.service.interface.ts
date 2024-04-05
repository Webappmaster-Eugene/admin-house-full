import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { RoleCreateRequestDto } from '../dto/controller/create-role.dto';
import { RoleUpdateRequestDto } from '../dto/controller/update-role.dto';
import { EUserTypeVariants, Prisma } from '@prisma/client';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { RoleEntity } from '../entities/role.entity';
import { EntityGetCommand } from '../../../../libs/contracts/commands/common/get-param.command';

export interface IRoleService
  extends IServiceCommon<
    RoleCreateRequestDto,
    RoleUpdateRequestDto,
    RoleEntity
  > {
  getById: (
    id: EntityGetCommand.RequestParam,
  ) => Promise<UniversalInternalResponse<RoleEntity | null>>;
  getByValue: (
    value: EUserTypeVariants,
  ) => Promise<UniversalInternalResponse<RoleEntity | null>>;
  getAll: () => Promise<UniversalInternalResponse<RoleEntity[] | null>>;
  create: (
    dto: RoleCreateRequestDto,
  ) => Promise<UniversalInternalResponse<RoleEntity>>;
  updateById: (
    id: EntityGetCommand.RequestParam,
    dto: RoleUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<RoleEntity>>;
  deleteByIds: (
    ids: EntityGetCommand.RequestParam[],
  ) => Promise<UniversalInternalResponse<Prisma.BatchPayload>>;
  checkIsAdminSecretKey: (key: string) => boolean;
}
