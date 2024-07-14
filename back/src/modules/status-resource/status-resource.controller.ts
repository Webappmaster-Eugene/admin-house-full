import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { EntityUrlParamCommand } from 'libs/contracts';
import { StatusResourceGetResponseDto } from './dto/controller/get-status-resource.dto';
import { StatusResourceCreateRequestDto, StatusResourceCreateResponseDto } from './dto/controller/create-status-resource.dto';
import { StatusResourceGetAllResponseDto } from './dto/controller/get-all-status-resources.dto';
import { StatusResourceUpdateRequestDto, StatusResourceUpdateResponseDto } from './dto/controller/update-status-resource.dto';
import { StatusResourceDeleteResponseDto } from './dto/controller/delete-status-resource.dto';
import { IStatusResourceController } from './types/status-resource.controller.interface';
import { IStatusResourceService } from './types/status-resource.service.interface';
import { KFI } from '../../common/utils/di';
import {
  StatusResourceCreateCommand,
  StatusResourceDeleteCommand,
  StatusResourceGetAllCommand,
  StatusResourceGetCommand,
  StatusResourceUpdateCommand,
} from 'libs/contracts';
import { StatusResourceEntity } from './entities/status-resource.entity';
import { EntityName } from '../../common/types/entity.enum';
import { ILogger } from '../../common/types/main/logger.interface';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { EUserTypeVariants } from '.prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { okResponseHandler } from '../../common/helpers/handlers/ok-response.handler';
import { errorResponseHandler } from '../../common/helpers/handlers/error-response.handler';
import { IQueryParams, QueryParams } from '../../common/decorators/query-params.decorator';

@ApiTags('Работа с StatusResource')
@Controller('status-resource')
export class StatusResourceController implements IStatusResourceController {
  constructor(
    @Inject(KFI.STATUS_RESOURCE_SERVICE)
    private readonly statusResourceService: IStatusResourceService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}
  // FIXME возможно придется привязаться к workspace, так как у каждой компании свои статусы будут

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(StatusResourceGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение StatusResource по id' })
  @ApiResponse({ status: 200, type: StatusResourceGetResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard)
  @ZodSerializerDto(StatusResourceGetResponseDto)
  @Get('/:statusResourceId')
  async getByIdEP(
    @Param('statusResourceId', ParseUUIDPipe)
    statusResourceId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<StatusResourceGetResponseDto> {
    try {
      const { ok, data } = await this.statusResourceService.getById(statusResourceId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.STATUS_RESOURCE, urlParams);
    }
  }

  //region SWAGGER
  @ApiQuery({
    schema: zodToOpenAPI(StatusResourceGetAllCommand.RequestQuerySchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(StatusResourceGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получить все StatusResources',
  })
  @ApiResponse({ status: 200, type: [StatusResourceGetAllResponseDto] })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard)
  @ZodSerializerDto(StatusResourceGetAllResponseDto)
  @Get()
  async getAllEP(@UrlParams() urlParams: IUrlParams, @QueryParams() queryParams?: IQueryParams): Promise<StatusResourceGetAllResponseDto> {
    try {
      const { ok, data } = await this.statusResourceService.getAll(queryParams);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.STATUS_RESOURCE, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(StatusResourceCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(StatusResourceCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание StatusResource' })
  @ApiResponse({ status: 201, type: StatusResourceCreateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(StatusResourceCreateResponseDto)
  @Post()
  async createEP(
    @Body() dto: StatusResourceCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<StatusResourceCreateResponseDto> {
    try {
      const { ok, data } = await this.statusResourceService.create(dto);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.STATUS_RESOURCE, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(StatusResourceUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(StatusResourceUpdateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменение StatusResource по id StatusResource' })
  @ApiResponse({ status: 200, type: StatusResourceUpdateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(StatusResourceUpdateResponseDto)
  @Put('/:statusResourceId')
  async updateByIdEP(
    @Param('statusResourceId', ParseUUIDPipe)
    statusResourceId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: StatusResourceUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<StatusResourceUpdateResponseDto> {
    try {
      const { ok, data } = await this.statusResourceService.updateById(statusResourceId, dto);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.STATUS_RESOURCE, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(StatusResourceDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Удаление StatusResource',
  })
  @ApiResponse({ status: 200, type: StatusResourceDeleteResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(StatusResourceDeleteResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Delete('/:statusResourceId')
  async deleteByIdEP(
    @Param('statusResourceId', ParseUUIDPipe)
    statusResourceId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<StatusResourceDeleteResponseDto> {
    try {
      const { ok, data } = await this.statusResourceService.deleteById(statusResourceId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.STATUS_RESOURCE, urlParams);
    }
  }
}
