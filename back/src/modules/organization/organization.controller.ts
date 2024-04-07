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
import { OrganizationRequestDto } from './dto/organization.dto';
import { OrganizationService } from './organization.service';
import { OrganizationsSetting } from '../../lib/decorators/organizations.decorator';
import { AuthGuard } from '../../lib/guards/auth.guard';
import { WorkspaceManagerGuard } from '../../lib/guards/workspace.guard';
import { User } from '../../lib/decorators/auth.decorator';
import { JWTPayload } from '../../lib/types/jwt.payload.interface';
import { OrganizationEntity } from './entities/organization.entity';

@ApiTags('Работа с Organization пользователей')
@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @ApiOperation({ summary: 'Получить все Organizations пользователей' })
  @ApiResponse({ status: 200, type: [OrganizationEntity] })
  @OrganizationsSetting('MANAGER', 'ADMIN')
  @UseGuards(AuthGuard)
  @Get()
  getAllOrganizationsEP() {
    return this.organizationService.getAllOrganizations();
  }

  @ApiOperation({ summary: 'Получение Organization по id' })
  @ApiResponse({ status: 200, type: OrganizationEntity })
  @Get('/:id')
  getOrganizationByIdEP(@Param('id') id: number) {
    return this.organizationService.getOrganizationById(id);
  }

  @ApiOperation({ summary: 'Создание Organization' })
  @ApiResponse({ status: 201, type: OrganizationEntity })
  @OrganizationsSetting('MANAGER')
  @UseGuards(AuthGuard, WorkspaceManagerGuard)
  @Post()
  async createOrganizationByWorkspaceIdEP(
    @Body() body: OrganizationRequestDto,
    @User() user: JWTPayload,
  ) {
    return this.organizationService.createOrganizationByWorkspaceId(body, user);
  }

  @ApiOperation({ summary: 'Изменение Organization по id Organization' })
  @ApiResponse({ status: 200, type: OrganizationEntity })
  @Put('/:id')
  async updateOrganizationsByIdEP(
    @Body() body: OrganizationRequestDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.organizationService.updateOrganizationById(body, id);
  }
}
