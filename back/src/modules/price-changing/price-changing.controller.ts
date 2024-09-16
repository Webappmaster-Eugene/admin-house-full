import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { PriceChangingGetResponseDto } from './dto/controller/get-price-changing.dto';
import { PriceChangingCreateRequestDto, PriceChangingCreateResponseDto } from './dto/controller/create-price-changing.dto';
import { PriceChangingGetAllResponseDto } from './dto/controller/get-all-price-changings.dto';
import { PriceChangingUpdateRequestDto, PriceChangingUpdateResponseDto } from './dto/controller/update-price-changing.dto';
import { PriceChangingDeleteResponseDto } from './dto/controller/delete-price-changing.dto';
import { IPriceChangingController } from './types/price-changing.controller.interface';
import { IPriceChangingService } from './types/price-changing.service.interface';
import { KFI } from '../../common/utils/di';
import {
  EntityUrlParamCommand,
  PriceChangingCreateCommand,
  PriceChangingDeleteCommand,
  PriceChangingGetAllCommand,
  PriceChangingGetCommand,
  PriceChangingUpdateCommand,
} from 'libs/contracts';
import { PriceChangingEntity } from './entities/price-changing.entity';
import { EntityName } from '../../common/types/entity.enum';
import { ILogger } from '../../common/types/main/logger.interface';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { WorkspaceMembersGuard } from '../../common/guards/workspace-members.guard';
import { EUserTypeVariants } from '.prisma/client';
import { WorkspaceCreatorGuard } from '../../common/guards/workspace-creator.guard';
import { okResponseHandler } from '../../common/helpers/handlers/ok-response.handler';
import { errorResponseHandler } from '../../common/helpers/handlers/error-response.handler';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { IQueryParams, QueryParams } from '../../common/decorators/query-params.decorator';

@ApiTags('Работа с PriceChanging')
@Controller('price-changing')
export class PriceChangingController implements IPriceChangingController {
  constructor(
    @Inject(KFI.PRICE_CHANGING_SERVICE)
    private readonly priceChangingService: IPriceChangingService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  // @ApiOkResponse({
  //   schema: zodToOpenAPI(PriceChangingGetCommand.ResponseSchema),
  // })
  @ApiOperation({ summary: 'Получение PriceChanging по id' })
  @ApiResponse({ status: 200, type: PriceChangingGetResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(PriceChangingGetResponseDto)
  @Get(
    'workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId/price-changing/:priceChangingId',
  )
  async getByIdEP(
    @Param('priceChangingId', ParseUUIDPipe)
    priceChangingId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<PriceChangingGetResponseDto> {
    try {
      const { ok, data } = await this.priceChangingService.getById(priceChangingId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.PRICE_CHANGING, urlParams);
    }
  }

  //region SWAGGER
  // @ApiQuery({
  //   schema: zodToOpenAPI(PriceChangingGetAllCommand.RequestQuerySchema),
  // })
  // @ApiOkResponse({
  //   schema: zodToOpenAPI(PriceChangingGetAllCommand.ResponseSchema),
  // })
  @ApiOperation({
    summary: 'Получить все PriceChanging',
  })
  @ApiResponse({ status: 200, type: [PriceChangingGetAllResponseDto] })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(PriceChangingGetAllResponseDto)
  @Get()
  async getAllEP(@UrlParams() urlParams: IUrlParams, @QueryParams() queryParams?: IQueryParams): Promise<PriceChangingGetAllResponseDto> {
    try {
      const { ok, data } = await this.priceChangingService.getAll(queryParams);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.PRICE_CHANGING, urlParams);
    }
  }

  //region SWAGGER
  // @ApiQuery({
  //   schema: zodToOpenAPI(PriceChangingGetAllCommand.RequestQuerySchema),
  // })
  // @ApiOkResponse({
  //   schema: zodToOpenAPI(PriceChangingGetAllCommand.ResponseSchema),
  // })
  @ApiOperation({
    summary: 'Получить все PriceChanging внутри Handbook',
  })
  @ApiResponse({ status: 200, type: [PriceChangingGetAllResponseDto] })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(PriceChangingGetAllResponseDto)
  @Get('workspace/:workspaceId/handbook/:handbookId/get-all-in-handbook')
  async getAllInHandbookEP(
    @UrlParams() urlParams: IUrlParams,
    @Param('handbookId', ParseUUIDPipe)
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    @QueryParams() queryParams?: IQueryParams,
  ): Promise<PriceChangingGetAllResponseDto> {
    try {
      const { ok, data } = await this.priceChangingService.getAllInHandbook(handbookId, queryParams);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.PRICE_CHANGING, urlParams);
    }
  }

  //region SWAGGER
  // @ApiQuery({
  //   schema: zodToOpenAPI(PriceChangingGetAllCommand.RequestQuerySchema),
  // })
  // @ApiOkResponse({
  //   schema: zodToOpenAPI(PriceChangingGetAllCommand.ResponseSchema),
  // })
  @ApiOperation({
    summary: 'Получить все PriceChanging внутри CategoryMaterial',
  })
  @ApiResponse({ status: 200, type: [PriceChangingGetAllResponseDto] })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(PriceChangingGetAllResponseDto)
  @Get('workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/get-all-in-category-material')
  async getAllInCategoryMaterialEP(
    @UrlParams() urlParams: IUrlParams,
    @Param('categoryMaterialId', ParseUUIDPipe)
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @QueryParams() queryParams?: IQueryParams,
  ): Promise<PriceChangingGetAllResponseDto> {
    try {
      const { ok, data } = await this.priceChangingService.getAllInCategoryMaterial(categoryMaterialId, queryParams);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.PRICE_CHANGING, urlParams);
    }
  }

  //region SWAGGER
  // @ApiQuery({
  //   schema: zodToOpenAPI(PriceChangingGetAllCommand.RequestQuerySchema),
  // })
  // @ApiOkResponse({
  //   schema: zodToOpenAPI(PriceChangingGetAllCommand.ResponseSchema),
  // })
  @ApiOperation({
    summary: 'Получить все PriceChanging внутри Material',
  })
  @ApiResponse({ status: 200, type: [PriceChangingGetAllResponseDto] })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(PriceChangingGetAllResponseDto)
  @Get('workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId/get-all-in-material')
  async getAllInMaterialEP(
    @UrlParams() urlParams: IUrlParams,
    @Param('materialId', ParseUUIDPipe)
    materialId: EntityUrlParamCommand.RequestUuidParam,
    @QueryParams() queryParams?: IQueryParams,
  ): Promise<PriceChangingGetAllResponseDto> {
    try {
      const { ok, data } = await this.priceChangingService.getAllInMaterial(materialId, queryParams);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.PRICE_CHANGING, urlParams);
    }
  }

  //region SWAGGER
  // @ApiBody({
  //   schema: zodToOpenAPI(PriceChangingCreateCommand.RequestSchema),
  // })
  // @ApiOkResponse({
  //   schema: zodToOpenAPI(PriceChangingCreateCommand.ResponseSchema),
  // })
  @ApiOperation({ summary: 'Создание PriceChanging' })
  @ApiResponse({ status: 201, type: PriceChangingCreateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(PriceChangingCreateResponseDto)
  @Post('workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId')
  async createEP(
    @Body() dto: PriceChangingCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    userInfoFromJWT: IJWTPayload,
    materialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<PriceChangingCreateResponseDto> {
    try {
      const { ok, data } = await this.priceChangingService.create(dto, userInfoFromJWT.uuid, materialId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.PRICE_CHANGING, urlParams);
    }
  }

  //region SWAGGER
  // @ApiBody({
  //   schema: zodToOpenAPI(PriceChangingUpdateCommand.RequestSchema),
  // })
  // @ApiOkResponse({
  //   schema: zodToOpenAPI(PriceChangingUpdateCommand.ResponseSchema),
  // })
  @ApiOperation({
    summary: 'Изменение PriceChanging пользователя по id PriceChanging',
  })
  @ApiResponse({ status: 200, type: PriceChangingUpdateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(PriceChangingUpdateResponseDto)
  @Put(
    'workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId/price-changing/:priceChangingId',
  )
  async updateByIdEP(
    @Param('priceChangingId', ParseUUIDPipe)
    priceChangingId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: PriceChangingUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<PriceChangingUpdateResponseDto> {
    try {
      const { ok, data } = await this.priceChangingService.updateById(priceChangingId, dto);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.PRICE_CHANGING, urlParams);
    }
  }

  //region SWAGGER
  // @ApiOkResponse({
  //   schema: zodToOpenAPI(PriceChangingDeleteCommand.ResponseSchema),
  // })
  @ApiOperation({
    summary: 'Удаление PriceChanging внутри Workspace менеджера по id PriceChanging',
  })
  @ApiResponse({ status: 200, type: PriceChangingDeleteResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(PriceChangingDeleteResponseDto)
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @Delete(
    'workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId/price-changing/:priceChangingId',
  )
  async deleteByIdEP(
    @Param('priceChangingId', ParseUUIDPipe)
    priceChangingId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<PriceChangingDeleteResponseDto> {
    try {
      const { ok, data } = await this.priceChangingService.deleteById(priceChangingId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.PRICE_CHANGING, urlParams);
    }
  }
}
