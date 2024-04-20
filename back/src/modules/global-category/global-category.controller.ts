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
import { zodToOpenAPI } from 'nestjs-zod';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { ExternalResponse } from '../../common/types/responses/universal-external-response.interface';
import { GlobalCategoryGetResponseDto } from './dto/controller/get-global-category.dto';
import {
  GlobalCategoryCreateRequestDto,
  GlobalCategoryCreateResponseDto,
} from './dto/controller/create-global-category.dto';
import { GlobalCategoryGetAllResponseDto } from './dto/controller/get-all-global-categorys.dto';
import {
  GlobalCategoryUpdateRequestDto,
  GlobalCategoryUpdateResponseDto,
} from './dto/controller/update-global-category.dto';
import { GlobalCategoryDeleteResponseDto } from './dto/controller/delete-global-category.dto';
import { IGlobalCategoryController } from './types/global-category.controller.interface';
import { IGlobalCategoryService } from './types/global-category.service.interface';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import {
  GlobalCategoryCreateCommand,
  GlobalCategoryDeleteCommand,
  GlobalCategoryGetAllCommand,
  GlobalCategoryGetCommand,
  GlobalCategoryUpdateCommand,
} from '../../../libs/contracts';
import { GlobalCategoryEntity } from './entities/global-category.entity';
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

@ApiTags('Работа с GlobalCategory')
@Controller('global-category')
export class GlobalCategoryController implements IGlobalCategoryController {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_GLOBAL_CATEGORY_SERVICE)
    private readonly appInfoService: IGlobalCategoryService,
    @Inject(KEYS_FOR_INJECTION.I_LOGGER) private readonly logger: ILogger,
  ) {}

  @ApiOkResponse({
    schema: zodToOpenAPI(GlobalCategoryGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение GlobalCategory по id' })
  @ApiResponse({ status: 200, type: GlobalCategoryGetResponseDto })
  @UseGuards(AuthGuard)
  @Get('/:globalCategoryId')
  async getByIdEP(
    @Param('globalCategoryId', ParseUUIDPipe)
    globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<GlobalCategoryGetResponseDto> {
    try {
      const responseData = await this.appInfoService.getById(globalCategoryId);
      if (responseData.ok) {
        return new ExternalResponse<GlobalCategoryEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.ROLE,
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
    schema: zodToOpenAPI(GlobalCategoryGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получить все GlobalCategory приложения',
  })
  @ApiResponse({ status: 200, type: [GlobalCategoryGetAllResponseDto] })
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Get()
  async getAllEP(
    @UrlParams() urlParams: IUrlParams,
  ): Promise<GlobalCategoryGetAllResponseDto> {
    try {
      const responseData = await this.appInfoService.getAll();
      if (responseData.ok) {
        return new ExternalResponse<GlobalCategoryEntity[]>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.ROLE,
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
    schema: zodToOpenAPI(GlobalCategoryCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(GlobalCategoryCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание GlobalCategory' })
  @ApiResponse({ status: 201, type: GlobalCategoryCreateResponseDto })
  @UseGuards(AuthGuard)
  @Post()
  async createEP(
    @Body() dto: GlobalCategoryCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<GlobalCategoryCreateResponseDto> {
    try {
      const responseData = await this.appInfoService.create(dto);
      if (responseData.ok) {
        return new ExternalResponse<GlobalCategoryEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.ROLE,
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
    schema: zodToOpenAPI(GlobalCategoryUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(GlobalCategoryUpdateCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Изменение GlobalCategory пользователя по id GlobalCategory',
  })
  @ApiResponse({ status: 200, type: GlobalCategoryUpdateResponseDto })
  @RolesSetting('MANAGER')
  @UseGuards(AuthGuard)
  @Put('/:globalCategoryId')
  async updateByIdEP(
    @Param('globalCategoryId', ParseUUIDPipe)
    globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: GlobalCategoryUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<GlobalCategoryUpdateResponseDto> {
    try {
      const responseData = await this.appInfoService.updateById(
        globalCategoryId,
        dto,
      );
      if (responseData.ok) {
        return new ExternalResponse<GlobalCategoryEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.ROLE,
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
    schema: zodToOpenAPI(GlobalCategoryDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Удаление GlobalCategory пользователя по id GlobalCategory',
  })
  @ApiResponse({ status: 200, type: GlobalCategoryDeleteResponseDto })
  @Delete('/:globalCategoryId')
  async deleteByIdEP(
    @Param('globalCategoryId', ParseUUIDPipe)
    globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<GlobalCategoryDeleteResponseDto> {
    try {
      const responseData =
        await this.appInfoService.deleteById(globalCategoryId);
      if (responseData.ok) {
        return new ExternalResponse<GlobalCategoryEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.ROLE,
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
