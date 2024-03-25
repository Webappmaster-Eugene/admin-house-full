import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  UserRequestDto,
  UserResponseDto,
  UserUpdateRequestDto,
} from './dto/user.dto';
import { User, UserInfoAccessToken } from '../decorators/user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { RolesSetting } from '../decorators/roles.decorator';

@ApiTags('Работа с пользователями')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [UserResponseDto] })
  @Get()
  getAllUsersEP() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Получение текущего пользователя' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  @RolesSetting('MANAGER', 'ADMIN')
  @UseGuards(AuthGuard)
  @Get('/me')
  getCurrentUserEP(@User() userInfo: UserInfoAccessToken) {
    console.log(userInfo);
    return { id: userInfo.id, email: userInfo.email };
  }

  @ApiOperation({ summary: 'Получение пользователя по id' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  // @SerializeOptions({
  //   exposeDefaultValues: true,
  //   excludePrefixes: ['_'],
  // })
  @Get('/:id')
  getUserByIdEP(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  // @ApiOperation({ summary: 'Создание пользователя' })
  // @ApiResponse({ status: 201, type: UserResponseDto })
  // @Post()
  // async createUserEP(@Body() body: UserRequestDto) {
  //   return this.userService.createUser(body);
  // }

  @ApiOperation({ summary: 'Изменение пользователя по его id' })
  @ApiResponse({ status: 200, type: UserResponseDto })
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
  @ApiResponse({ status: 200, type: UserResponseDto })
  @RolesSetting('MANAGER')
  @UseGuards(AuthGuard)
  @Put('/addToManagerWorkspace/:userId')
  async addUserToManagerWorkspaceEP(
    @Param('userId', ParseIntPipe) userId: number,
    @User() user: UserInfoAccessToken,
  ) {
    return [];
    console.log(user);
    // return this.userService.addUserToWorkspace(id);
  }

  @ApiOperation({ summary: 'Удаление пользователя по его id' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  @Delete('/:id')
  async deleteUserByIdEP(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUserById(id);
  }
}
