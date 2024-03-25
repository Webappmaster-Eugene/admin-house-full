import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  OrganizationRequestDto,
  OrganizationResponseDto,
} from './dto/organization.dto';
import { OrganizationService } from './organization.service';
import { RolesSetting } from '../decorators/roles.decorator';
import { AuthGuard } from '../guards/auth.guard';

@ApiTags('Работа с Organization пользователей')
@Controller('organizations')
export class OrganizationController {
  constructor(private readonly workspaceService: OrganizationService) {}

  @ApiOperation({ summary: 'Получить всех Organizations пользователей' })
  @ApiResponse({ status: 200, type: [OrganizationResponseDto] })
  @RolesSetting('MANAGER', 'ADMIN')
  @UseGuards(AuthGuard)
  @Get()
  getAllOrganizationsEP() {
    return this.workspaceService.getAllOrganizations();
  }

  @ApiOperation({ summary: 'Получение Organization по id' })
  @ApiResponse({ status: 200, type: OrganizationResponseDto })
  @Get('/:id')
  getOrganizationByIdEP(@Param('id') id: number) {
    return this.workspaceService.getOrganizationById(id);
  }

  @ApiOperation({ summary: 'Создание Organization' })
  @ApiResponse({ status: 201, type: OrganizationResponseDto })
  @RolesSetting('MANAGER')
  @UseGuards(AuthGuard)
  @Post()
  async createOrganizationByWorkspaceIdEP(
    @Body() body: OrganizationRequestDto,
  ) {
    return this.workspaceService.createOrganizationByWorkspaceId(body);
  }

  @ApiOperation({ summary: 'Изменение Organization по id Organization' })
  @ApiResponse({ status: 200, type: OrganizationResponseDto })
  @Put('/:id')
  async updateOrganizationsByIdEP(
    @Body() body: OrganizationRequestDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.workspaceService.updateOrganizationById(body, id);
  }
}
