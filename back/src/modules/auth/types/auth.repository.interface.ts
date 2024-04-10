import { AuthRegisterRequestDto } from '../dto/controller/auth.register.dto';
import { AuthRegisterWithRoleRequestDto } from '../dto/controller/auth.register-with-role.dto';
import { AuthGenerateKeyRequestDto } from '../dto/controller/auth.generate-key.dto';
import { AuthEntity } from '../entities/auth.entity';

export interface IAuthRepository {
  // register: (dto: AuthRegisterRequestDto) => Promise<AuthEntity>;
  // registerWithRole: (
  //   dto: AuthRegisterWithRoleRequestDto,
  // ) => Promise<AuthEntity>;
  generateStrictAdminKey: (key: string) => Promise<{ key: string }>;
  getStrictAdminKey: () => Promise<{ key: string }>;
}
