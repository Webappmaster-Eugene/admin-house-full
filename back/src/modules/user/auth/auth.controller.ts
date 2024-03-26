import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSigninRequestDto, AuthSignupRequestDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@ApiTags('Работа с аутентификацией пользователя')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/signup')
  async signupEP(@Body() body: AuthSignupRequestDto) {
    return this.authService.signup(body);
  }

  @Post('/signin')
  async signin(@Body() body: AuthSigninRequestDto) {
    return this.authService.signin(body);
  }

  @Post('/strict-admin-key-generate')
  async generateStrictAdminKeyEP(@Body() { key }: { key: string }) {
    return this.authService.generateStrictAdminKey(key);
  }
}
