import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Inject,
  Param,
  ParseIntPipe,
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
import { OrganizationEntity } from './entities/organization.entity';
import { ExternalResponse } from '../../common/types/responses/universal-external-response.interface';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import {
  OrganizationCreateCommand,
  OrganizationGetAllCommand,
  OrganizationGetCommand,
  OrganizationUpdateCommand,
} from '../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { IOrganizationService } from './types/organization.service.interface';
import { OrganizationGetAllResponseDto } from './dto/controller/get-all-organizations.dto';
import { OrganizationGetResponseDto } from './dto/controller/get-organization.dto';
import { OrganizationDeleteResponseDto } from './dto/controller/delete-organization.dto';
import {
  OrganizationUpdateRequestDto,
  OrganizationUpdateResponseDto,
} from './dto/controller/update-organization.dto';
import {
  OrganizationCreateRequestDto,
  OrganizationCreateResponseDto,
} from './dto/controller/create-organization.dto';
import { OrganizationDeleteCommand } from '../../../libs/contracts';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { User } from '../../common/decorators/user.decorator';
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
import { WorkspaceCreatorGuard } from '../../common/guards/workspace-creator.guard';
import { WorkspaceMembersGuard } from '../../common/guards/workspace-members.guard';
import { EUserTypeVariants } from '@prisma/client';

@ApiTags('Работа с Organization пользователей')
@Controller('workspace/:workspaceId/organization')
export class OrganizationController {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_ORGANIZATION_SERVICE)
    private readonly organizationService: IOrganizationService,
    @Inject(KEYS_FOR_INJECTION.I_LOGGER) private readonly logger: ILogger,
  ) {}

  @ApiOkResponse({
    schema: zodToOpenAPI(OrganizationGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение Organization по id' })
  @ApiResponse({ status: 200, type: OrganizationGetResponseDto })
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(OrganizationGetResponseDto)
  @Get('/:organizationId')
  async getByIdEP(
    @Param('organizationId')
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<OrganizationGetResponseDto> {
    try {
      const responseData =
        await this.organizationService.getById(organizationId);
      if (responseData.ok) {
        return new ExternalResponse<OrganizationEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.ROLE,
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
    schema: zodToOpenAPI(OrganizationGetAllCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получить все Organizations пользователей' })
  @ApiResponse({ status: 200, type: [OrganizationGetAllResponseDto] })
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(OrganizationGetAllResponseDto)
  @Get()
  async getAllEP(
    @UrlParams() urlParams: IUrlParams,
  ): Promise<OrganizationGetAllResponseDto> {
    try {
      const responseData = await this.organizationService.getAll();
      if (responseData.ok) {
        return new ExternalResponse<OrganizationEntity[]>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.ORGANIZATION,
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
    schema: zodToOpenAPI(OrganizationCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(OrganizationCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание Organization' })
  @ApiResponse({ status: 201, type: OrganizationEntity })
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(OrganizationCreateResponseDto)
  @Post()
  async createEP(
    @Body() dto: OrganizationCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @User() userInfoFromJWT: IJWTPayload,
    @Param('workspaceId') workspaceId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<OrganizationCreateResponseDto> {
    // в param create передается автоматически id Workspace, в котором создается Organization
    try {
      const responseData = await this.organizationService.create(
        dto,
        userInfoFromJWT,
        workspaceId,
      );
      if (responseData.ok) {
        return new ExternalResponse<OrganizationEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.ORGANIZATION,
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
    schema: zodToOpenAPI(OrganizationUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(OrganizationUpdateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменение Organization по id Organization' })
  @ApiResponse({ status: 200, type: OrganizationUpdateResponseDto })
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(OrganizationUpdateResponseDto)
  @Put('/:organizationId')
  async updateByIdEP(
    @Body() dto: OrganizationUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @Param('organizationId', ParseIntPipe)
    organizationId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<OrganizationUpdateResponseDto> {
    try {
      const responseData = await this.organizationService.updateById(
        organizationId,
        dto,
      );
      if (responseData.ok) {
        return new ExternalResponse<OrganizationEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.ORGANIZATION,
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
    schema: zodToOpenAPI(OrganizationDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Удаление Organization по id Organization',
  })
  @ApiResponse({ status: 200, type: OrganizationDeleteResponseDto })
  @RolesSetting('MANAGER')
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @Delete('/:organizationId')
  async deleteByIdEP(
    @Param('organizationId', ParseUUIDPipe)
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<OrganizationDeleteResponseDto> {
    try {
      const responseData =
        await this.organizationService.deleteById(organizationId);
      if (responseData.ok) {
        return new ExternalResponse<OrganizationEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.ORGANIZATION,
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
