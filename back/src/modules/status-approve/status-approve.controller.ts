import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';
import { StatusApproveGetResponseDto } from 'src/modules/status-approve/dto/controller/get-status-approve.dto';
import {
  StatusApproveCreateRequestDto,
  StatusApproveCreateResponseDto,
} from 'src/modules/status-approve/dto/controller/create-status-approve.dto';
import { StatusApproveGetAllResponseDto } from 'src/modules/status-approve/dto/controller/get-all-status-approve.dto';
import {
  StatusApproveUpdateRequestDto,
  StatusApproveUpdateResponseDto,
} from 'src/modules/status-approve/dto/controller/update-status-approve.dto';
import { StatusApproveDeleteResponseDto } from 'src/modules/status-approve/dto/controller/delete-status-approve.dto';
import { IStatusApproveController } from './types/status-approve.controller.interface';
import { IStatusApproveService } from './types/status-approve.service.interface';
import { KFI } from '../../common/utils/di';
import {
  StatusApproveCreateCommand,
  StatusApproveDeleteCommand,
  StatusApproveGetAllCommand,
  StatusApproveGetCommand,
  StatusApproveUpdateCommand,
} from 'libs/contracts';
import { EntityName } from '../../common/types/entity.enum';
import { ILogger } from '../../common/types/main/logger.interface';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { EUserTypeVariants } from '.prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { okResponseHandler } from '../../common/helpers/handlers/ok-response.handler';
import { errorResponseHandler } from '../../common/helpers/handlers/error-response.handler';
import { IQueryParams, QueryParams } from '../../common/decorators/query-params.decorator';
import { StatusApproveEntity } from 'src/modules/status-approve/entities/status-approve.entity';

@ApiTags('Работа с StatusApprove')
@Controller('status-approve')
export class StatusApproveController implements IStatusApproveController {
  constructor(
    @Inject(KFI.STATUS_APPROVE_SERVICE)
    private readonly statusApproveService: IStatusApproveService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}
  // FIXME возможно придется привязаться к workspace, так как у каждой компании свои статусы будут

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(StatusApproveGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение StatusApprove по id' })
  @ApiResponse({ status: 200, type: StatusApproveGetResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard)
  @ZodSerializerDto(StatusApproveGetResponseDto)
  @Get('/:statusApproveId')
  async getByIdEP(
    @Param('statusApproveId', ParseUUIDPipe)
    statusApproveId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<StatusApproveGetResponseDto> {
    try {
      const { ok, data } = await this.statusApproveService.getById(statusApproveId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.STATUS_RESOURCE, urlParams);
    }
  }

  //region SWAGGER
  @ApiQuery({
    schema: zodToOpenAPI(StatusApproveGetAllCommand.RequestQuerySchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(StatusApproveGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получить все StatusApproves',
  })
  @ApiResponse({ status: 200, type: [StatusApproveGetAllResponseDto] })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard)
  @ZodSerializerDto(StatusApproveGetAllResponseDto)
  @Get()
  async getAllEP(@UrlParams() urlParams: IUrlParams, @QueryParams() queryParams?: IQueryParams): Promise<StatusApproveGetAllResponseDto> {
    try {
      const { ok, data } = await this.statusApproveService.getAll(queryParams);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.STATUS_RESOURCE, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(StatusApproveCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(StatusApproveCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание StatusApprove' })
  @ApiResponse({ status: 201, type: StatusApproveCreateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(StatusApproveCreateResponseDto)
  @Post()
  async createEP(@Body() dto: StatusApproveCreateRequestDto, @UrlParams() urlParams: IUrlParams): Promise<StatusApproveCreateResponseDto> {
    try {
      const { ok, data } = await this.statusApproveService.create(dto);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.STATUS_RESOURCE, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(StatusApproveUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(StatusApproveUpdateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменение StatusApprove по id StatusApprove' })
  @ApiResponse({ status: 200, type: StatusApproveUpdateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(StatusApproveUpdateResponseDto)
  @Put('/:statusApproveId')
  async updateByIdEP(
    @Param('statusApproveId', ParseUUIDPipe)
    statusApproveId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: StatusApproveUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<StatusApproveUpdateResponseDto> {
    try {
      const { ok, data } = await this.statusApproveService.updateById(statusApproveId, dto);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.STATUS_RESOURCE, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(StatusApproveDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Удаление StatusApprove',
  })
  @ApiResponse({ status: 200, type: StatusApproveDeleteResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(StatusApproveDeleteResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Delete('/:statusApproveId')
  async deleteByIdEP(
    @Param('statusApproveId', ParseUUIDPipe)
    statusApproveId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<StatusApproveDeleteResponseDto> {
    try {
      const { ok, data } = await this.statusApproveService.deleteById(statusApproveId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.STATUS_RESOURCE, urlParams);
    }
  }
}
