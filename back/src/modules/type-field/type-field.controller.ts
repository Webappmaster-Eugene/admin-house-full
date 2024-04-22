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
import { TypeFieldGetResponseDto } from './dto/controller/get-type-field.dto';
import {
  TypeFieldCreateRequestDto,
  TypeFieldCreateResponseDto,
} from './dto/controller/create-type-field.dto';
import { TypeFieldGetAllResponseDto } from './dto/controller/get-all-type-fields.dto';
import {
  TypeFieldUpdateRequestDto,
  TypeFieldUpdateResponseDto,
} from './dto/controller/update-type-field.dto';
import { TypeFieldDeleteResponseDto } from './dto/controller/delete-type-field.dto';
import { ITypeFieldController } from './types/type-field.controller.interface';
import { ITypeFieldService } from './types/type-field.service.interface';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import {
  TypeFieldCreateCommand,
  TypeFieldDeleteCommand,
  TypeFieldGetAllCommand,
  TypeFieldGetCommand,
  TypeFieldUpdateCommand,
} from '../../../libs/contracts';
import { TypeFieldEntity } from './entities/type-field.entity';
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

@ApiTags('Работа с TypeField')
@Controller('/type-field')
export class TypeFieldController implements ITypeFieldController {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_TYPE_FIELD_SERVICE)
    private readonly typeFieldService: ITypeFieldService,
    @Inject(KEYS_FOR_INJECTION.I_LOGGER) private readonly logger: ILogger,
  ) {}

  @ApiOkResponse({
    schema: zodToOpenAPI(TypeFieldGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение TypeField по id' })
  @ApiResponse({ status: 200, type: TypeFieldGetResponseDto })
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(TypeFieldGetResponseDto)
  @Get('/:typeField')
  async getByIdEP(
    @Param('typeFieldId', ParseUUIDPipe)
    typeFieldId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<TypeFieldGetResponseDto> {
    try {
      const responseData = await this.typeFieldService.getById(typeFieldId);
      if (responseData.ok) {
        return new ExternalResponse<TypeFieldEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.TYPE_FIELD,
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
    schema: zodToOpenAPI(TypeFieldGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получить все TypeField',
  })
  @ApiResponse({ status: 200, type: [TypeFieldGetAllResponseDto] })
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(TypeFieldGetAllResponseDto)
  @Get()
  async getAllEP(
    @UrlParams() urlParams: IUrlParams,
  ): Promise<TypeFieldGetAllResponseDto> {
    try {
      const responseData = await this.typeFieldService.getAll();
      if (responseData.ok) {
        return new ExternalResponse<TypeFieldEntity[]>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.TYPE_FIELD,
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
    schema: zodToOpenAPI(TypeFieldCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(TypeFieldCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание TypeField' })
  @ApiResponse({ status: 201, type: TypeFieldCreateResponseDto })
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(TypeFieldCreateResponseDto)
  @Post()
  async createEP(
    @Body() dto: TypeFieldCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @User() userInfoFromJWT: IJWTPayload,
  ): Promise<TypeFieldCreateResponseDto> {
    // в create нужно передать id пользователя, для которого создается type-field
    try {
      const responseData = await this.typeFieldService.create(
        dto,
        userInfoFromJWT.uuid,
      );
      if (responseData.ok) {
        return new ExternalResponse<TypeFieldEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.TYPE_FIELD,
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
    schema: zodToOpenAPI(TypeFieldUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(TypeFieldUpdateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменение TypeField по id TypeField' })
  @ApiResponse({ status: 200, type: TypeFieldUpdateResponseDto })
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(TypeFieldUpdateResponseDto)
  @Put('/:typeFieldId')
  async updateByIdEP(
    @Param('typeFieldId', ParseUUIDPipe)
    typeFieldId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: TypeFieldUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<TypeFieldUpdateResponseDto> {
    try {
      const responseData = await this.typeFieldService.updateById(
        typeFieldId,
        dto,
      );
      if (responseData.ok) {
        return new ExternalResponse<TypeFieldEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.TYPE_FIELD,
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
    schema: zodToOpenAPI(TypeFieldDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Удаление TypeField по id TypeField',
  })
  @ApiResponse({ status: 200, type: TypeFieldDeleteResponseDto })
  @ZodSerializerDto(TypeFieldDeleteResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Delete('/:typeFieldId')
  async deleteByIdEP(
    @Param('typeFieldId', ParseUUIDPipe)
    typeFieldId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<TypeFieldDeleteResponseDto> {
    try {
      const responseData = await this.typeFieldService.deleteById(typeFieldId);
      if (responseData.ok) {
        return new ExternalResponse<TypeFieldEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.TYPE_FIELD,
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
