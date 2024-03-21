import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user.dto';
import { User, UserInfoToken } from '../decorators/user.decorator';

@ApiTags('Работа с пользователями')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [UserResponseDto] })
  @Get()
  getAllUsers() {
    return this.userService.getUsers();
  }

  @Get('/me')
  getCurrentUser(@User() user: UserInfoToken) {
    return { id: user.id, name: user.name };
  }
}
