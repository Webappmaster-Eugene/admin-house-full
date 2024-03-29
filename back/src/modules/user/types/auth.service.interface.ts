import { RegisterRequestDto, RegisterResponseDto } from '../dto/register.dto';
import { LoginRequestDto, LoginResponseDto } from '../dto/login.dto';

export interface AuthServiceInterface {
  register: (dto: RegisterRequestDto) => Promise<UserEntity>;
  login: (dto: LoginRequestDto) => Promise<UserEntity>;
  generateJWT: (email: string, id: number) => Promise<string>;
  generateStrictAdminKey: (key: string) => Promise<string>;
}
