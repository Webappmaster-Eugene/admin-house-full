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
import { FieldVariantsForSelectorFieldTypeGetResponseDto } from './dto/controller/get-field-variants-for-selector-field-type.dto';
import {
  FieldVariantsForSelectorFieldTypeCreateRequestDto,
  FieldVariantsForSelectorFieldTypeCreateResponseDto,
} from './dto/controller/create-field-variants-for-selector-field-type.dto';
import { FieldVariantsForSelectorFieldTypeGetAllResponseDto } from './dto/controller/get-all-field-variants-for-selector-field-type.dto';
import {
  FieldVariantsForSelectorFieldTypeUpdateRequestDto,
  FieldVariantsForSelectorFieldTypeUpdateResponseDto,
} from './dto/controller/update-field-variants-for-selector-field-type.dto';
import { FieldVariantsForSelectorFieldTypeDeleteResponseDto } from './dto/controller/delete-field-variants-for-selector-field-type.dto';
import { IFieldVariantsForSelectorFieldTypeController } from './types/field-variants-for-selector-field-type.controller.interface';
import { IFieldVariantsForSelectorFieldTypeService } from './types/field-variants-for-selector-field-type.service.interface';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import {
  FieldVariantsForSelectorFieldTypeCreateCommand,
  FieldVariantsForSelectorFieldTypeDeleteCommand,
  FieldVariantsForSelectorFieldTypeGetAllCommand,
  FieldVariantsForSelectorFieldTypeGetCommand,
  FieldVariantsForSelectorFieldTypeUpdateCommand,
} from '../../../libs/contracts';
import { FieldVariantsForSelectorFieldTypeEntity } from './entities/field-variants-for-selector-field-type.entity';
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

@ApiTags('Работа с FieldVariantsForSelectorFieldType пользователей')
@Controller('/workspace/:workspaceId/field-variants-for-selector-field-type')
export class FieldVariantsForSelectorFieldTypeController
  implements IFieldVariantsForSelectorFieldTypeController
{
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_SERVICE)
    private readonly fieldVariantsForSelectorFieldTypeService: IFieldVariantsForSelectorFieldTypeService,
    @Inject(KEYS_FOR_INJECTION.I_LOGGER) private readonly logger: ILogger,
  ) {}

  @ApiOkResponse({
    schema: zodToOpenAPI(
      FieldVariantsForSelectorFieldTypeGetCommand.ResponseSchema,
    ),
  })
  @ApiOperation({
    summary: 'Получение FieldVariantsForSelectorFieldType по id',
  })
  @ApiResponse({
    status: 200,
    type: FieldVariantsForSelectorFieldTypeGetResponseDto,
  })
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(FieldVariantsForSelectorFieldTypeGetResponseDto)
  @Get('/:fieldVariantsForSelectorFieldTypeId')
  async getByIdEP(
    @Param('fieldVariantsForSelectorFieldTypeId', ParseUUIDPipe)
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldVariantsForSelectorFieldTypeGetResponseDto> {
    try {
      const responseData =
        await this.fieldVariantsForSelectorFieldTypeService.getById(
          fieldVariantsForSelectorFieldTypeId,
        );
      if (responseData.ok) {
        return new ExternalResponse<FieldVariantsForSelectorFieldTypeEntity>(
          responseData.data,
        );
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.HANDBOOK,
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
    schema: zodToOpenAPI(
      FieldVariantsForSelectorFieldTypeGetAllCommand.ResponseSchema,
    ),
  })
  @ApiOperation({
    summary:
      'Получить все FieldVariantsForSelectorFieldType пользователей (менеджеров Workspace)',
  })
  @ApiResponse({
    status: 200,
    type: [FieldVariantsForSelectorFieldTypeGetAllResponseDto],
  })
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(FieldVariantsForSelectorFieldTypeGetAllResponseDto)
  @Get()
  async getAllEP(
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldVariantsForSelectorFieldTypeGetAllResponseDto> {
    try {
      const responseData =
        await this.fieldVariantsForSelectorFieldTypeService.getAll();
      if (responseData.ok) {
        return new ExternalResponse<FieldVariantsForSelectorFieldTypeEntity[]>(
          responseData.data,
        );
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.HANDBOOK,
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
    schema: zodToOpenAPI(
      FieldVariantsForSelectorFieldTypeCreateCommand.RequestSchema,
    ),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(
      FieldVariantsForSelectorFieldTypeCreateCommand.ResponseSchema,
    ),
  })
  @ApiOperation({ summary: 'Создание FieldVariantsForSelectorFieldType' })
  @ApiResponse({
    status: 201,
    type: FieldVariantsForSelectorFieldTypeCreateResponseDto,
  })
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(FieldVariantsForSelectorFieldTypeCreateResponseDto)
  @Post()
  async createEP(
    @Body() dto: FieldVariantsForSelectorFieldTypeCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @User() userInfoFromJWT: IJWTPayload,
  ): Promise<FieldVariantsForSelectorFieldTypeCreateResponseDto> {
    try {
      const responseData =
        await this.fieldVariantsForSelectorFieldTypeService.create(
          dto,
          userInfoFromJWT.uuid,
        );
      if (responseData.ok) {
        return new ExternalResponse<FieldVariantsForSelectorFieldTypeEntity>(
          responseData.data,
        );
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE,
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
    schema: zodToOpenAPI(
      FieldVariantsForSelectorFieldTypeUpdateCommand.RequestSchema,
    ),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(
      FieldVariantsForSelectorFieldTypeUpdateCommand.ResponseSchema,
    ),
  })
  @ApiOperation({
    summary:
      'Изменение FieldVariantsForSelectorFieldType пользователя по id FieldVariantsForSelectorFieldType',
  })
  @ApiResponse({
    status: 200,
    type: FieldVariantsForSelectorFieldTypeUpdateResponseDto,
  })
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(FieldVariantsForSelectorFieldTypeUpdateResponseDto)
  @Put('/:fieldVariantsForSelectorFieldTypeId')
  async updateByIdEP(
    @Param('fieldVariantsForSelectorFieldTypeId', ParseUUIDPipe)
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: FieldVariantsForSelectorFieldTypeUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldVariantsForSelectorFieldTypeUpdateResponseDto> {
    try {
      const responseData =
        await this.fieldVariantsForSelectorFieldTypeService.updateById(
          fieldVariantsForSelectorFieldTypeId,
          dto,
        );
      if (responseData.ok) {
        return new ExternalResponse<FieldVariantsForSelectorFieldTypeEntity>(
          responseData.data,
        );
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE,
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
    schema: zodToOpenAPI(
      FieldVariantsForSelectorFieldTypeDeleteCommand.ResponseSchema,
    ),
  })
  @ApiOperation({
    summary:
      'Удаление FieldVariantsForSelectorFieldType внутри Workspace менеджера по id FieldVariantsForSelectorFieldType',
  })
  @ApiResponse({
    status: 200,
    type: FieldVariantsForSelectorFieldTypeDeleteResponseDto,
  })
  @ZodSerializerDto(FieldVariantsForSelectorFieldTypeDeleteResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Delete('/:fieldVariantsForSelectorFieldTypeId')
  async deleteByIdEP(
    @Param('fieldVariantsForSelectorFieldTypeId', ParseUUIDPipe)
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldVariantsForSelectorFieldTypeDeleteResponseDto> {
    try {
      const responseData =
        await this.fieldVariantsForSelectorFieldTypeService.deleteById(
          fieldVariantsForSelectorFieldTypeId,
        );
      if (responseData.ok) {
        return new ExternalResponse<FieldVariantsForSelectorFieldTypeEntity>(
          responseData.data,
        );
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE,
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
