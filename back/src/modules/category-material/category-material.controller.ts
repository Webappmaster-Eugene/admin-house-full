import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { CategoryMaterialGetResponseDto } from './dto/controller/get-category-material.dto';
import { CategoryMaterialCreateRequestDto, CategoryMaterialCreateResponseDto } from './dto/controller/create-category-material.dto';
import { CategoryMaterialGetAllResponseDto } from './dto/controller/get-all-category-materials.dto';
import { CategoryMaterialUpdateRequestDto, CategoryMaterialUpdateResponseDto } from './dto/controller/update-category-material.dto';
import { CategoryMaterialDeleteResponseDto } from './dto/controller/delete-category-material.dto';
import { ICategoryMaterialController } from './types/category-material.controller.interface';
import { ICategoryMaterialService } from './types/category-material.service.interface';
import { KFI } from '../../common/utils/di';
import {
  CategoryMaterialCreateCommand,
  CategoryMaterialDeleteCommand,
  CategoryMaterialGetAllCommand,
  CategoryMaterialGetCommand,
  CategoryMaterialUpdateCommand,
  FieldVariantsForSelectorFieldTypeGetAllCommand,
} from '@numart/house-admin-contracts';
import { CategoryMaterialEntity } from './entities/category-material.entity';
import { EntityName } from '../../common/types/entity.enum';
import { ILogger } from '../../common/types/main/logger.interface';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { WorkspaceMembersGuard } from '../../common/guards/workspace-members.guard';
import { EUserTypeVariants } from '.prisma/client';
import { WorkspaceCreatorGuard } from '../../common/guards/workspace-creator.guard';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { okResponseHandler } from '../../common/helpers/handlers/ok-response.handler';
import { errorResponseHandler } from '../../common/helpers/handlers/error-response.handler';
import { IQueryParams, QueryParams } from '../../common/decorators/query-params.decorator';

@ApiTags('Работа с CategoryMaterial')
@Controller('workspace/:workspaceId/handbook/:handbookId/category-material')
export class CategoryMaterialController implements ICategoryMaterialController {
  constructor(
    @Inject(KFI.CATEGORY_MATERIAL_SERVICE)
    private readonly categoryMaterialService: ICategoryMaterialService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(CategoryMaterialGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение CategoryMaterial по id' })
  @ApiResponse({ status: 200, type: CategoryMaterialGetResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(CategoryMaterialGetResponseDto)
  @Get('/:categoryMaterialId')
  async getByIdEP(
    @Param('categoryMaterialId', ParseUUIDPipe)
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<CategoryMaterialGetResponseDto> {
    try {
      const { ok, data } = await this.categoryMaterialService.getById(categoryMaterialId);
      return okResponseHandler(ok, data, CategoryMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.CATEGORY_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiQuery({
    schema: zodToOpenAPI(FieldVariantsForSelectorFieldTypeGetAllCommand.RequestQuerySchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(CategoryMaterialGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получить все CategoryMaterial',
  })
  @ApiResponse({ status: 200, type: [CategoryMaterialGetAllResponseDto] })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(CategoryMaterialGetAllResponseDto)
  @Get()
  async getAllEP(
    @UrlParams() urlParams: IUrlParams,
    @QueryParams() queryParams?: IQueryParams,
  ): Promise<CategoryMaterialGetAllResponseDto> {
    try {
      const { ok, data } = await this.categoryMaterialService.getAll(queryParams);
      return okResponseHandler(ok, data, CategoryMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.CATEGORY_MATERIAL, urlParams);
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
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(CategoryMaterialCreateResponseDto)
  @Post()
  async createEP(
    @Body() dto: CategoryMaterialCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @User() userInfoFromJWT: IJWTPayload,
    @Param('handbookId', ParseUUIDPipe) handbookId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<CategoryMaterialCreateResponseDto> {
    try {
      const { ok, data } = await this.categoryMaterialService.create(dto, handbookId);
      return okResponseHandler(ok, data, CategoryMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.CATEGORY_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(CategoryMaterialUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(CategoryMaterialUpdateCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Изменение CategoryMaterial по id CategoryMaterial',
  })
  @ApiResponse({ status: 200, type: CategoryMaterialUpdateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
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
      const { ok, data } = await this.categoryMaterialService.updateById(categoryMaterialId, dto);
      return okResponseHandler(ok, data, CategoryMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.CATEGORY_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(CategoryMaterialDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Удаление CategoryMaterial внутри Workspace менеджера по id CategoryMaterial',
  })
  @ApiResponse({ status: 200, type: CategoryMaterialDeleteResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(CategoryMaterialDeleteResponseDto)
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @Delete('/:categoryMaterialId')
  async deleteByIdEP(
    @Param('categoryMaterialId', ParseUUIDPipe)
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<CategoryMaterialDeleteResponseDto> {
    try {
      const { ok, data } = await this.categoryMaterialService.deleteById(categoryMaterialId);
      return okResponseHandler(ok, data, CategoryMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.CATEGORY_MATERIAL, urlParams);
    }
  }
}
