import {
  AuthResponseDto,
  AuthSigninRequestDto,
  AuthSignupRequestDto,
} from './dto/auth.dto';

export type AuthResponseWithToken = AuthResponseDto & { accessKey: string };

export interface AuthServiceInterface {
  signup: (body: AuthSignupRequestDto) => Promise<AuthResponseWithToken>;
  signin: (body: AuthSigninRequestDto) => Promise<AuthResponseWithToken>;
  generateJWT: (email: string, id: number) => Promise<string>;
  generateStrictAdminKey: (value: string, key: string) => Promise<string>;
}
