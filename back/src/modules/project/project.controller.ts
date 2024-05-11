import { Body, Controller, Delete, Get, HttpException, Inject, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { ProjectEntity } from './entities/project.entity';
import { KFI } from '../../common/utils/di';
import { IProjectService } from './types/project.service.interface';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { ExternalResponse } from '../../common/types/responses/universal-external-response.interface';
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
} from '../../../libs/contracts';
import { ProjectDeleteResponseDto } from './dto/controller/delete-project.dto';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { jsonStringify } from '../../common/helpers/stringify';
import { errorExtractor } from '../../common/helpers/inner-error.extractor';
import { EntityName } from '../../common/types/entity.enum';
import { BACKEND_ERRORS } from '../../common/errors/errors.backend';
import { ILogger } from '../../common/types/main/logger.interface';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { WorkspaceMembersGuard } from '../../common/guards/workspace-members.guard';
import { EUserTypeVariants } from '@prisma/client';
import { WorkspaceCreatorGuard } from '../../common/guards/workspace-creator.guard';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

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
      const responseData = await this.projectService.getById(projectId);
      if (responseData.ok) {
        return new ExternalResponse<ProjectEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(error, EntityName.PROJECT, urlParams);
        const response = new ExternalResponse(null, statusCode, message, [fullError]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(null, error.httpCode, BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description, [error]);
    }
  }

  //region SWAGGER
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
  async getAllEP(@UrlParams() urlParams: IUrlParams): Promise<ProjectGetAllResponseDto> {
    try {
      const responseData = await this.projectService.getAll();
      if (responseData.ok) {
        return new ExternalResponse<ProjectEntity[]>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(error, EntityName.PROJECT, urlParams);
        const response = new ExternalResponse(null, statusCode, message, [fullError]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(null, error.httpCode, BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description, [error]);
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
      const responseData = await this.projectService.create(dto, userInfoFromJWT, organizationId);
      if (responseData.ok) {
        return new ExternalResponse<ProjectEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(error, EntityName.PROJECT, urlParams);
        const response = new ExternalResponse(null, statusCode, message, [fullError]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(null, error.httpCode, BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description, [error]);
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
      const responseData = await this.projectService.updateById(projectId, dto);
      if (responseData.ok) {
        return new ExternalResponse<ProjectEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(error, EntityName.PROJECT, urlParams);
        const response = new ExternalResponse(null, statusCode, message, [fullError]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(null, error.httpCode, BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description, [error]);
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
      const responseData = await this.projectService.deleteById(projectId);
      if (responseData.ok) {
        return new ExternalResponse<ProjectEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(error, EntityName.PROJECT, urlParams);
        const response = new ExternalResponse(null, statusCode, message, [fullError]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(null, error.httpCode, BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description, [error]);
    }
  }
}
