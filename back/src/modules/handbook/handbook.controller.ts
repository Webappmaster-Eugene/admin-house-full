import { Body, Controller, Delete, Get, HttpException, Inject, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { ExternalResponse } from '../../common/types/responses/universal-external-response.interface';
import { HandbookGetResponseDto } from './dto/controller/get-handbook.dto';
import { HandbookCreateRequestDto, HandbookCreateResponseDto } from './dto/controller/create-handbook.dto';
import { HandbookGetAllResponseDto } from './dto/controller/get-all-handbooks.dto';
import { HandbookUpdateRequestDto, HandbookUpdateResponseDto } from './dto/controller/update-handbook.dto';
import { HandbookDeleteResponseDto } from './dto/controller/delete-handbook.dto';
import { IHandbookController } from './types/handbook.controller.interface';
import { IHandbookService } from './types/handbook.service.interface';
import { KFI } from '../../common/utils/di';
import {
  HandbookCreateCommand,
  HandbookDeleteCommand,
  HandbookGetAllCommand,
  HandbookGetCommand,
  HandbookUpdateCommand,
} from '../../../libs/contracts';
import { HandbookEntity } from './entities/handbook.entity';
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

@ApiTags('Работа с Handbook')
@Controller('/workspace/:workspaceId/handbook')
export class HandbookController implements IHandbookController {
  constructor(
    @Inject(KFI.HANDBOOK_SERVICE)
    private readonly handbookService: IHandbookService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(HandbookGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение Handbook по id' })
  @ApiResponse({ status: 200, type: HandbookGetResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(HandbookGetResponseDto)
  @Get('/:handbookId')
  async getByIdEP(
    @Param('handbookId', ParseUUIDPipe)
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<HandbookGetResponseDto> {
    try {
      const responseData = await this.handbookService.getById(handbookId);
      if (responseData.ok) {
        return new ExternalResponse<HandbookEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(error, EntityName.HANDBOOK, urlParams);
        const response = new ExternalResponse(null, statusCode, message, [fullError]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(null, error.httpCode, BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description, [error]);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(HandbookGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получить все Handbook',
  })
  @ApiResponse({ status: 200, type: [HandbookGetAllResponseDto] })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(HandbookGetAllResponseDto)
  @Get()
  async getAllEP(@UrlParams() urlParams: IUrlParams): Promise<HandbookGetAllResponseDto> {
    try {
      const responseData = await this.handbookService.getAll();
      if (responseData.ok) {
        return new ExternalResponse<HandbookEntity[]>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(error, EntityName.HANDBOOK, urlParams);
        const response = new ExternalResponse(null, statusCode, message, [fullError]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(null, error.httpCode, BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description, [error]);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(HandbookCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(HandbookCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание Handbook' })
  @ApiResponse({ status: 201, type: HandbookCreateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(HandbookCreateResponseDto)
  @Post()
  async createEP(
    @Body() dto: HandbookCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @User() userInfoFromJWT: IJWTPayload,
  ): Promise<HandbookCreateResponseDto> {
    // в create нужно передать id пользователя, для которого создается handbook
    try {
      const responseData = await this.handbookService.create(dto, userInfoFromJWT.uuid);
      if (responseData.ok) {
        return new ExternalResponse<HandbookEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(error, EntityName.HANDBOOK, urlParams);
        const response = new ExternalResponse(null, statusCode, message, [fullError]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(null, error.httpCode, BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description, [error]);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(HandbookUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(HandbookUpdateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменение Handbook по id Handbook' })
  @ApiResponse({ status: 200, type: HandbookUpdateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(HandbookUpdateResponseDto)
  @Put('/:handbookId')
  async updateByIdEP(
    @Param('handbookId', ParseUUIDPipe)
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: HandbookUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<HandbookUpdateResponseDto> {
    try {
      const responseData = await this.handbookService.updateById(handbookId, dto);
      if (responseData.ok) {
        return new ExternalResponse<HandbookEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(error, EntityName.HANDBOOK, urlParams);
        const response = new ExternalResponse(null, statusCode, message, [fullError]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(null, error.httpCode, BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description, [error]);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(HandbookDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Удаление Handbook внутри Workspace менеджера по id Handbook',
  })
  @ApiResponse({ status: 200, type: HandbookDeleteResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(HandbookDeleteResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Delete('/:handbookId')
  async deleteByIdEP(
    @Param('handbookId', ParseUUIDPipe)
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<HandbookDeleteResponseDto> {
    try {
      const responseData = await this.handbookService.deleteById(handbookId);
      if (responseData.ok) {
        return new ExternalResponse<HandbookEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(error, EntityName.HANDBOOK, urlParams);
        const response = new ExternalResponse(null, statusCode, message, [fullError]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(null, error.httpCode, BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description, [error]);
    }
  }
}
