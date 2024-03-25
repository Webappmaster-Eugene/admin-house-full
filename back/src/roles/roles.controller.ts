import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolesRequestDto, RolesResponseDto } from './dto/role.dto';
import { EUserTypeVariants } from '@prisma/client';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Создать новую роль для пользователя' })
  @ApiResponse({ status: 201, type: RolesResponseDto })
  @HttpCode(201)
  @Post()
  createRoleEP(@Body() body: RolesRequestDto) {
    return this.rolesService.createRole(body);
  }

  @ApiOperation({ summary: 'Получение всех ролей пользователей' })
  @ApiResponse({ status: 200, type: [RolesResponseDto] })
  @Get()
  getAllRolesEP() {
    return this.rolesService.getAllRoles();
  }

  @ApiOperation({ summary: 'Получить информацию о роли по ее наименованию' })
  @ApiResponse({ status: 200, type: RolesResponseDto })
  @Get('/:value')
  getRoleByValueEP(@Param('value') value: EUserTypeVariants) {
    return this.rolesService.getRoleByValue(value);
  }
}
