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
import {
  UserUpdateRequestDto,
  UserUpdateResponseDto,
} from './dto/controller/update-user.dto';
import { User } from '../../common/decorators/user.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { UserEntity } from './entities/user.entity';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { IUserService } from './types/user.service.interface';
import { UserGetAllResponseDto } from './dto/controller/get-all-users.dto';
import {
  AddUserToOrganizationCommand,
  AddUserToProjectCommand,
  AddUserToWorkspaceCommand,
  UserCreateCommand,
  UserGetAllCommand,
  UserGetCommand,
  UserUpdateCommand,
} from '../../../libs/contracts';
import { ExternalResponse } from '../../common/types/responses/universal-external-response.interface';
import {
  UserCreateRequestDto,
  UserCreateResponseDto,
} from './dto/controller/create-user.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { UserGetResponseDto } from './dto/controller/get-user.dto';
import { UserDeleteResponseDto } from './dto/controller/delete-user.dto';
import {
  IUrlParams,
  UrlParams,
} from '../../common/decorators/url-params.decorator';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { jsonStringify } from '../../common/helpers/stringify';
import { errorExtractor } from '../../common/helpers/inner-error.extractor';
import { EntityName } from '../../common/types/entity.enum';
import { BACKEND_ERRORS } from '../../common/errors/errors.backend';
import { ILogger } from '../../common/types/main/logger.interface';
import { DEFAULT_ROLE_ID } from '../../common/consts/consts';
import { WorkspaceAffiliationGuard } from '../../common/guards/workspace-affiliation.guard';
import { EUserTypeVariants } from '@prisma/client';
import {
  AddUserToWorkspaceRequestDto,
  AddUserToWorkspaceResponseDto,
} from './dto/controller/add-to-workspace.dto';
import { WorkspaceCreatorGuard } from '../../common/guards/workspace-creator.guard';
import {
  AddUserToProjectRequestDto,
  AddUserToProjectResponseDto,
} from './dto/controller/add-to-project.dto';
import {
  AddUserToOrganizationRequestDto,
  AddUserToOrganizationResponseDto,
} from './dto/controller/add-to-organization.dto';

@ApiTags('Работа с пользователями')
@Controller('user')
export class UserController {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_USER_SERVICE)
    private readonly userService: IUserService,
    @Inject(KEYS_FOR_INJECTION.I_LOGGER) private readonly logger: ILogger,
  ) {}

  @ApiOkResponse({
    schema: zodToOpenAPI(UserGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение пользователя по id' })
  @ApiResponse({ status: 200, type: UserGetResponseDto })
  @UseGuards(AuthGuard, WorkspaceAffiliationGuard)
  @ZodSerializerDto(UserGetResponseDto)
  @Get('/byId/:userId')
  async getByIdEP(
    @Param('userId', ParseUUIDPipe)
    userId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UserGetResponseDto> {
    try {
      const responseData = await this.userService.getById(userId);
      console.log(responseData);

      if (responseData.ok) {
        return new ExternalResponse<UserEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.USER,
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
    schema: zodToOpenAPI(UserGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение пользователя по email' })
  @ApiResponse({ status: 200, type: UserGetResponseDto })
  @UseGuards(AuthGuard, WorkspaceAffiliationGuard)
  @ZodSerializerDto(UserGetResponseDto)
  @Get('/byEmail/:email')
  async getByEmailEP(
    @Param('email') userEmail: EntityUrlParamCommand.RequestEmailParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UserGetResponseDto> {
    try {
      const responseData = await this.userService.getByEmail(userEmail);
      if (responseData.ok) {
        return new ExternalResponse<UserEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.USER,
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
    schema: zodToOpenAPI(UserGetAllCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [UserGetAllResponseDto] })
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(UserGetAllResponseDto)
  @Get()
  async getAllEP(
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UserGetAllResponseDto> {
    try {
      const responseData = await this.userService.getAll();
      if (responseData.ok) {
        return new ExternalResponse<UserEntity[]>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.USER,
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
    schema: zodToOpenAPI(UserCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(UserCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, type: UserCreateResponseDto })
  @ZodSerializerDto(UserCreateResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Post()
  async createEP(
    @Body() dto: UserCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UserCreateResponseDto> {
    // через эту ручку можно зарегистрировать только user с дефолтной ролью
    try {
      const responseData = await this.userService.create(dto, DEFAULT_ROLE_ID);
      console.log(responseData);
      if (responseData.ok) {
        return new ExternalResponse<UserEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.USER,
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
    schema: zodToOpenAPI(UserUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(UserCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменение пользователя по его id' })
  @ApiResponse({ status: 200, type: UserUpdateResponseDto })
  @ZodSerializerDto(UserUpdateResponseDto)
  @UseGuards(AuthGuard, WorkspaceAffiliationGuard)
  @Put('/:userId')
  async updateByIdEP(
    @Body() dto: UserUpdateRequestDto,
    @Param('userId', ParseUUIDPipe)
    userId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UserUpdateResponseDto> {
    try {
      const responseData = await this.userService.updateById(userId, dto);
      if (responseData.ok) {
        return new ExternalResponse<UserEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.USER,
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
    schema: zodToOpenAPI(UserCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Удаление пользователя по его id' })
  @ApiResponse({ status: 200, type: UserDeleteResponseDto })
  @ZodSerializerDto(UserDeleteResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Delete('/:userId')
  async deleteByIdEP(
    @Param('userId', ParseUUIDPipe)
    userId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UserDeleteResponseDto> {
    try {
      const responseData = await this.userService.deleteById(userId);
      if (responseData.ok) {
        return new ExternalResponse<UserEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.USER,
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
    schema: zodToOpenAPI(UserGetCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получение текущего пользователя со всей полнотой информации',
  })
  @ApiResponse({ status: 200, type: UserGetResponseDto })
  @UseGuards(AuthGuard)
  @ZodSerializerDto(UserGetResponseDto)
  @Get('/me')
  async getCurrentUserEP(
    @User() userInfoFromJWT: IJWTPayload,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UserGetResponseDto> {
    try {
      const responseData = await this.userService.getById(userInfoFromJWT.uuid);
      if (responseData.ok) {
        return new ExternalResponse<UserEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.USER,
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
    schema: zodToOpenAPI(AddUserToWorkspaceCommand.ResponseSchema),
  })
  @ApiOperation({
    summary:
      'Добавление обычного (WORKER, CUSTOMER) пользователя в Workspace менеджера по workspaceId',
  })
  @ApiResponse({ status: 200, type: AddUserToWorkspaceResponseDto })
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @Put('/add-to-workspace/workspace/:workspaceId')
  // добавить в workspace обычного пользователя
  async addUserToManagerWorkspaceEP(
    @Param('workspaceId', ParseUUIDPipe)
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: AddUserToWorkspaceRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<AddUserToWorkspaceResponseDto> {
    try {
      const responseData = await this.userService.addUserToManagerWorkspace(
        workspaceId,
        dto,
      );
      if (responseData.ok) {
        return new ExternalResponse<UserEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.USER,
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
    schema: zodToOpenAPI(AddUserToOrganizationCommand.ResponseSchema),
  })
  @ApiOperation({
    summary:
      'Добавление обычного (WORKER, CUSTOMER) пользователя в Organization менеджера по organizationId',
  })
  @ApiResponse({ status: 200, type: AddUserToOrganizationResponseDto })
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @Put(
    '/add-to-organization/workspace/:workspaceId/organization/:organizationId',
  )
  // добавить в organization обычного пользователя
  async addUserToManagerOrganizationEP(
    @Param('workspace', ParseUUIDPipe)
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('organization', ParseUUIDPipe)
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: AddUserToOrganizationRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<AddUserToOrganizationResponseDto> {
    try {
      const responseData = await this.userService.addUserToManagerOrganization(
        workspaceId,
        organizationId,
        dto,
      );
      if (responseData.ok) {
        return new ExternalResponse<UserEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.USER,
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
    schema: zodToOpenAPI(AddUserToProjectCommand.ResponseSchema),
  })
  @ApiOperation({
    summary:
      'Добавление обычного (WORKER, CUSTOMER) пользователя в Project менеджера по projectId',
  })
  @ApiResponse({ status: 200, type: AddUserToProjectResponseDto })
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @Put(
    '/add-to-project/workspace/:workspaceId/organization/:organizationId/project/:projectId',
  )
  // добавить в project обычного пользователя
  async addUserToManagerProjectEP(
    @Param('workspace', ParseUUIDPipe)
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('organization', ParseUUIDPipe)
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    @Param('project', ParseUUIDPipe)
    projectId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: AddUserToProjectRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<AddUserToProjectResponseDto> {
    try {
      const responseData = await this.userService.addUserToManagerProject(
        workspaceId,
        organizationId,
        projectId,
        dto,
      );
      if (responseData.ok) {
        return new ExternalResponse<UserEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.USER,
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
