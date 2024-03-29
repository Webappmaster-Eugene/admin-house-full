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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  WorkspaceRequestDto,
  WorkspaceToUpdateRequestDto,
} from './dto/workspace.dto';
import { WorkspaceService } from './workspace.service';
import { WorkspaceEntity } from './entities/workspace.entity';
import { RolesSetting } from '../../lib/decorators/roles.decorator';
import { AuthGuard } from '../../lib/guards/auth.guard';
import { WorkspaceManagerGuard } from '../../lib/guards/workspace.guard';
import { User } from '../../lib/decorators/auth.decorator';
import { JWTPayload } from '../../lib/types/jwt.payload.interface';

@ApiTags('Работа с Workspace пользователей')
@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @ApiOperation({ summary: 'Получить все Workspace пользователей' })
  @ApiResponse({ status: 200, type: [WorkspaceEntity] })
  @RolesSetting('MANAGER', 'ADMIN')
  @UseGuards(AuthGuard)
  @Get()
  getAllWorkspacesEP() {
    return this.workspaceService.getAllWorkspaces();
  }

  @ApiOperation({ summary: 'Получение Workspace по id' })
  @ApiResponse({ status: 200, type: WorkspaceEntity })
  @UseGuards(AuthGuard)
  @Get('/:id')
  getWorkspaceByIdEP(@Param('id') id: number) {
    return this.workspaceService.getWorkspaceById(id);
  }

  @ApiOperation({ summary: 'Создание Workspace' })
  @ApiResponse({ status: 201, type: WorkspaceEntity })
  @RolesSetting('MANAGER')
  @UseGuards(AuthGuard)
  @Post()
  async createWorkspaceByUserIdEP(
    @Body() body: WorkspaceRequestDto,
    @User() user: JWTPayload,
  ) {
    return this.workspaceService.createWorkspaceByUserId(body, user.id);
  }

  @ApiOperation({ summary: 'Изменение Workspace пользователя по id Workspace' })
  @ApiResponse({ status: 200, type: WorkspaceEntity })
  @RolesSetting('MANAGER')
  @UseGuards(AuthGuard, WorkspaceManagerGuard)
  @Put('/:id')
  async updateWorkspaceByIdEP(
    @Body() body: WorkspaceToUpdateRequestDto,
    @Param('id', ParseIntPipe) id: number,
    @User() user: JWTPayload,
  ) {
    return this.workspaceService.updateWorkspaceById(body, id);
  }

  @ApiOperation({ summary: 'Удаление Workspace пользователя по id Workspace' })
  @ApiResponse({ status: 200, type: WorkspaceEntity })
  @Delete('/:id')
  async deleteWorkspaceByIdEP(@Param('id', ParseIntPipe) id: number) {
    return this.workspaceService.deleteWorkspaceById(id);
  }

  @ApiOperation({
    summary: 'Изменение владельца Workspace по id Workspace и id пользователя',
  })
  @ApiResponse({ status: 200, type: WorkspaceEntity })
  @Put('/:id')
  async changeWorkspaceOwnerEP(
    @Param('id', ParseIntPipe) id: number,
    @Body() { newOwnerId }: { newOwnerId: number },
  ) {
    return this.workspaceService.changeWorkspaceOwner(newOwnerId, id);
  }
}
