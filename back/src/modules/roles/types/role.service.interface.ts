import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { RoleCreateRequestDto } from '../dto/controller/create-role.dto';
import { RoleUpdateRequestDto } from '../dto/controller/update-role.dto';
import { EUserTypeVariants } from '.prisma/client';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { RoleEntity } from '../entities/role.entity';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export interface IRoleService extends IServiceCommon<RoleCreateRequestDto, RoleUpdateRequestDto, RoleEntity> {
  getById: (roleId: EntityUrlParamCommand.RequestNumberParam) => Promise<UniversalInternalResponse<RoleEntity>>;
  getByUuid: (roleUuid: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<RoleEntity>>;
  getByValue: (roleName: EUserTypeVariants) => Promise<UniversalInternalResponse<RoleEntity>>;
  getAll: (queryParams?: IQueryParams) => Promise<UniversalInternalResponse<RoleEntity[]>>;
  create: (dto: RoleCreateRequestDto) => Promise<UniversalInternalResponse<RoleEntity>>;
  updateById: (
    roleUuid: EntityUrlParamCommand.RequestUuidParam,
    dto: RoleUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<RoleEntity>>;
  deleteById: (roleUuid: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<RoleEntity>>;
  checkIsAdminSecretKey: (key: string) => boolean;
}
