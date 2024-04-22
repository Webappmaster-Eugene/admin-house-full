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
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
import { ExternalResponse } from '../../common/types/responses/universal-external-response.interface';
import { WorkspaceGetResponseDto } from './dto/controller/get-workspace.dto';
import {
  WorkspaceCreateRequestDto,
  WorkspaceCreateResponseDto,
} from './dto/controller/create-workspace.dto';
import { WorkspaceGetAllResponseDto } from './dto/controller/get-all-workspaces.dto';
import {
  WorkspaceUpdateRequestDto,
  WorkspaceUpdateResponseDto,
} from './dto/controller/update-workspace.dto';
import { WorkspaceDeleteResponseDto } from './dto/controller/delete-workspace.dto';
import {
  WorkspaceChangeOwnerRequestDto,
  WorkspaceChangeOwnerResponseDto,
} from './dto/controller/change-owner-workspace.dto';
import { IWorkspaceController } from './types/workspace.controller.interface';
import { IWorkspaceService } from './types/workspace.service.interface';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { WorkspaceChangeOwnerCommand } from '../../../libs/contracts';
import { WorkspaceEntity } from './entities/workspace.entity';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { jsonStringify } from '../../common/helpers/stringify';
import { errorExtractor } from '../../common/helpers/inner-error.extractor';
import { EntityName } from '../../common/types/entity.enum';
import { BACKEND_ERRORS } from '../../common/errors/errors.backend';
import { ILogger } from '../../common/types/main/logger.interface';
import {
  IUrlParams,
  UrlParams,
} from '../../common/decorators/url-params.decorator';
import { WorkspaceMembersGuard } from '../../common/guards/workspace-members.guard';
import { EUserTypeVariants } from '@prisma/client';
import { WorkspaceCreatorGuard } from '../../common/guards/workspace-creator.guard';
import { IsManagerInBodyGuard } from '../../common/guards/is-manager.guard';

@ApiTags('Работа с Workspace пользователей')
@Controller('workspace')
export class WorkspaceController implements IWorkspaceController {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_WORKSPACE_SERVICE)
    private readonly workspaceService: IWorkspaceService,
    @Inject(KEYS_FOR_INJECTION.I_LOGGER) private readonly logger: ILogger,
  ) {}

  @ApiOkResponse({
    schema: zodToOpenAPI(WorkspaceGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение Workspace по id' })
  @ApiResponse({ status: 200, type: WorkspaceGetResponseDto })
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(WorkspaceGetResponseDto)
  @Get('/:workspaceId')
  async getByIdEP(
    @Param('workspaceId', ParseUUIDPipe)
    id: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<WorkspaceGetResponseDto> {
    try {
      const responseData = await this.workspaceService.getById(id);
      if (responseData.ok) {
        return new ExternalResponse<WorkspaceEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.WORKSPACE,
          urlParams,
        );
        const response = new ExternalResponse(null, statusCode, message, [
          fullError,
        ]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(
        null,
        error.httpCode,
        BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description,
        [error],
      );
    }
  }

  @ApiOkResponse({
    schema: zodToOpenAPI(WorkspaceGetAllCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получить все Workspace пользователей' })
  @ApiResponse({ status: 200, type: [WorkspaceGetAllResponseDto] })
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(WorkspaceGetAllResponseDto)
  @Get()
  async getAllEP(
    @UrlParams() urlParams: IUrlParams,
  ): Promise<WorkspaceGetAllResponseDto> {
    try {
      const responseData = await this.workspaceService.getAll();
      if (responseData.ok) {
        return new ExternalResponse<WorkspaceEntity[]>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.WORKSPACE,
          urlParams,
        );
        const response = new ExternalResponse(null, statusCode, message, [
          fullError,
        ]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(
        null,
        error.httpCode,
        BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description,
        [error],
      );
    }
  }

  @ApiBody({
    schema: zodToOpenAPI(WorkspaceCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(WorkspaceCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание Workspace' })
  @ApiResponse({ status: 201, type: WorkspaceCreateResponseDto })
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
      const userId = userInfo.uuid;
      const responseData = await this.workspaceService.create(dto, userId);
      if (responseData.ok) {
        return new ExternalResponse<WorkspaceEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.WORKSPACE,
          urlParams,
        );
        const response = new ExternalResponse(null, statusCode, message, [
          fullError,
        ]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(
        null,
        error.httpCode,
        BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description,
        [error],
      );
    }
  }

  @ApiBody({
    schema: zodToOpenAPI(WorkspaceUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(WorkspaceUpdateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменение Workspace пользователя по id Workspace' })
  @ApiResponse({ status: 200, type: WorkspaceUpdateResponseDto })
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
    console.log(1);
    try {
      const responseData = await this.workspaceService.updateById(id, dto);
      if (responseData.ok) {
        return new ExternalResponse<WorkspaceEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.WORKSPACE,
          urlParams,
        );
        const response = new ExternalResponse(null, statusCode, message, [
          fullError,
        ]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(
        null,
        error.httpCode,
        BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description,
        [error],
      );
    }
  }

  @ApiOkResponse({
    schema: zodToOpenAPI(WorkspaceDeleteCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Удаление Workspace пользователя по id Workspace' })
  @ApiResponse({ status: 200, type: WorkspaceDeleteResponseDto })
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
      const responseData = await this.workspaceService.deleteById(id);
      if (responseData.ok) {
        return new ExternalResponse<WorkspaceEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.WORKSPACE,
          urlParams,
        );
        const response = new ExternalResponse(null, statusCode, message, [
          fullError,
        ]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(
        null,
        error.httpCode,
        BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description,
        [error],
      );
    }
  }

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
      const responseData = await this.workspaceService.changeWorkspaceOwner(
        workspaceId,
        dto,
      );
      if (responseData.ok) {
        return new ExternalResponse<WorkspaceEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.WORKSPACE,
          urlParams,
        );
        const response = new ExternalResponse(null, statusCode, message, [
          fullError,
        ]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(
        null,
        error.httpCode,
        BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description,
        [error],
      );
    }
  }
}
