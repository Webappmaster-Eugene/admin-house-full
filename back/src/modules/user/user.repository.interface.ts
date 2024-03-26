import { UserRequestDto, UserResponseDto } from './dto/user.dto';

export interface UserServiceInterface {
  createUser: (data: UserRequestDto) => Promise<UserResponseDto>;
  getAllUsers: () => Promise<UserResponseDto[]>;
  getUserById: (id: number) => Promise<UserResponseDto>;
  getUserByEmail: (email: string) => Promise<UserResponseDto>;
  updateUserById: (
    data: UserRequestDto,
    id: number,
  ) => Promise<UserResponseDto>;
  deleteUserById: (id: number) => Promise<UserResponseDto>;
}
