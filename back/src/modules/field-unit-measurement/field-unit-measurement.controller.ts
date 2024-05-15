import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { FieldUnitMeasurementGetResponseDto } from './dto/controller/get-field-unit-measurement.dto';
import {
  FieldUnitMeasurementCreateRequestDto,
  FieldUnitMeasurementCreateResponseDto,
} from './dto/controller/create-field-unit-measurement.dto';
import { FieldUnitMeasurementGetAllResponseDto } from './dto/controller/get-all-field-unit-measurements.dto';
import {
  FieldUnitMeasurementUpdateRequestDto,
  FieldUnitMeasurementUpdateResponseDto,
} from './dto/controller/update-field-unit-measurement.dto';
import { FieldUnitMeasurementDeleteResponseDto } from './dto/controller/delete-field-unit-measurement.dto';
import { IFieldUnitMeasurementController } from './types/field-unit-measurement.controller.interface';
import { IFieldUnitMeasurementService } from './types/field-unit-measurement.service.interface';
import { KFI } from '../../common/utils/di';
import {
  FieldUnitMeasurementCreateCommand,
  FieldUnitMeasurementDeleteCommand,
  FieldUnitMeasurementGetAllCommand,
  FieldUnitMeasurementGetCommand,
  FieldUnitMeasurementUpdateCommand,
  FieldVariantsForSelectorFieldTypeGetAllCommand,
} from '../../../libs/contracts';
import { FieldUnitMeasurementEntity } from './entities/field-unit-measurement.entity';
import { EntityName } from '../../common/types/entity.enum';
import { ILogger } from '../../common/types/main/logger.interface';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { EUserTypeVariants } from '@prisma/client';
import { WorkspaceCreatorGuard } from '../../common/guards/workspace-creator.guard';
import { WorkspaceMembersGuard } from '../../common/guards/workspace-members.guard';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { okResponseHandler } from '../../common/helpers/handlers/ok-response.handler';
import { errorResponseHandler } from '../../common/helpers/handlers/error-response.handler';
import { IQueryParams, QueryParams } from '../../common/decorators/query-params.decorator';

@ApiTags('Работа с FieldUnitMeasurement')
@Controller('/workspace/:workspaceId/handbook/:handbookId/field-unit-measurement')
export class FieldUnitMeasurementController implements IFieldUnitMeasurementController {
  constructor(
    @Inject(KFI.FIELD_UNIT_MEASUREMENT_SERVICE)
    private readonly fieldUnitMeasurementService: IFieldUnitMeasurementService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldUnitMeasurementGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение FieldUnitMeasurement по id' })
  @ApiResponse({ status: 200, type: FieldUnitMeasurementGetResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(FieldUnitMeasurementGetResponseDto)
  @Get('/:fieldUnitMeasurementId')
  async getByIdEP(
    @Param('fieldUnitMeasurementId', ParseUUIDPipe)
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldUnitMeasurementGetResponseDto> {
    try {
      const { ok, data } = await this.fieldUnitMeasurementService.getById(fieldUnitMeasurementId);
      return okResponseHandler(ok, data, FieldUnitMeasurementEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_UNIT_MEASUREMENT, urlParams);
    }
  }

  //region SWAGGER
  @ApiQuery({
    schema: zodToOpenAPI(FieldVariantsForSelectorFieldTypeGetAllCommand.RequestQuerySchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldUnitMeasurementGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получить все FieldUnitMeasurement в Workspace',
  })
  @ApiResponse({ status: 200, type: [FieldUnitMeasurementGetAllResponseDto] })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(FieldUnitMeasurementGetAllResponseDto)
  @Get()
  async getAllEP(
    @UrlParams() urlParams: IUrlParams,
    @QueryParams() queryParams?: IQueryParams,
  ): Promise<FieldUnitMeasurementGetAllResponseDto> {
    try {
      const { ok, data } = await this.fieldUnitMeasurementService.getAll(queryParams);
      return okResponseHandler(ok, data, FieldUnitMeasurementEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_UNIT_MEASUREMENT, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(FieldUnitMeasurementCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldUnitMeasurementCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание FieldUnitMeasurement' })
  @ApiResponse({ status: 201, type: FieldUnitMeasurementCreateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(FieldUnitMeasurementCreateResponseDto)
  @Post()
  async createEP(
    @Body() dto: FieldUnitMeasurementCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @Param('handbookId', ParseUUIDPipe)
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<FieldUnitMeasurementCreateResponseDto> {
    // в create нужно передать id пользователя, для которого создается field-unit-measurement
    try {
      const { ok, data } = await this.fieldUnitMeasurementService.create(dto, handbookId);
      return okResponseHandler(ok, data, FieldUnitMeasurementEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_UNIT_MEASUREMENT, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(FieldUnitMeasurementUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldUnitMeasurementUpdateCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Изменение FieldUnitMeasurement по id FieldUnitMeasurement',
  })
  @ApiResponse({ status: 200, type: FieldUnitMeasurementUpdateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(FieldUnitMeasurementUpdateResponseDto)
  @Put('/:fieldUnitMeasurementId')
  async updateByIdEP(
    @Param('fieldUnitMeasurementId', ParseUUIDPipe)
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: FieldUnitMeasurementUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldUnitMeasurementUpdateResponseDto> {
    try {
      const { ok, data } = await this.fieldUnitMeasurementService.updateById(fieldUnitMeasurementId, dto);
      return okResponseHandler(ok, data, FieldUnitMeasurementEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_UNIT_MEASUREMENT, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldUnitMeasurementDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Удаление FieldUnitMeasurement внутри Workspace менеджера по id FieldUnitMeasurement',
  })
  @ApiResponse({ status: 200, type: FieldUnitMeasurementDeleteResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(FieldUnitMeasurementDeleteResponseDto)
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @Delete('/:fieldUnitMeasurementId')
  async deleteByIdEP(
    @Param('fieldUnitMeasurementId', ParseUUIDPipe)
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldUnitMeasurementDeleteResponseDto> {
    try {
      const { ok, data } = await this.fieldUnitMeasurementService.deleteById(fieldUnitMeasurementId);
      return okResponseHandler(ok, data, FieldUnitMeasurementEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_UNIT_MEASUREMENT, urlParams);
    }
  }
}
