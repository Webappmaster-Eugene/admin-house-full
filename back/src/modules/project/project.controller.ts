import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { WorkspaceManagerGuard } from '../../common/guards/workspace.guard';
import { User } from '../../common/decorators/user.decorator';
import { ProjectEntity } from './entities/project.entity';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { IProjectService } from './types/project.service.interface';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { zodToOpenAPI } from 'nestjs-zod';
import { OrganizationDeleteResponseDto } from '../organization/dto/controller/delete-organization.dto';
import {
  ExternalResponse,
  UniversalExternalResponse,
} from '../../common/types/responses/universal-external-response.interface';
import { toResponseClientArray } from '../../common/utils/mappers';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { ProjectGetAllResponseDto } from './dto/controller/get-all-projects.dto';
import { ProjectGetResponseDto } from './dto/controller/get-project.dto';
import {
  ProjectCreateRequestDto,
  ProjectCreateResponseDto,
} from './dto/controller/create-project.dto';
import {
  ProjectUpdateRequestDto,
  ProjectUpdateResponseDto,
} from './dto/controller/update-project.dto';
import { ProjectDeleteCommand } from '../../../libs/contracts';
import { ProjectDeleteResponseDto } from './dto/controller/delete-project.dto';

@ApiTags('Работа с Projects')
@Controller('projects')
export class ProjectController {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PROJECT_SERVICE)
    private readonly projectService: IProjectService,
  ) {}

  @ApiOperation({ summary: 'Получение Project по id' })
  @ApiResponse({ status: 200, type: ProjectEntity })
  @Get('/:id')
  async getByIdEP(@Param('id') id: EntityUrlParamCommand.RequestUuidParam) {
    const responseData = await this.projectService.getById(id);
    if (responseData.ok) {
      return new ExternalResponse<ProjectGetResponseDto>(
        new ProjectGetResponseDto(responseData.data),
      );
    } else {
      const response = new ExternalResponse(
        null,
        responseData.error.httpCode,
        'Internal error',
        [responseData.error],
      );
      throw new HttpException(response, responseData.error.httpCode);
    }
  }

  @ApiOperation({ summary: 'Получить все Projects' })
  @ApiResponse({ status: 200, type: [ProjectEntity] })
  @RolesSetting('MANAGER', 'ADMIN')
  @UseGuards(AuthGuard)
  @Get()
  async getAllEP() {
    const responseData = await this.projectService.getAll();
    if (responseData.ok) {
      return new ExternalResponse<ProjectGetAllResponseDto[]>(
        toResponseClientArray(responseData.data, ProjectGetAllResponseDto),
      );
    } else {
      const response = new ExternalResponse(
        null,
        responseData.error.httpCode,
        'Internal error',
        [responseData.error],
      );
      throw new HttpException(response, responseData.error.httpCode);
    }
  }

  @ApiOperation({ summary: 'Создание Project' })
  @ApiResponse({ status: 201, type: ProjectEntity })
  @RolesSetting('MANAGER')
  @UseGuards(AuthGuard, WorkspaceManagerGuard)
  @Post('/:organizationId')
  async create(
    @Body() dto: ProjectCreateRequestDto,
    @User() userInfo: IJWTPayload,
    @Param('organizationId')
    organizationId: EntityUrlParamCommand.RequestUuidParam,
  ) {
    const responseData = await this.projectService.create(
      dto,
      userInfo,
      organizationId,
    );
    if (responseData.ok) {
      return new ExternalResponse<ProjectCreateResponseDto>(
        new ProjectCreateResponseDto(responseData.data),
      );
    } else {
      const response = new ExternalResponse(
        null,
        responseData.error.httpCode,
        'Internal error',
        [responseData.error],
      );
      throw new HttpException(response, responseData.error.httpCode);
    }
  }

  @ApiOperation({ summary: 'Изменение Project по id Project' })
  @ApiResponse({ status: 200, type: ProjectEntity })
  @Put('/:id')
  async updateIdEP(
    @Body() dto: ProjectUpdateRequestDto,
    @Param('id', ParseUUIDPipe) id: EntityUrlParamCommand.RequestUuidParam,
  ) {
    const responseData = await this.projectService.updateById(id, dto);
    if (responseData.ok) {
      return new ExternalResponse<ProjectUpdateResponseDto>(
        new ProjectUpdateResponseDto(responseData.data),
      );
    } else {
      const response = new ExternalResponse(
        null,
        responseData.error.httpCode,
        'Internal error',
        [responseData.error],
      );
      throw new HttpException(response, responseData.error.httpCode);
    }
  }

  @ApiOkResponse({
    schema: zodToOpenAPI(ProjectDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Удаление Project по id Project',
  })
  @ApiResponse({ status: 200, type: ProjectDeleteResponseDto })
  @Delete('/:id')
  async deleteByIdEP(
    @Param('id', ParseUUIDPipe) id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalExternalResponse<OrganizationDeleteResponseDto>> {
    const responseData = await this.projectService.deleteById(id);
    if (responseData.ok) {
      return new ExternalResponse<ProjectDeleteResponseDto>(
        new ProjectDeleteResponseDto(responseData.data),
      );
    } else {
      const response = new ExternalResponse(
        null,
        responseData.error.httpCode,
        'Internal error',
        [responseData.error],
      );
      throw new HttpException(response, responseData.error.httpCode);
    }
  }
}
