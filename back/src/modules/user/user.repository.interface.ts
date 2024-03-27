import { UserRequestDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

export interface UserServiceInterface {
  createUser: (data: UserRequestDto) => Promise<UserEntity>;
  getAllUsers: () => Promise<UserEntity[]>;
  getUserById: (id: number) => Promise<UserEntity>;
  getUserByEmail: (email: string) => Promise<UserEntity>;
  updateUserById: (data: UserRequestDto, id: number) => Promise<UserEntity>;
  deleteUserById: (id: number) => Promise<UserEntity>;
  addUserToManagerWorkspace: (
    userId: number,
    managerId: number,
  ) => Promise<UserEntity>;
  addExistedWorkspaceToManager: (
    workspaceCreatorId: number,
    workspaceId: number,
  ) => Promise<UserEntity>;
}
