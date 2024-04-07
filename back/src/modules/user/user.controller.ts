import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRequestDto, UserUpdateRequestDto } from './dto/user.dto';
import { User } from '../../lib/decorators/auth.decorator';
import { AuthGuard } from '../../lib/guards/auth.guard';
import { UsersSetting } from '../../lib/decorators/users.decorator';
import { JWTPayload } from '../../lib/types/jwt.payload.interface';
import { UserEntity } from './entities/user.entity';
import { WorkspaceManagerGuard } from '../../lib/guards/workspace.guard';
import { zodToOpenAPI } from 'nestjs-zod';

@ApiTags('Работа с пользователями')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({
    schema: zodToOpenAPI(CreateUserSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(UserSchema),
  })
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [UserEntity] })
  @UsersSetting('ADMIN')
  @UseGuards(AuthGuard)
  @Get()
  getAllUsersEP() {
    // return this.userService.getAllUsers();
    const users = this.userService.getAllUsers();
    return users;
  }

  @ApiOperation({ summary: 'Получение текущего пользователя (id, email)' })
  @ApiResponse({ status: 200, type: UserEntity })
  @UseGuards(AuthGuard)
  @Get('/me')
  getCurrentUserEP(@User() userInfo: JWTPayload) {
    console.log(userInfo);
    return { id: userInfo.id, email: userInfo.email };
  }

  @ApiOperation({ summary: 'Получение пользователя по id' })
  @ApiResponse({ status: 200, type: UserEntity })
  // @SerializeOptions({
  //   exposeDefaultValues: true,
  //   excludePrefixes: ['_'],
  // })
  @UseGuards(AuthGuard)
  @Get('/:id')
  getUserByIdEP(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @ApiBody({
    schema: zodToOpenAPI(UserRequestDto),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(UserRequestDto),
  })
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, type: UserEntity })
  @Post()
  async createUserEP(@Body() body: UserRequestDto): UserResponseDto {
    return this.userService.createUser(body);
  }

  @ApiOperation({ summary: 'Изменение пользователя по его id' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Put('/:id')
  async updateUserByIdEP(
    @Body() body: UserUpdateRequestDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updateUserById(body, id);
  }

  @ApiOperation({
    summary:
      'Добавление рядового пользователя в Workspace менеджера по id пользователя',
  })
  @ApiResponse({ status: 200, type: UserEntity })
  @UsersSetting('MANAGER')
  @UseGuards(AuthGuard, WorkspaceManagerGuard)
  @Put('/addToManagerWorkspace/:userId')
  async addUserToManagerWorkspaceEP(
    @Param('userId', ParseIntPipe) userId: number,
    @User() user: JWTPayload,
  ) {
    return this.userService.addUserToManagerWorkspace(userId, user.id);
  }

  @ApiOperation({ summary: 'Удаление пользователя по его id' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Delete('/:id')
  async deleteUserByIdEP(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUserById(id);
  }
}
