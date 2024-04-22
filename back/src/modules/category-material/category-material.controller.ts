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
import { CategoryMaterialGetResponseDto } from './dto/controller/get-category-material.dto';
import {
  CategoryMaterialCreateRequestDto,
  CategoryMaterialCreateResponseDto,
} from './dto/controller/create-category-material.dto';
import { CategoryMaterialGetAllResponseDto } from './dto/controller/get-all-category-materials.dto';
import {
  CategoryMaterialUpdateRequestDto,
  CategoryMaterialUpdateResponseDto,
} from './dto/controller/update-category-material.dto';
import { CategoryMaterialDeleteResponseDto } from './dto/controller/delete-category-material.dto';
import { ICategoryMaterialController } from './types/category-material.controller.interface';
import { ICategoryMaterialService } from './types/category-material.service.interface';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import {
  CategoryMaterialCreateCommand,
  CategoryMaterialDeleteCommand,
  CategoryMaterialGetAllCommand,
  CategoryMaterialGetCommand,
  CategoryMaterialUpdateCommand,
} from '../../../libs/contracts';
import { CategoryMaterialEntity } from './entities/category-material.entity';
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

@ApiTags('Работа с CategoryMaterial')
@Controller('/global-category/:globalCategoryId/category-material')
export class CategoryMaterialController implements ICategoryMaterialController {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_HANDBOOK_SERVICE)
    private readonly categoryMaterialService: ICategoryMaterialService,
    @Inject(KEYS_FOR_INJECTION.I_LOGGER) private readonly logger: ILogger,
  ) {}

  @ApiOkResponse({
    schema: zodToOpenAPI(CategoryMaterialGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение CategoryMaterial по id' })
  @ApiResponse({ status: 200, type: CategoryMaterialGetResponseDto })
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(CategoryMaterialGetResponseDto)
  @Get('/:categoryMaterialId')
  async getByIdEP(
    @Param('categoryMaterialId', ParseUUIDPipe)
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<CategoryMaterialGetResponseDto> {
    try {
      const responseData =
        await this.categoryMaterialService.getById(categoryMaterialId);
      if (responseData.ok) {
        return new ExternalResponse<CategoryMaterialEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.CATEGORY_MATERIAL,
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
    schema: zodToOpenAPI(CategoryMaterialGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary:
      'Получить все CategoryMaterial пользователей (менеджеров Workspace)',
  })
  @ApiResponse({ status: 200, type: [CategoryMaterialGetAllResponseDto] })
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(CategoryMaterialGetAllResponseDto)
  @Get()
  async getAllEP(
    @UrlParams() urlParams: IUrlParams,
  ): Promise<CategoryMaterialGetAllResponseDto> {
    try {
      const responseData = await this.categoryMaterialService.getAll();
      if (responseData.ok) {
        return new ExternalResponse<CategoryMaterialEntity[]>(
          responseData.data,
        );
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.CATEGORY_MATERIAL,
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
    schema: zodToOpenAPI(CategoryMaterialCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(CategoryMaterialCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание CategoryMaterial' })
  @ApiResponse({ status: 201, type: CategoryMaterialCreateResponseDto })
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(CategoryMaterialCreateResponseDto)
  @Post()
  async createEP(
    @Body() dto: CategoryMaterialCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @User() userInfoFromJWT: IJWTPayload,
  ): Promise<CategoryMaterialCreateResponseDto> {
    // в create нужно передать id пользователя, для которого создается category-material
    try {
      const responseData = await this.categoryMaterialService.create(
        dto,
        userInfoFromJWT.uuid,
      );
      if (responseData.ok) {
        return new ExternalResponse<CategoryMaterialEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.CATEGORY_MATERIAL,
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
    schema: zodToOpenAPI(CategoryMaterialUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(CategoryMaterialUpdateCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Изменение CategoryMaterial пользователя по id CategoryMaterial',
  })
  @ApiResponse({ status: 200, type: CategoryMaterialUpdateResponseDto })
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(CategoryMaterialUpdateResponseDto)
  @Put('/:categoryMaterialId')
  async updateByIdEP(
    @Param('categoryMaterialId', ParseUUIDPipe)
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: CategoryMaterialUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<CategoryMaterialUpdateResponseDto> {
    try {
      const responseData = await this.categoryMaterialService.updateById(
        categoryMaterialId,
        dto,
      );
      if (responseData.ok) {
        return new ExternalResponse<CategoryMaterialEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.CATEGORY_MATERIAL,
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
    schema: zodToOpenAPI(CategoryMaterialDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary:
      'Удаление CategoryMaterial внутри Workspace менеджера по id CategoryMaterial',
  })
  @ApiResponse({ status: 200, type: CategoryMaterialDeleteResponseDto })
  @ZodSerializerDto(CategoryMaterialDeleteResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Delete('/:categoryMaterialId')
  async deleteByIdEP(
    @Param('categoryMaterialId', ParseUUIDPipe)
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<CategoryMaterialDeleteResponseDto> {
    try {
      const responseData =
        await this.categoryMaterialService.deleteById(categoryMaterialId);
      if (responseData.ok) {
        return new ExternalResponse<CategoryMaterialEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.CATEGORY_MATERIAL,
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
