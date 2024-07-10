import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
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
} from 'libs/contracts';
import { HandbookEntity } from './entities/handbook.entity';
import { EntityName } from '../../common/types/entity.enum';
import { ILogger } from '../../common/types/main/logger.interface';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { WorkspaceMembersGuard } from '../../common/guards/workspace-members.guard';
import { EUserTypeVariants } from '.prisma/client';
import { WorkspaceCreatorGuard } from '../../common/guards/workspace-creator.guard';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { okResponseHandler } from '../../common/helpers/handlers/ok-response.handler';
import { errorResponseHandler } from '../../common/helpers/handlers/error-response.handler';
import { IQueryParams, QueryParams } from '../../common/decorators/query-params.decorator';

@ApiTags('Работа с Handbook')
@Controller('handbook')
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
  @Get('workspace/:workspaceId/handbook/:handbookId')
  async getByIdEP(
    @Param('handbookId', ParseUUIDPipe)
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<HandbookGetResponseDto> {
    try {
      const { ok, data } = await this.handbookService.getById(handbookId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.HANDBOOK, urlParams);
    }
  }

  //region SWAGGER
  @ApiQuery({
    schema: zodToOpenAPI(HandbookGetAllCommand.RequestQuerySchema),
  })
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
  async getAllEP(@UrlParams() urlParams: IUrlParams, @QueryParams() queryParams?: IQueryParams): Promise<HandbookGetAllResponseDto> {
    try {
      const { ok, data } = await this.handbookService.getAll(queryParams);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.HANDBOOK, urlParams);
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
  @Post('workspace/:workspaceId')
  async createEP(
    @Body() dto: HandbookCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @User() userInfoFromJWT: IJWTPayload,
  ): Promise<HandbookCreateResponseDto> {
    // DOC в create нужно передать id пользователя, для которого создается handbook
    try {
      const { ok, data } = await this.handbookService.create(dto, userInfoFromJWT.uuid);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.HANDBOOK, urlParams);
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
  @Put('workspace/:workspaceId/handbook/:handbookId')
  async updateByIdEP(
    @Param('handbookId', ParseUUIDPipe)
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: HandbookUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<HandbookUpdateResponseDto> {
    try {
      const { ok, data } = await this.handbookService.updateById(handbookId, dto);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.HANDBOOK, urlParams);
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
  @Delete('workspace/:workspaceId/handbook/:handbookId')
  async deleteByIdEP(
    @Param('handbookId', ParseUUIDPipe)
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<HandbookDeleteResponseDto> {
    try {
      const { ok, data } = await this.handbookService.deleteById(handbookId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.HANDBOOK, urlParams);
    }
  }
}
