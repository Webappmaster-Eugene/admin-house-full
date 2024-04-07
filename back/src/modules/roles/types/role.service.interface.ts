import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { RoleCreateRequestDto } from '../dto/controller/create-project.dto';
import { RoleUpdateRequestDto } from '../dto/controller/update-project.dto';
import { EUserTypeVariants } from '@prisma/client';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { RoleEntity } from '../entities/project.entity';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';

export interface IRoleService
  extends IServiceCommon<
    RoleCreateRequestDto,
    RoleUpdateRequestDto,
    RoleEntity,
    void,
    EntityUrlParamCommand.RequestParam,
    EntityUrlParamCommand.RequestParamNumber
  > {
  getById: (
    id: EntityUrlParamCommand.RequestParamNumber,
  ) => Promise<UniversalInternalResponse<RoleEntity | null>>;
  getByValue: (
    value: EUserTypeVariants,
  ) => Promise<UniversalInternalResponse<RoleEntity | null>>;
  getAll: () => Promise<UniversalInternalResponse<RoleEntity[] | null>>;
  create: (
    dto: RoleCreateRequestDto,
  ) => Promise<UniversalInternalResponse<RoleEntity>>;
  updateById: (
    id: EntityUrlParamCommand.RequestParam,
    dto: RoleUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<RoleEntity>>;
  deleteById: (
    id: EntityUrlParamCommand.RequestParam,
  ) => Promise<UniversalInternalResponse<RoleEntity>>;
  checkIsAdminSecretKey: (key: string) => boolean;
}
