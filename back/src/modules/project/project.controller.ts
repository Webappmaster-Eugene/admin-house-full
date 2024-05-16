import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { ProjectEntity } from './entities/project.entity';
import { KFI } from '../../common/utils/di';
import { IProjectService } from './types/project.service.interface';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { ProjectGetAllResponseDto } from './dto/controller/get-all-projects.dto';
import { ProjectGetResponseDto } from './dto/controller/get-project.dto';
import { ProjectCreateRequestDto, ProjectCreateResponseDto } from './dto/controller/create-project.dto';
import { ProjectUpdateRequestDto, ProjectUpdateResponseDto } from './dto/controller/update-project.dto';
import {
  ProjectCreateCommand,
  ProjectDeleteCommand,
  ProjectGetAllCommand,
  ProjectGetCommand,
  ProjectUpdateCommand,
} from '@numart/house-admin-contracts';
import { ProjectDeleteResponseDto } from './dto/controller/delete-project.dto';
import { EntityName } from '../../common/types/entity.enum';
import { ILogger } from '../../common/types/main/logger.interface';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { WorkspaceMembersGuard } from '../../common/guards/workspace-members.guard';
import { EUserTypeVariants } from '@prisma/client';
import { WorkspaceCreatorGuard } from '../../common/guards/workspace-creator.guard';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { okResponseHandler } from '../../common/helpers/handlers/ok-response.handler';
import { errorResponseHandler } from '../../common/helpers/handlers/error-response.handler';
import { IQueryParams, QueryParams } from '../../common/decorators/query-params.decorator';

@ApiTags('Работа с Projects')
@Controller('workspace/:workspaceId/organization/:organizationId/project')
export class ProjectController {
  constructor(
    @Inject(KFI.PROJECT_SERVICE)
    private readonly projectService: IProjectService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(ProjectGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение Project по id' })
  @ApiResponse({ status: 200, type: ProjectEntity })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(ProjectGetResponseDto)
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @Get('/:projectId')
  async getByIdEP(
    @Param('projectId') projectId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<ProjectGetResponseDto> {
    try {
      const { ok, data } = await this.projectService.getById(projectId);
      return okResponseHandler(ok, data, ProjectEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.PROJECT, urlParams);
    }
  }

  //region SWAGGER
  @ApiQuery({
    schema: zodToOpenAPI(ProjectGetAllCommand.RequestQuerySchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ProjectGetAllCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получить все Projects' })
  @ApiResponse({ status: 200, type: [ProjectEntity] })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(ProjectGetAllResponseDto)
  @Get()
  async getAllEP(@UrlParams() urlParams: IUrlParams, @QueryParams() queryParams?: IQueryParams): Promise<ProjectGetAllResponseDto> {
    try {
      const { ok, data } = await this.projectService.getAll(queryParams);
      return okResponseHandler(ok, data, ProjectEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.PROJECT, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(ProjectCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ProjectCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание Project' })
  @ApiResponse({ status: 201, type: ProjectEntity })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(ProjectCreateResponseDto)
  @Post()
  async create(
    @Body() dto: ProjectCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @User() userInfoFromJWT: IJWTPayload,
    @Param('organizationId')
    organizationId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<ProjectCreateResponseDto> {
    try {
      const { ok, data } = await this.projectService.create(dto, userInfoFromJWT, organizationId);
      return okResponseHandler(ok, data, ProjectEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.PROJECT, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(ProjectUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ProjectUpdateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменение Project по id Project' })
  @ApiResponse({ status: 200, type: ProjectEntity })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(ProjectUpdateResponseDto)
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @Put('/:projectId')
  async updateIdEP(
    @Body() dto: ProjectUpdateRequestDto,
    @Param('projectId', ParseUUIDPipe)
    projectId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<ProjectUpdateResponseDto> {
    try {
      const { ok, data } = await this.projectService.updateById(projectId, dto);
      return okResponseHandler(ok, data, ProjectEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.PROJECT, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(ProjectDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Удаление Project по id Project',
  })
  @ApiResponse({ status: 200, type: ProjectDeleteResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(ProjectDeleteResponseDto)
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @Delete('/:projectId')
  async deleteByIdEP(
    @Param('projectId', ParseUUIDPipe)
    projectId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<ProjectDeleteResponseDto> {
    try {
      const { ok, data } = await this.projectService.deleteById(projectId);
      return okResponseHandler(ok, data, ProjectEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.PROJECT, urlParams);
    }
  }
}
