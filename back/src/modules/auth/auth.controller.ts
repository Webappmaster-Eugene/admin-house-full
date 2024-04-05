import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthSigninRequestDto,
  AuthSignupRequestDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from './dto/register.dto';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { UserLoginResponse } from '../../../libs/contracts/commands/auth';
import { ConfigServiceInterface } from '../../common/types/main/config.service.interface';
import { AuthServiceInterface } from './types/auth.service.interface';
import { IAuthController } from './types/auth.controller.interface';

@ApiTags('Работа с аутентификацией пользователя')
@Controller('auth')
export class AuthController implements IAuthController {
  constructor(
    private readonly authService: AuthServiceInterface,
    private readonly configService: ConfigServiceInterface,
  ) {}

  @Post('/signup')
  async registerEP(
    @Body() dto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return this.authService.register(dto);
  }

  @Post('/signin')
  async loginEP(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(dto);
  }

  @Post('/strict-admin-key-generate')
  async generateStrictAdminKeyEP(@Body() { key }: { key: string }) {
    return this.authService.generateStrictAdminKey(key);
  }
}
