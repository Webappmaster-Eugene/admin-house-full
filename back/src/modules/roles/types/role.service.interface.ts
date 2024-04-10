import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { RoleCreateRequestDto } from '../dto/controller/create-role.dto';
import { RoleUpdateRequestDto } from '../dto/controller/update-role.dto';
import { EUserTypeVariants } from '@prisma/client';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { RoleEntity } from '../entities/role.entity';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';

export interface IRoleService
  extends IServiceCommon<
    RoleCreateRequestDto,
    RoleUpdateRequestDto,
    RoleEntity,
    void,
    void,
    EntityUrlParamCommand.RequestUuidParam,
    EntityUrlParamCommand.RequestNumberParam
  > {
  getById: (
    id: EntityUrlParamCommand.RequestNumberParam,
  ) => Promise<UniversalInternalResponse<RoleEntity | null>>;
  getByValue: (
    value: EUserTypeVariants,
  ) => Promise<UniversalInternalResponse<RoleEntity | null>>;
  getAll: () => Promise<UniversalInternalResponse<RoleEntity[] | null>>;
  create: (
    dto: RoleCreateRequestDto,
  ) => Promise<UniversalInternalResponse<RoleEntity>>;
  updateById: (
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: RoleUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<RoleEntity>>;
  deleteById: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<RoleEntity>>;
  checkIsAdminSecretKey: (key: string) => boolean;
}
