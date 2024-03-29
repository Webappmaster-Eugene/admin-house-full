import { LoginRequestDto, LoginResponseDto } from '../dto/login.dto';
import { RegisterRequestDto, RegisterResponseDto } from '../dto/register.dto';

export interface IAuthController {
  registerEP: (dto: RegisterRequestDto) => Promise<RegisterResponseDto>;
  loginEP: (dto: LoginRequestDto) => Promise<LoginResponseDto>;
  generateStrictAdminKeyEP: ({ key }: { key: string }) => Promise<string>;
}
