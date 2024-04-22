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
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { ExternalResponse } from '../../common/types/responses/universal-external-response.interface';
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
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import {
  FieldUnitMeasurementCreateCommand,
  FieldUnitMeasurementDeleteCommand,
  FieldUnitMeasurementGetAllCommand,
  FieldUnitMeasurementGetCommand,
  FieldUnitMeasurementUpdateCommand,
} from '../../../libs/contracts';
import { FieldUnitMeasurementEntity } from './entities/field-unit-measurement.entity';
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

@ApiTags('Работа с FieldUnitMeasurement')
@Controller('/field-unit-measurement')
export class FieldUnitMeasurementController
  implements IFieldUnitMeasurementController
{
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_FIELD_UNIT_MEASUREMENT_SERVICE)
    private readonly fieldUnitMeasurementService: IFieldUnitMeasurementService,
    @Inject(KEYS_FOR_INJECTION.I_LOGGER) private readonly logger: ILogger,
  ) {}

  @ApiOkResponse({
    schema: zodToOpenAPI(FieldUnitMeasurementGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение FieldUnitMeasurement по id' })
  @ApiResponse({ status: 200, type: FieldUnitMeasurementGetResponseDto })
  @UseGuards(AuthGuard)
  @ZodSerializerDto(FieldUnitMeasurementGetResponseDto)
  @Get('/:fieldUnitMeasurementId')
  async getByIdEP(
    @Param('fieldUnitMeasurementId', ParseUUIDPipe)
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldUnitMeasurementGetResponseDto> {
    try {
      const responseData = await this.fieldUnitMeasurementService.getById(
        fieldUnitMeasurementId,
      );
      if (responseData.ok) {
        return new ExternalResponse<FieldUnitMeasurementEntity>(
          responseData.data,
        );
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.FIELD_UNIT_MEASUREMENT,
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
    schema: zodToOpenAPI(FieldUnitMeasurementGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary:
      'Получить все FieldUnitMeasurement пользователей (менеджеров Workspace)',
  })
  @ApiResponse({ status: 200, type: [FieldUnitMeasurementGetAllResponseDto] })
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(FieldUnitMeasurementGetAllResponseDto)
  @Get()
  async getAllEP(
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldUnitMeasurementGetAllResponseDto> {
    try {
      const responseData = await this.fieldUnitMeasurementService.getAll();
      if (responseData.ok) {
        return new ExternalResponse<FieldUnitMeasurementEntity[]>(
          responseData.data,
        );
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.FIELD_UNIT_MEASUREMENT,
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
    schema: zodToOpenAPI(FieldUnitMeasurementCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldUnitMeasurementCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание FieldUnitMeasurement' })
  @ApiResponse({ status: 201, type: FieldUnitMeasurementCreateResponseDto })
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(FieldUnitMeasurementCreateResponseDto)
  @Post()
  async createEP(
    @Body() dto: FieldUnitMeasurementCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @User() userInfoFromJWT: IJWTPayload,
  ): Promise<FieldUnitMeasurementCreateResponseDto> {
    // в create нужно передать id пользователя, для которого создается field-unit-measurement
    try {
      const responseData = await this.fieldUnitMeasurementService.create(
        dto,
        userInfoFromJWT.uuid,
      );
      if (responseData.ok) {
        return new ExternalResponse<FieldUnitMeasurementEntity>(
          responseData.data,
        );
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.FIELD_UNIT_MEASUREMENT,
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
    schema: zodToOpenAPI(FieldUnitMeasurementUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldUnitMeasurementUpdateCommand.ResponseSchema),
  })
  @ApiOperation({
    summary:
      'Изменение FieldUnitMeasurement пользователя по id FieldUnitMeasurement',
  })
  @ApiResponse({ status: 200, type: FieldUnitMeasurementUpdateResponseDto })
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(FieldUnitMeasurementUpdateResponseDto)
  @Put('/:field-unit-measurementId')
  async updateByIdEP(
    @Param('field-unit-measurementId', ParseUUIDPipe)
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: FieldUnitMeasurementUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldUnitMeasurementUpdateResponseDto> {
    try {
      const responseData = await this.fieldUnitMeasurementService.updateById(
        fieldUnitMeasurementId,
        dto,
      );
      if (responseData.ok) {
        return new ExternalResponse<FieldUnitMeasurementEntity>(
          responseData.data,
        );
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.FIELD_UNIT_MEASUREMENT,
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
    schema: zodToOpenAPI(FieldUnitMeasurementDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary:
      'Удаление FieldUnitMeasurement внутри Workspace менеджера по id FieldUnitMeasurement',
  })
  @ApiResponse({ status: 200, type: FieldUnitMeasurementDeleteResponseDto })
  @ZodSerializerDto(FieldUnitMeasurementDeleteResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Delete('/:fieldUnitMeasurementId')
  async deleteByIdEP(
    @Param('fieldUnitMeasurementId', ParseUUIDPipe)
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldUnitMeasurementDeleteResponseDto> {
    try {
      const responseData = await this.fieldUnitMeasurementService.deleteById(
        fieldUnitMeasurementId,
      );
      if (responseData.ok) {
        return new ExternalResponse<FieldUnitMeasurementEntity>(
          responseData.data,
        );
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.FIELD_UNIT_MEASUREMENT,
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
