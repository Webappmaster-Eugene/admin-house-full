import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { AuthSigninRequestDto, AuthSignupRequestDto } from './dto/auth.dto';
import {
  AuthResponseWithToken,
  AuthServiceInterface,
} from './auth.repository.interface';
import { UserService } from '../user.service';
import { RolesService } from '../../roles/roles.service';
import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly rolesService: RolesService,
  ) {}

  async signup({
    email,
    password,
    firstName,
    secondName,
    phone,
    secretKeyForChooseRole,
    roleId,
  }: AuthSignupRequestDto): Promise<AuthResponseWithToken> {
    if (this.rolesService.checkIsAdminSecretKey(secretKeyForChooseRole)) {
      if (!roleId) {
        throw new UnauthorizedException(
          'Не предоставлена роль для регистрации пользователя',
        );
      }
    } else {
      roleId = 1;
    }

    try {
      const user = await this.userService.createUser({
        email,
        password,
        firstName,
        secondName,
        phone,
        roleId,
      });
      const accessToken = await this.generateJWT(user.email, user.id);
      const authResponse = new AuthEntity({
        id: user.id,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        secondName: user.secondName,
        roleId: user.roleId,
        memberOfWorkspaceId: user.memberOfWorkspaceId,
        creatorOfWorkspaceId: user.creatorOfWorkspaceId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
      return {
        ...authResponse,
        accessKey: accessToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async signin({
    email,
    password,
  }: AuthSigninRequestDto): Promise<AuthResponseWithToken> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new HttpException('Invalid credentials', 400);
    }

    const hashedPassword = user.password;
    const isValidPassword = await bcrypt.compare(password, hashedPassword);
    if (!isValidPassword) {
      throw new HttpException('Invalid credentials', 400);
    }

    const accessToken = await this.generateJWT(user.email, user.id);
    const authResponse = new AuthEntity({
      id: user.id,
      email: user.email,
      phone: user.phone,
      firstName: user.firstName,
      secondName: user.secondName,
      roleId: user.roleId,
      memberOfWorkspaceId: user.memberOfWorkspaceId,
      creatorOfWorkspaceId: user.creatorOfWorkspaceId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

    return {
      ...authResponse,
      accessKey: accessToken,
    };
  }

  async generateJWT(email: string, id: number): Promise<string> {
    const token = jwt.sign(
      {
        email,
        id,
      },
      this.configService.get('JWT_KEY'),
      {
        expiresIn: 86400,
      },
    );
    return token;
  }

  async generateStrictAdminKey(key: string): Promise<string> {
    if (key === this.configService.get('KEY_SECRET_FOR_STRICT_ADMIN_KEY')) {
      const str = `adminHouse-${key}-strict-admin-key-for-role-creating`;
      return bcrypt.hash(str, 10);
    } else {
      throw new UnauthorizedException(
        'У вас нет прав доступа для создания ключа',
      );
    }
  }
}
