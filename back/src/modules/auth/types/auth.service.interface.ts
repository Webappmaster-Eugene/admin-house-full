import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { AuthCreateRequestDto } from '../dto/controller/auth.register.dto';
import { AuthUpdateRequestDto } from '../dto/controller/update-role.dto';
import { EUserTypeVariants } from '@prisma/client';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { AuthEntity } from '../entities/auth.entity';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';

export interface IAuthService
  extends IServiceCommon<
    AuthCreateRequestDto,
    AuthUpdateRequestDto,
    AuthEntity,
    void,
    EntityUrlParamCommand.RequestParam,
    EntityUrlParamCommand.RequestParamNumber
  > {
  getById: (
    id: EntityUrlParamCommand.RequestParamNumber,
  ) => Promise<UniversalInternalResponse<AuthEntity | null>>;
  getByValue: (
    value: EUserTypeVariants,
  ) => Promise<UniversalInternalResponse<AuthEntity | null>>;
  getAll: () => Promise<UniversalInternalResponse<AuthEntity[] | null>>;
  create: (
    dto: AuthCreateRequestDto,
  ) => Promise<UniversalInternalResponse<AuthEntity>>;
  updateById: (
    id: EntityUrlParamCommand.RequestParam,
    dto: AuthUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<AuthEntity>>;
  deleteById: (
    id: EntityUrlParamCommand.RequestParam,
  ) => Promise<UniversalInternalResponse<AuthEntity>>;
  checkIsAdminSecretKey: (key: string) => boolean;
}
