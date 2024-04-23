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
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { ExternalResponse } from '../../common/types/responses/universal-external-response.interface';
import {
  GlobalCategoryMaterialCreateRequestDto,
  GlobalCategoryMaterialCreateResponseDto,
} from './dto/controller/create-global-category-material.dto';
import { GlobalCategoryMaterialGetAllResponseDto } from './dto/controller/get-all-global-category-materials.dto';
import {
  GlobalCategoryMaterialUpdateRequestDto,
  GlobalCategoryMaterialUpdateResponseDto,
} from './dto/controller/update-global-category-material.dto';
import { GlobalCategoryMaterialDeleteResponseDto } from './dto/controller/delete-global-category-material.dto';
import { IGlobalCategoryMaterialController } from './types/global-category-material.controller.interface';
import { IGlobalCategoryMaterialService } from './types/global-category-material.service.interface';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import {
  GlobalCategoryMaterialCreateCommand,
  GlobalCategoryMaterialDeleteCommand,
  GlobalCategoryMaterialGetAllCommand,
  GlobalCategoryMaterialGetCommand,
  GlobalCategoryMaterialUpdateCommand,
} from '../../../libs/contracts';
import { GlobalCategoryMaterialEntity } from './entities/global-category-material.entity';
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
import { EUserTypeVariants } from '@prisma/client';
import { GlobalCategoryMaterialGetResponseDto } from './dto/controller/get-global-category-material.dto';

@ApiTags('Работа с GlobalCategory')
@Controller('global-category-material')
export class GlobalCategoryMaterialController
  implements IGlobalCategoryMaterialController
{
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_GLOBAL_CATEGORY_MATERIAL_SERVICE)
    private readonly globalCategoryMaterialService: IGlobalCategoryMaterialService,
    @Inject(KEYS_FOR_INJECTION.I_LOGGER) private readonly logger: ILogger,
  ) {}

  @ApiOkResponse({
    schema: zodToOpenAPI(GlobalCategoryMaterialGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение GlobalCategoryMaterial по id' })
  @ApiResponse({ status: 200, type: GlobalCategoryMaterialGetResponseDto })
  @ZodSerializerDto(GlobalCategoryMaterialGetResponseDto)
  @UseGuards(AuthGuard)
  @Get('/:globalCategoryMaterialId')
  async getByIdEP(
    @Param('globalCategoryMaterialId', ParseUUIDPipe)
    globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<GlobalCategoryMaterialGetResponseDto> {
    console.log(1);
    try {
      const responseData = await this.globalCategoryMaterialService.getById(
        globalCategoryMaterialId,
      );
      console.log(responseData);
      if (responseData.ok) {
        return new ExternalResponse<GlobalCategoryMaterialEntity>(
          responseData.data,
        );
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.GLOBAL_CATEGORY_MATERIAL,
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
    schema: zodToOpenAPI(GlobalCategoryMaterialGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получить все GlobalCategory приложения',
  })
  @ApiResponse({ status: 200, type: [GlobalCategoryMaterialGetAllResponseDto] })
  @ZodSerializerDto(GlobalCategoryMaterialGetAllResponseDto)
  @UseGuards(AuthGuard)
  @Get()
  async getAllEP(
    @UrlParams() urlParams: IUrlParams,
  ): Promise<GlobalCategoryMaterialGetAllResponseDto> {
    try {
      const responseData = await this.globalCategoryMaterialService.getAll();
      if (responseData.ok) {
        return new ExternalResponse<GlobalCategoryMaterialEntity[]>(
          responseData.data,
        );
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.GLOBAL_CATEGORY_MATERIAL,
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
    schema: zodToOpenAPI(GlobalCategoryMaterialCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(GlobalCategoryMaterialCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание GlobalCategoryMaterial' })
  @ApiResponse({ status: 201, type: GlobalCategoryMaterialCreateResponseDto })
  @ZodSerializerDto(GlobalCategoryMaterialCreateResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Post()
  async createEP(
    @Body() dto: GlobalCategoryMaterialCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<GlobalCategoryMaterialCreateResponseDto> {
    try {
      const responseData = await this.globalCategoryMaterialService.create(dto);
      if (responseData.ok) {
        return new ExternalResponse<GlobalCategoryMaterialEntity>(
          responseData.data,
        );
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.GLOBAL_CATEGORY_MATERIAL,
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
    schema: zodToOpenAPI(GlobalCategoryMaterialUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(GlobalCategoryMaterialUpdateCommand.ResponseSchema),
  })
  @ApiOperation({
    summary:
      'Изменение GlobalCategoryMaterial пользователя по id GlobalCategoryMaterial',
  })
  @ApiResponse({ status: 200, type: GlobalCategoryMaterialUpdateResponseDto })
  @ZodSerializerDto(GlobalCategoryMaterialUpdateResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Put('/:globalCategoryMaterialId')
  async updateByIdEP(
    @Param('globalCategoryMaterialId', ParseUUIDPipe)
    globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: GlobalCategoryMaterialUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<GlobalCategoryMaterialUpdateResponseDto> {
    try {
      const responseData = await this.globalCategoryMaterialService.updateById(
        globalCategoryMaterialId,
        dto,
      );
      if (responseData.ok) {
        return new ExternalResponse<GlobalCategoryMaterialEntity>(
          responseData.data,
        );
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.GLOBAL_CATEGORY_MATERIAL,
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
    schema: zodToOpenAPI(GlobalCategoryMaterialDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary:
      'Удаление GlobalCategoryMaterial пользователя по id GlobalCategoryMaterial',
  })
  @ApiResponse({ status: 200, type: GlobalCategoryMaterialDeleteResponseDto })
  @ZodSerializerDto(GlobalCategoryMaterialDeleteResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Delete('/:globalCategoryMaterialId')
  async deleteByIdEP(
    @Param('globalCategoryMaterialId', ParseUUIDPipe)
    globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<GlobalCategoryMaterialDeleteResponseDto> {
    try {
      const responseData = await this.globalCategoryMaterialService.deleteById(
        globalCategoryMaterialId,
      );
      if (responseData.ok) {
        return new ExternalResponse<GlobalCategoryMaterialEntity>(
          responseData.data,
        );
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.GLOBAL_CATEGORY_MATERIAL,
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
