import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolesRequestDto } from './dto/role.dto';
import { EUserTypeVariants } from '@prisma/client';
import { RolesSetting } from '../../lib/decorators/roles.decorator';
import { AuthGuard } from '../../lib/guards/auth.guard';
import { RoleEntity } from './entities/role.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Создать новую роль для пользователя' })
  @ApiResponse({ status: 201, type: RoleEntity })
  @HttpCode(201)
  @Post()
  createRoleEP(@Body() body: RolesRequestDto) {
    return this.rolesService.createRole(body);
  }

  @ApiOperation({ summary: 'Получение всех ролей пользователей' })
  @ApiResponse({ status: 200, type: [RoleEntity] })
  @RolesSetting('ADMIN')
  @UseGuards(AuthGuard)
  @Get()
  getAllRolesEP() {
    return this.rolesService.getAllRoles();
  }

  @ApiOperation({ summary: 'Получить информацию о роли по ее наименованию' })
  @ApiResponse({ status: 200, type: RoleEntity })
  @RolesSetting('ADMIN')
  @UseGuards(AuthGuard)
  @Get('/:value')
  getRoleByValueEP(@Param('value') value: EUserTypeVariants) {
    return this.rolesService.getRoleByValue(value);
  }
}
