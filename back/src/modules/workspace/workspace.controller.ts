import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import {
  WorkspaceCreateCommand,
  WorkspaceDeleteCommand,
  WorkspaceGetAllCommand,
  WorkspaceGetCommand,
  WorkspaceUpdateCommand,
} from '../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { WorkspaceGetResponseDto } from './dto/controller/get-workspace.dto';
import { WorkspaceCreateRequestDto, WorkspaceCreateResponseDto } from './dto/controller/create-workspace.dto';
import { WorkspaceGetAllResponseDto } from './dto/controller/get-all-workspaces.dto';
import { WorkspaceUpdateRequestDto, WorkspaceUpdateResponseDto } from './dto/controller/update-workspace.dto';
import { WorkspaceDeleteResponseDto } from './dto/controller/delete-workspace.dto';
import { WorkspaceChangeOwnerRequestDto, WorkspaceChangeOwnerResponseDto } from './dto/controller/change-owner-workspace.dto';
import { IWorkspaceController } from './types/workspace.controller.interface';
import { IWorkspaceService } from './types/workspace.service.interface';
import { KFI } from '../../common/utils/di';
import { WorkspaceChangeOwnerCommand } from '../../../libs/contracts';
import { WorkspaceEntity } from './entities/workspace.entity';
import { EntityName } from '../../common/types/entity.enum';
import { ILogger } from '../../common/types/main/logger.interface';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { WorkspaceMembersGuard } from '../../common/guards/workspace-members.guard';
import { EUserTypeVariants } from '@prisma/client';
import { WorkspaceCreatorGuard } from '../../common/guards/workspace-creator.guard';
import { IsManagerInBodyGuard } from '../../common/guards/is-manager.guard';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { okResponseHandler } from '../../common/helpers/ok-response.handler';
import { errorResponseHandler } from '../../common/helpers/error-response.handler';
import { IQueryParams, QueryParams } from '../../common/decorators/query-params.decorator';

@ApiTags('Работа с Workspace пользователей')
@Controller('workspace')
export class WorkspaceController implements IWorkspaceController {
  constructor(
    @Inject(KFI.WORKSPACE_SERVICE)
    private readonly workspaceService: IWorkspaceService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(WorkspaceGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение Workspace по id' })
  @ApiResponse({ status: 200, type: WorkspaceGetResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(WorkspaceGetResponseDto)
  @Get('/:workspaceId')
  async getByIdEP(
    @Param('workspaceId', ParseUUIDPipe)
    id: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<WorkspaceGetResponseDto> {
    try {
      const { ok, data } = await this.workspaceService.getById(id);
      return okResponseHandler(ok, data, WorkspaceEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.WORKSPACE, urlParams);
    }
  }

  //region SWAGGER
  @ApiQuery({
    schema: zodToOpenAPI(WorkspaceGetAllCommand.RequestQuerySchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(WorkspaceGetAllCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получить все Workspace пользователей' })
  @ApiResponse({ status: 200, type: [WorkspaceGetAllResponseDto] })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(WorkspaceGetAllResponseDto)
  @Get()
  async getAllEP(@UrlParams() urlParams: IUrlParams, @QueryParams() queryParams?: IQueryParams): Promise<WorkspaceGetAllResponseDto> {
    try {
      const { ok, data } = await this.workspaceService.getAll(queryParams);
      return okResponseHandler(ok, data, WorkspaceEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.WORKSPACE, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(WorkspaceCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(WorkspaceCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание Workspace' })
  @ApiResponse({ status: 201, type: WorkspaceCreateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(WorkspaceCreateResponseDto)
  @Post()
  async createEP(
    @Body() dto: WorkspaceCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @User() userInfo: IJWTPayload,
  ): Promise<WorkspaceCreateResponseDto> {
    // в create нужно передать id пользователя, для которого создается workspace
    try {
      const { ok, data } = await this.workspaceService.create(dto, userInfo.uuid);
      return okResponseHandler(ok, data, WorkspaceEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.WORKSPACE, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(WorkspaceUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(WorkspaceUpdateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменение Workspace пользователя по id Workspace' })
  @ApiResponse({ status: 200, type: WorkspaceUpdateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(WorkspaceUpdateResponseDto)
  @Put('/:workspaceId')
  async updateByIdEP(
    @Param('workspaceId', ParseUUIDPipe)
    id: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: WorkspaceUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    // @User() user: IJWTPayload,
  ): Promise<WorkspaceUpdateResponseDto> {
    try {
      const { ok, data } = await this.workspaceService.updateById(id, dto);
      return okResponseHandler(ok, data, WorkspaceEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.WORKSPACE, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(WorkspaceDeleteCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Удаление Workspace пользователя по id Workspace' })
  @ApiResponse({ status: 200, type: WorkspaceDeleteResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(WorkspaceDeleteResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Delete('/:workspaceId')
  async deleteByIdEP(
    @Param('workspaceId', ParseUUIDPipe)
    id: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<WorkspaceDeleteResponseDto> {
    try {
      const { ok, data } = await this.workspaceService.deleteById(id);
      return okResponseHandler(ok, data, WorkspaceEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.WORKSPACE, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(WorkspaceChangeOwnerCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(WorkspaceChangeOwnerCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Изменение владельца Workspace по id Workspace и id пользователя',
  })
  @ApiResponse({ status: 200, type: WorkspaceChangeOwnerResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(WorkspaceGetResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard, IsManagerInBodyGuard)
  @Put('/change-owner/:workspaceId')
  //изменить owner id на новый (переданный в body запроса)
  // Этого мало, нужно еще у старого пользователя все поменять, а новому передать handbook и следить за истинностью данных. Для этого нужно будет перенести в Users данную ручку (чтобы избежать кольцевых зависимостей)
  async changeWorkspaceOwnerEP(
    @Param('workspaceId', ParseUUIDPipe)
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: WorkspaceChangeOwnerRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<WorkspaceChangeOwnerResponseDto> {
    try {
      const { ok, data } = await this.workspaceService.changeWorkspaceOwner(workspaceId, dto);
      return okResponseHandler(ok, data, WorkspaceEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.WORKSPACE, urlParams);
    }
  }
}
