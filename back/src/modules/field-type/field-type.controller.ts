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
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import {
  FieldTypeCreateCommand,
  FieldTypeDeleteCommand,
  FieldTypeGetAllCommand,
  FieldTypeGetCommand,
  FieldTypeUpdateCommand,
} from '../../../libs/contracts';
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
import { FieldTypeDeleteResponseDto } from './dto/controller/delete-field-type.dto';
import { FieldVariantsForSelectorFieldTypeCreateResponseDto } from '../field-variants-for-selector-field-type/dto/controller/create-field-variants-for-selector-field-type.dto';
import { FieldTypeGetResponseDto } from './dto/controller/get-field-type.dto';
import { FieldTypeEntity } from './entities/field-type.entity';
import { FieldTypeGetAllResponseDto } from './dto/controller/get-all-field-types.dto';
import {
  FieldTypeCreateRequestDto,
  FieldTypeCreateResponseDto,
} from './dto/controller/create-field-type.dto';
import {
  FieldTypeUpdateRequestDto,
  FieldTypeUpdateResponseDto,
} from './dto/controller/update-field-type.dto';
import { IFieldTypeController } from './types/field-type.controller.interface';
import { IFieldTypeService } from './types/field-type.service.interface';

@ApiTags('Работа с TypeField')
@Controller('/field-type')
export class TypeFieldController implements IFieldTypeController {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_FIELD_TYPE_SERVICE)
    private readonly fieldTypeService: IFieldTypeService,
    @Inject(KEYS_FOR_INJECTION.I_LOGGER) private readonly logger: ILogger,
  ) {}

  @ApiOkResponse({
    schema: zodToOpenAPI(FieldTypeGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение FieldType по id' })
  @ApiResponse({ status: 200, type: FieldTypeGetResponseDto })
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(FieldTypeGetResponseDto)
  @Get('/:fieldTypeId')
  async getByIdEP(
    @Param('fieldTypeId', ParseUUIDPipe)
    fieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldTypeGetResponseDto> {
    try {
      const responseData = await this.fieldTypeService.getById(fieldTypeId);
      if (responseData.ok) {
        return new ExternalResponse<FieldTypeEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.FIELD_TYPE,
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
    schema: zodToOpenAPI(FieldTypeGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получить все TypeField',
  })
  @ApiResponse({ status: 200, type: [FieldTypeGetAllResponseDto] })
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(FieldTypeGetAllResponseDto)
  @Get()
  async getAllEP(
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldTypeGetAllResponseDto> {
    try {
      const responseData = await this.fieldTypeService.getAll();
      if (responseData.ok) {
        return new ExternalResponse<FieldTypeEntity[]>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.FIELD_TYPE,
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
    schema: zodToOpenAPI(FieldTypeCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldTypeCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание FieldType' })
  @ApiResponse({ status: 201, type: FieldTypeCreateResponseDto })
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(FieldTypeCreateResponseDto)
  @Post()
  async createEP(
    @Body() dto: FieldTypeCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @User() userInfoFromJWT: IJWTPayload,
  ): Promise<FieldVariantsForSelectorFieldTypeCreateResponseDto> {
    // в create нужно передать id пользователя, для которого создается field-type
    try {
      const responseData = await this.fieldTypeService.create(
        dto,
        userInfoFromJWT.uuid,
      );
      if (responseData.ok) {
        return new ExternalResponse<FieldTypeEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.FIELD_TYPE,
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
    schema: zodToOpenAPI(FieldTypeUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldTypeUpdateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменение TypeField по id TypeField' })
  @ApiResponse({ status: 200, type: FieldTypeUpdateResponseDto })
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(FieldTypeUpdateResponseDto)
  @Put('/:fieldTypeId')
  async updateByIdEP(
    @Param('fieldTypeId', ParseUUIDPipe)
    fieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: FieldTypeUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldTypeUpdateResponseDto> {
    try {
      const responseData = await this.fieldTypeService.updateById(
        fieldTypeId,
        dto,
      );
      if (responseData.ok) {
        return new ExternalResponse<FieldTypeEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.FIELD_TYPE,
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
    schema: zodToOpenAPI(FieldTypeDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Удаление FieldType по id FieldType',
  })
  @ApiResponse({ status: 200, type: FieldTypeDeleteResponseDto })
  @ZodSerializerDto(FieldTypeDeleteResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Delete('/:fieldTypeId')
  async deleteByIdEP(
    @Param('fieldTypeId', ParseUUIDPipe)
    fieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldTypeDeleteResponseDto> {
    try {
      const responseData = await this.fieldTypeService.deleteById(fieldTypeId);
      if (responseData.ok) {
        return new ExternalResponse<FieldTypeEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.FIELD_TYPE,
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
