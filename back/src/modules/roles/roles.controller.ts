import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EUserTypeVariants } from '@prisma/client';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RoleEntity } from './entities/role.entity';
import { RoleCreateRequestDto } from './dto/controller/create-role.dto';
import { IRoleController } from './types/role.controller.interface';
import { IRoleService } from './types/role.service.interface';
import { RoleUpdateRequestDto } from './dto/controller/update-role.dto';
import { USER_TYPE_VARIANTS } from '../../common/consts/consts';
import { EntityGetCommand } from '../../../libs/contracts/commands/common/get-param.command';

@Controller('roles')
export class RolesController implements IRoleController {
  constructor(
    @Inject('IRoleService') private readonly rolesService: IRoleService,
  ) {}

  @ApiOperation({ summary: 'Создать новую роль для пользователя' })
  @ApiResponse({ status: 201, type: RoleEntity })
  @Post()
  createEP(@Body() dto: RoleCreateRequestDto) {
    const responseData = this.rolesService.create(dto);
    return { data: responseData, error: null };
  }

  @ApiOperation({ summary: 'Получение всех ролей пользователей' })
  @ApiResponse({ status: 200, type: [RoleEntity] })
  @RolesSetting('ADMIN')
  @UseGuards(AuthGuard)
  @Get()
  getAllEP() {
    const responseData = this.rolesService.getAll();
    return { data: responseData, error: null };
  }

  @ApiOperation({ summary: 'Получить информацию о роли по ее id' })
  @ApiResponse({ status: 200, type: RoleEntity })
  @RolesSetting('ADMIN')
  @UseGuards(AuthGuard)
  @Get('/:id')
  getByIdEP(@Param('id', ParseUUIDPipe) id: EntityGetCommand.RequestParam) {
    const responseData = this.rolesService.getById(id);
    return { data: responseData, error: null };
  }

  @ApiOperation({ summary: 'Получить информацию о роли по ее наименованию' })
  @ApiResponse({ status: 200, type: RoleEntity })
  @RolesSetting('ADMIN')
  @UseGuards(AuthGuard)
  @Get('/:value')
  getByValueEP(
    @Param('value', ParseEnumPipe<USER_TYPE_VARIANTS>)
    value: USER_TYPE_VARIANTS,
  ) {
    const responseData = this.rolesService.getByValue(value);
    return { data: responseData, error: null };
  }

  @ApiOperation({ summary: 'Изменить роль по ее наименованию' })
  @ApiResponse({ status: 200, type: RoleEntity })
  @RolesSetting('ADMIN')
  @UseGuards(AuthGuard)
  @Put('/:id')
  updateByIdEP(
    @Param('id', ParseUUIDPipe) id: EntityGetCommand.RequestParam,
    @Body() dto: RoleUpdateRequestDto,
  ) {
    const responseData = this.rolesService.updateById(id, dto);
    return { data: responseData, error: null };
  }
}
