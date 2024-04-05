import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { RoleCreateRequestDto } from '../dto/create-role.dto';
import { RoleUpdateRequestDto } from '../dto/update-role.dto';
import { EUserTypeVariants, Prisma } from '@prisma/client';
import { UniversalServiceResponse } from '../../../common/types/responses/universal-service-response.interface';
import { USER_TYPE_VARIANTS } from '../../../common/consts/consts';
import { RoleEntity } from '../entities/role.entity';
import { EntityGetCommand } from '../../../../libs/contracts/commands/common/get-param.command';

export interface IRoleService
  extends IServiceCommon<
    RoleCreateRequestDto,
    RoleUpdateRequestDto,
    RoleEntity
  > {
  getByIdEP: (
    id: EntityGetCommand.RequestParam,
  ) => Promise<UniversalServiceResponse<RoleEntity | null>>;
  getByValue: (
    value: EUserTypeVariants,
  ) => Promise<UniversalServiceResponse<RoleEntity | null>>;
  getAllEP: () => Promise<UniversalServiceResponse<RoleEntity[] | null>>;
  createEP: (
    dto: RoleCreateRequestDto,
  ) => Promise<UniversalServiceResponse<RoleEntity>>;
  updateByIdEP: (
    id: EntityGetCommand.RequestParam,
    dto: RoleUpdateRequestDto,
  ) => Promise<UniversalServiceResponse<RoleEntity>>;
  deleteByIdsEP: (
    ids: EntityGetCommand.RequestParam[],
  ) => Promise<UniversalServiceResponse<Prisma.BatchPayload>>;
  checkIsAdminSecretKey: (key: string) => boolean;
}
