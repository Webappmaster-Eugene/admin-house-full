import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { UserCreateRequestDto } from '../dto/controller/create-user.dto';
import { UserUpdateRequestDto } from '../dto/controller/update-user.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { UserEntity } from '../entities/user.entity';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';

export interface IUserService
  extends IServiceCommon<
    UserCreateRequestDto,
    UserUpdateRequestDto,
    UserEntity,
    void,
    EntityUrlParamCommand.RequestParam
  > {
  getById: (
    id: EntityUrlParamCommand.RequestParam,
  ) => Promise<UniversalInternalResponse<UserEntity | null>>;
  getAll: () => Promise<UniversalInternalResponse<UserEntity[] | null>>;
  create: (
    dto: UserCreateRequestDto,
  ) => Promise<UniversalInternalResponse<UserEntity>>;
  updateById: (
    id: EntityUrlParamCommand.RequestParam,
    dto: UserUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<UserEntity>>;
  deleteById: (
    id: EntityUrlParamCommand.RequestParam,
  ) => Promise<UniversalInternalResponse<UserEntity>>;
}
