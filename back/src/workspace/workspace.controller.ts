import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  WorkspaceRequestDto,
  WorkspaceResponseDto,
  WorkspaceToUpdateRequestDto,
} from './dto/workspace.dto';
import { WorkspaceService } from './workspace.service';

@ApiTags('Работа с Workspace пользователей')
@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @ApiOperation({ summary: 'Получить все Workspace пользователей' })
  @ApiResponse({ status: 200, type: [WorkspaceResponseDto] })
  @Get()
  getAllWorkspacesEP() {
    return this.workspaceService.getAllWorkspaces();
  }

  @ApiOperation({ summary: 'Получение Workspace по id' })
  @ApiResponse({ status: 200, type: WorkspaceResponseDto })
  @Get('/:id')
  getWorkspaceByIdEP(@Param('id') id: number) {
    return this.workspaceService.getWorkspaceById(id);
  }

  @ApiOperation({ summary: 'Создание Workspace' })
  @ApiResponse({ status: 201, type: WorkspaceResponseDto })
  @Post()
  async createWorkspaceByUserIdEP(@Body() body: WorkspaceRequestDto) {
    return this.workspaceService.createWorkspaceByUserId(body);
  }

  @ApiOperation({ summary: 'Изменение Workspace пользователя по id Workspace' })
  @ApiResponse({ status: 200, type: WorkspaceResponseDto })
  @Put('/:id')
  async updateWorkspaceByIdEP(
    @Body() body: WorkspaceToUpdateRequestDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.workspaceService.updateWorkspaceById(body, id);
  }

  @ApiOperation({ summary: 'Удаление Workspace пользователя по id Workspace' })
  @ApiResponse({ status: 200, type: WorkspaceResponseDto })
  @Delete('/:id')
  async deleteWorkspaceByIdEP(@Param('id', ParseIntPipe) id: number) {
    return this.workspaceService.deleteWorkspaceById(id);
  }

  @ApiOperation({
    summary: 'Изменение владельца Workspace по id Workspace и id пользователя',
  })
  @ApiResponse({ status: 200, type: WorkspaceResponseDto })
  @Put('/:id')
  async changeWorkspaceOwnerEP(
    @Param('id', ParseIntPipe) id: number,
    @Body() { newOwnerId }: { newOwnerId: number },
  ) {
    return this.workspaceService.changeWorkspaceOwner(newOwnerId, id);
  }
}
