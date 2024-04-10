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
import { WorkspaceService } from './workspace.service';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { WorkspaceManagerGuard } from '../../common/guards/workspace.guard';
import { User } from '../../common/decorators/user.decorator';
import { zodToOpenAPI } from 'nestjs-zod';
import {
  UserCreateCommand,
  WorkspaceCreateCommand,
  WorkspaceDeleteCommand,
  WorkspaceGetAllCommand,
  WorkspaceGetCommand,
  WorkspaceUpdateCommand,
} from '../../../libs/contracts';
import { UserGetResponseDto } from '../user/dto/controller/get-user.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import {
  ExternalResponse,
  UniversalExternalResponse,
} from '../../common/types/responses/universal-external-response.interface';
import { WorkspaceGetResponseDto } from './dto/controller/get-workspace.dto';
import { UserCreateResponseDto } from '../user/dto/controller/create-user.dto';
import {
  WorkspaceCreateRequestDto,
  WorkspaceCreateResponseDto,
} from './dto/controller/create-workspace.dto';
import { WorkspaceGetAllResponseDto } from './dto/controller/get-all-workspaces.dto';
import { toResponseClientArray } from '../../common/utils/mappers';
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
import {
  WorkspaceAddUserToManagerRequestDto,
  WorkspaceAddUserToManagerResponseDto,
} from './dto/controller/add-to-manager-workspace.dto';
import { IWorkspaceService } from './types/workspace.service.interface';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { WorkspaceChangeOwnerCommand } from '../../../libs/contracts/commands/workspace/change-owner.command';

@ApiTags('Работа с Workspace пользователей')
@Controller('workspaces')
export class WorkspaceController implements IWorkspaceController {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_WORKSPACE_SERVICE)
    private readonly workspaceService: IWorkspaceService,
  ) {}

  @ApiOkResponse({
    schema: zodToOpenAPI(WorkspaceGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение Workspace по id' })
  @ApiResponse({ status: 200, type: WorkspaceGetResponseDto })
  @UseGuards(AuthGuard)
  @Get('/:id')
  async getByIdEP(
    @Param('id', ParseUUIDPipe) id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalExternalResponse<WorkspaceGetResponseDto | null>> {
    const responseData = await this.workspaceService.getById(id);
    if (responseData.ok) {
      return new ExternalResponse<WorkspaceGetResponseDto>(
        new WorkspaceGetResponseDto(responseData.data),
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
    schema: zodToOpenAPI(WorkspaceGetAllCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получить все Workspace пользователей' })
  @ApiResponse({ status: 200, type: [WorkspaceGetAllResponseDto] })
  @RolesSetting('MANAGER', 'ADMIN')
  @UseGuards(AuthGuard)
  @Get()
  async getAllEP(): Promise<
    UniversalExternalResponse<WorkspaceGetAllResponseDto[] | null>
  > {
    const responseData = await this.workspaceService.getAll();
    if (responseData.ok) {
      return new ExternalResponse<WorkspaceGetAllResponseDto[]>(
        toResponseClientArray(responseData.data, WorkspaceGetAllResponseDto),
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

  @ApiBody({
    schema: zodToOpenAPI(WorkspaceCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(WorkspaceCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание Workspace' })
  @ApiResponse({ status: 201, type: WorkspaceCreateResponseDto })
  @RolesSetting('MANAGER')
  @UseGuards(AuthGuard)
  @Post()
  async createEP(
    @Body() dto: WorkspaceCreateRequestDto,
    @User() userInfo: IJWTPayload,
  ): Promise<UniversalExternalResponse<WorkspaceCreateResponseDto>> {
    // в create нужно передать id пользователя, для которого создается workspace
    const userId = userInfo.uuid;
    const responseData = await this.workspaceService.create(dto, userId);
    if (responseData.ok) {
      return new ExternalResponse<WorkspaceCreateResponseDto>(
        new WorkspaceCreateResponseDto(responseData.data),
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

  @ApiBody({
    schema: zodToOpenAPI(WorkspaceUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(WorkspaceUpdateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменение Workspace пользователя по id Workspace' })
  @ApiResponse({ status: 200, type: WorkspaceUpdateResponseDto })
  @RolesSetting('MANAGER')
  @UseGuards(AuthGuard, WorkspaceManagerGuard)
  @Put('/:id')
  async updateByIdEP(
    @Param('/:id', ParseUUIDPipe) id: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: WorkspaceUpdateRequestDto,
    // @User() user: IJWTPayload,
  ): Promise<UniversalExternalResponse<WorkspaceUpdateResponseDto>> {
    const responseData = await this.workspaceService.updateById(id, dto);
    if (responseData.ok) {
      return new ExternalResponse<WorkspaceUpdateResponseDto>(
        new WorkspaceUpdateResponseDto(responseData.data),
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
    schema: zodToOpenAPI(WorkspaceDeleteCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Удаление Workspace пользователя по id Workspace' })
  @ApiResponse({ status: 200, type: WorkspaceDeleteResponseDto })
  @Delete('/:id')
  async deleteByIdEP(
    @Param('id', ParseUUIDPipe) id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalExternalResponse<WorkspaceDeleteResponseDto>> {
    const responseData = await this.workspaceService.deleteById(id);
    if (responseData.ok) {
      return new ExternalResponse<WorkspaceDeleteResponseDto>(
        new WorkspaceDeleteResponseDto(responseData.data),
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
  @Put('/:id')
  //изменить owner id на новый (переданный в body запроса)
  async changeWorkspaceOwnerEP(
    @Param('/changeOwner/:id', ParseUUIDPipe)
    id: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: WorkspaceChangeOwnerRequestDto,
  ): Promise<
    UniversalExternalResponse<WorkspaceChangeOwnerResponseDto | null>
  > {
    const responseData = await this.workspaceService.changeWorkspaceOwner(
      id,
      dto,
    );
    if (responseData.ok) {
      return new ExternalResponse<WorkspaceChangeOwnerResponseDto>(
        new WorkspaceChangeOwnerResponseDto(responseData.data),
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
    schema: zodToOpenAPI(UserCreateCommand.ResponseSchema),
  })
  @ApiOperation({
    summary:
      'Добавление обычного (WORKER, CUSTOMER) пользователя в Workspace менеджера по id обычного пользователя',
  })
  @ApiResponse({ status: 200, type: WorkspaceAddUserToManagerResponseDto })
  @RolesSetting('MANAGER')
  @UseGuards(AuthGuard, WorkspaceManagerGuard)
  @Put('/addUserToManagerWorkspace')
  async addUserToManagerWorkspaceEP(
    @Body() dto: WorkspaceAddUserToManagerRequestDto,
    @User() userInfoFromJWT: IJWTPayload,
  ): Promise<
    UniversalExternalResponse<WorkspaceAddUserToManagerResponseDto | null>
  > {
    const managerWorkspace = await this.workspaceService.getByManagerId(
      userInfoFromJWT.uuid,
    );

    const responseData = await this.workspaceService.addUserToManagerWorkspace(
      managerWorkspace.data.uuid,
      dto,
    );

    if (responseData.ok) {
      return new ExternalResponse<WorkspaceAddUserToManagerResponseDto>(
        new WorkspaceAddUserToManagerResponseDto(responseData.data),
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
