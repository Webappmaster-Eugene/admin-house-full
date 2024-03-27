import { AuthSigninRequestDto, AuthSignupRequestDto } from './dto/auth.dto';
import { AuthEntity } from './entities/auth.entity';

export type AuthResponseWithToken = AuthEntity & { accessKey: string };

export interface AuthServiceInterface {
  signup: (body: AuthSignupRequestDto) => Promise<AuthEntity>;
  signin: (body: AuthSigninRequestDto) => Promise<AuthEntity>;
  generateJWT: (email: string, id: number) => Promise<string>;
  generateStrictAdminKey: (value: string, key: string) => Promise<string>;
}
