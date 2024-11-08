import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { CategoryMaterialGetResponseDto } from './dto/controller/get-category-material.dto';
import { CategoryMaterialCreateRequestDto, CategoryMaterialCreateResponseDto } from './dto/controller/create-category-material.dto';
import { CategoryMaterialGetAllResponseDto } from './dto/controller/get-all-category-materials.dto';
import { CategoryMaterialUpdateRequestDto, CategoryMaterialUpdateResponseDto } from './dto/controller/update-category-material.dto';
import { CategoryMaterialDeleteResponseDto } from './dto/controller/delete-category-material.dto';
import { ICategoryMaterialController } from './types/category-material.controller.interface';
import { ICategoryMaterialService } from './types/category-material.service.interface';
import { KFI } from '../../common/utils/di';
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
import { EntityUrlParamCommand } from 'libs/contracts';
import {
  CategoryMaterialDeleteManyRequestDto,
  CategoryMaterialDeleteManyResponseDto,
} from 'src/modules/category-material/dto/controller/delete-many-category-material.dto';

@ApiTags('Работа с CategoryMaterial')
@Controller('category-material')
export class CategoryMaterialController implements ICategoryMaterialController {
  constructor(
    @Inject(KFI.CATEGORY_MATERIAL_SERVICE)
    private readonly categoryMaterialService: ICategoryMaterialService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  // @ApiOkResponse({
  //   schema: zodToOpenAPI(CategoryMaterialGetCommand.ResponseSchema),
  // })
  @ApiOperation({ summary: 'Получение CategoryMaterial по id' })
  @ApiResponse({ status: 200, type: CategoryMaterialGetResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(CategoryMaterialGetResponseDto)
  @Get('workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId')
  async getByIdEP(
    @Param('categoryMaterialId', ParseUUIDPipe)
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<CategoryMaterialGetResponseDto> {
    try {
      const { ok, data } = await this.categoryMaterialService.getById(categoryMaterialId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.CATEGORY_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  // @ApiQuery({
  //   schema: zodToOpenAPI(FieldVariantsForSelectorFieldTypeGetAllCommand.RequestQuerySchema),
  // })
  // @ApiOkResponse({
  //   schema: zodToOpenAPI(CategoryMaterialGetAllCommand.ResponseSchema),
  // })
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
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.CATEGORY_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  // @ApiQuery({
  //   schema: zodToOpenAPI(FieldVariantsForSelectorFieldTypeGetAllCommand.RequestQuerySchema),
  // })
  // @ApiOkResponse({
  //   schema: zodToOpenAPI(CategoryMaterialGetAllCommand.ResponseSchema),
  // })
  @ApiOperation({
    summary: 'Получить все CategoryMaterial в Handbook',
  })
  @ApiResponse({ status: 200, type: [CategoryMaterialGetAllResponseDto] })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(CategoryMaterialGetAllResponseDto)
  @Get('workspace/:workspaceId/handbook/:handbookId/get-all-in-handbook')
  async getAllInHandbookEP(
    @UrlParams() urlParams: IUrlParams,
    @Param('handbookId', ParseUUIDPipe)
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    @QueryParams() queryParams?: IQueryParams,
  ): Promise<CategoryMaterialGetAllResponseDto> {
    try {
      const { ok, data } = await this.categoryMaterialService.getAllInHandbook(handbookId, queryParams);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.CATEGORY_MATERIAL, urlParams);
    }
  }

  // @ApiBody({
  //   schema: zodToOpenAPI(CategoryMaterialCreateCommand.RequestSchema),
  // })
  // @ApiOkResponse({
  //   schema: zodToOpenAPI(CategoryMaterialCreateCommand.ResponseSchema),
  // })
  @ApiOperation({ summary: 'Создание CategoryMaterial' })
  @ApiResponse({ status: 201, type: CategoryMaterialCreateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(CategoryMaterialCreateResponseDto)
  @Post('workspace/:workspaceId/handbook/:handbookId')
  async createEP(
    @Body() dto: CategoryMaterialCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @User() userInfoFromJWT: IJWTPayload,
    @Param('handbookId', ParseUUIDPipe) handbookId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<CategoryMaterialCreateResponseDto> {
    try {
      const { ok, data } = await this.categoryMaterialService.create(dto, handbookId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      console.log('createEP category Controller' + JSON.stringify(error));
      errorResponseHandler(this.logger, error, EntityName.CATEGORY_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  // @ApiBody({
  //   schema: zodToOpenAPI(CategoryMaterialUpdateCommand.RequestSchema),
  // })
  // @ApiOkResponse({
  //   schema: zodToOpenAPI(CategoryMaterialUpdateCommand.ResponseSchema),
  // })
  @ApiOperation({
    summary: 'Изменение CategoryMaterial по id CategoryMaterial',
  })
  @ApiResponse({ status: 200, type: CategoryMaterialUpdateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(CategoryMaterialUpdateResponseDto)
  @Put('workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId')
  async updateByIdEP(
    @Param('categoryMaterialId', ParseUUIDPipe)
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: CategoryMaterialUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<CategoryMaterialUpdateResponseDto> {
    try {
      const { ok, data } = await this.categoryMaterialService.updateById(categoryMaterialId, dto);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.CATEGORY_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  // @ApiOkResponse({
  //   schema: zodToOpenAPI(CategoryMaterialDeleteCommand.ResponseSchema),
  // })
  @ApiOperation({
    summary: 'Удаление CategoryMaterial внутри Workspace менеджера по id CategoryMaterial',
  })
  @ApiResponse({ status: 200, type: CategoryMaterialDeleteResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(CategoryMaterialDeleteResponseDto)
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @Delete('workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId')
  async deleteByIdEP(
    @Param('categoryMaterialId', ParseUUIDPipe)
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
    @Param('handbookId', ParseUUIDPipe)
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<CategoryMaterialDeleteResponseDto> {
    try {
      const { ok, data } = await this.categoryMaterialService.deleteById(handbookId, categoryMaterialId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.CATEGORY_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  // @ApiOkResponse({
  //   schema: zodToOpenAPI(CategoryMaterialGetAllDeleteCommand.ResponseSchema),
  // })
  @ApiOperation({
    summary: 'Удаление нескольких CategoryMaterial внутри Workspace менеджера по их id внутри body',
  })
  @ApiResponse({ status: 200, type: CategoryMaterialDeleteManyResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(CategoryMaterialDeleteManyResponseDto)
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @Post('batch/workspace/:workspaceId/handbook/:handbookId')
  async deleteManyByIdsEP(
    @Body() dto: CategoryMaterialDeleteManyRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @Param('handbookId', ParseUUIDPipe)
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<CategoryMaterialDeleteManyResponseDto> {
    try {
      const { ok, data } = await this.categoryMaterialService.deleteManyByIds(handbookId, dto);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.CATEGORY_MATERIAL, urlParams);
    }
  }
}
