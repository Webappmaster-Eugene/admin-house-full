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
import { ProjectRequestDto } from './dto/project.request.dto';
import { ProjectService } from './project.service';
import { ProjectsSetting } from '../../lib/decorators/projects.decorator';
import { AuthGuard } from '../../lib/guards/auth.guard';
import { WorkspaceManagerGuard } from '../../lib/guards/workspace.guard';
import { User } from '../../lib/decorators/auth.decorator';
import { JWTPayload } from '../../lib/types/jwt.payload.interface';
import { ProjectEntity } from './entities/project.entity';

@ApiTags('Работа с Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: 'Получить все Projects' })
  @ApiResponse({ status: 200, type: [ProjectEntity] })
  @ProjectsSetting('MANAGER', 'ADMIN')
  @UseGuards(AuthGuard)
  @Get()
  getAllProjectsEP() {
    return this.projectService.getAllProjects();
  }

  @ApiOperation({ summary: 'Получение Project по id' })
  @ApiResponse({ status: 200, type: ProjectEntity })
  @Get('/:id')
  getProjectByIdEP(@Param('id') id: number) {
    return this.projectService.getProjectById(id);
  }

  @ApiOperation({ summary: 'Создание Project' })
  @ApiResponse({ status: 201, type: ProjectEntity })
  @ProjectsSetting('MANAGER')
  @UseGuards(AuthGuard, WorkspaceManagerGuard)
  @Post()
  async createProjectByOrganizationIdEP(
    @Body() body: ProjectRequestDto,
    @User() user: JWTPayload,
  ) {
    return this.projectService.createProjectByOrganizationId(body, user);
  }

  @ApiOperation({ summary: 'Изменение Project по id Project' })
  @ApiResponse({ status: 200, type: ProjectEntity })
  @Put('/:id')
  async updateProjectByIdEP(
    @Body() body: ProjectRequestDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.projectService.updateProjectById(body, id);
  }
}
