import { UserCreateRequestDto } from '../dto/controller/create-user.dto';
import { UserUpdateRequestDto } from '../dto/controller/update-user.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../../common/types/main/count.data';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository
  extends IRepositoryCommon<
    UserCreateRequestDto,
    UserUpdateRequestDto,
    UserEntity,
    void,
    EntityUrlParamCommand.RequestParam
  > {
  getById: (id: EntityUrlParamCommand.RequestParam) => Promise<UserEntity>;
  getAllCount: () => Promise<CountData>;
  getAll: () => Promise<UserEntity[]>;
  create: (dto: UserCreateRequestDto) => Promise<UserEntity>;
  updateById: (
    id: EntityUrlParamCommand.RequestParam,
    dto: UserUpdateRequestDto,
  ) => Promise<UserEntity>;
  deleteById: (id: EntityUrlParamCommand.RequestParam) => Promise<UserEntity>;
}
