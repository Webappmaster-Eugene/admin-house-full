import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { UserCreateRequestDto } from '../dto/controller/create-user.dto';
import { UserUpdateRequestDto } from '../dto/controller/update-user.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { UserEntity } from '../entities/user.entity';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { UniversalExternalResponse } from '../../../common/types/responses/universal-external-response.interface';
import { UserGetResponseDto } from '../dto/controller/get-user.dto';

export interface IUserService
  extends IServiceCommon<
    UserCreateRequestDto,
    UserUpdateRequestDto,
    UserEntity
  > {
  getById: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<UserEntity | null>>;
  getByEmail: (
    id: EntityUrlParamCommand.RequestEmailParam,
  ) => Promise<UniversalInternalResponse<UserEntity | null>>;
  getAll: () => Promise<UniversalInternalResponse<UserEntity[] | null>>;
  create: (
    dto: UserCreateRequestDto,
    roleId?: EntityUrlParamCommand.RequestNumberParam,
  ) => Promise<UniversalInternalResponse<UserEntity>>;
  updateById: (
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: UserUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<UserEntity>>;
  deleteById: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<UserEntity>>;
}
