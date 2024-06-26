import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { KFI } from '../../common/utils/di';
import {
  FieldOfCategoryMaterialCreateCommand,
  FieldOfCategoryMaterialDeleteCommand,
  FieldOfCategoryMaterialGetAllCommand,
  FieldOfCategoryMaterialGetCommand,
  FieldOfCategoryMaterialUpdateCommand,
} from '@numart/house-admin-contracts';
import { EntityName } from '../../common/types/entity.enum';
import { ILogger } from '../../common/types/main/logger.interface';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { WorkspaceMembersGuard } from '../../common/guards/workspace-members.guard';
import { EUserTypeVariants } from '.prisma/client';
import { FieldOfCategoryMaterialDeleteResponseDto } from './dto/controller/delete-field-of-category-material.dto';
import { FieldOfCategoryMaterialGetResponseDto } from './dto/controller/get-field-of-category-material.dto';
import { FieldOfCategoryMaterialEntity } from './entities/field-of-category-material.entity';
import { FieldOfCategoryMaterialGetAllResponseDto } from './dto/controller/get-all-field-of-category-materials.dto';
import {
  FieldOfCategoryMaterialCreateRequestDto,
  FieldOfCategoryMaterialCreateResponseDto,
} from './dto/controller/create-field-of-category-material.dto';
import {
  FieldOfCategoryMaterialUpdateRequestDto,
  FieldOfCategoryMaterialUpdateResponseDto,
} from './dto/controller/update-field-of-category-material.dto';
import { IFieldOfCategoryMaterialController } from './types/field-of-category-material.controller.interface';
import { IFieldOfCategoryMaterialService } from './types/field-of-category-material.service.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { okResponseHandler } from '../../common/helpers/handlers/ok-response.handler';
import { errorResponseHandler } from '../../common/helpers/handlers/error-response.handler';
import { IQueryParams, QueryParams } from '../../common/decorators/query-params.decorator';

@ApiTags('Работа с FieldOfCategoryMaterial')
@Controller('field-of-category-material')
export class FieldOfCategoryMaterialController implements IFieldOfCategoryMaterialController {
  constructor(
    @Inject(KFI.FIELD_OF_CATEGORY_MATERIAL_SERVICE)
    private readonly fieldOfCategoryMaterialService: IFieldOfCategoryMaterialService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldOfCategoryMaterialGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение FieldOfCategoryMaterial по id' })
  @ApiResponse({ status: 200, type: FieldOfCategoryMaterialGetResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(FieldOfCategoryMaterialGetResponseDto)
  @Get(
    'workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/field-of-category-material/:fieldOfCategoryMaterialId',
  )
  async getByIdEP(
    @Param('fieldOfCategoryMaterialId', ParseUUIDPipe)
    fieldOfCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldOfCategoryMaterialGetResponseDto> {
    try {
      const { ok, data } = await this.fieldOfCategoryMaterialService.getById(fieldOfCategoryMaterialId);
      return okResponseHandler(ok, data, FieldOfCategoryMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_OF_CATEGORY_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiQuery({
    schema: zodToOpenAPI(FieldOfCategoryMaterialGetAllCommand.RequestQuerySchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldOfCategoryMaterialGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получить все FieldOfCategoryMaterial',
  })
  @ApiResponse({ status: 200, type: [FieldOfCategoryMaterialGetAllResponseDto] })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(FieldOfCategoryMaterialGetAllResponseDto)
  @Get()
  async getAllEP(
    @UrlParams() urlParams: IUrlParams,
    @QueryParams() queryParams?: IQueryParams,
  ): Promise<FieldOfCategoryMaterialGetAllResponseDto> {
    try {
      const { ok, data } = await this.fieldOfCategoryMaterialService.getAll(queryParams);
      return okResponseHandler(ok, data, FieldOfCategoryMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_OF_CATEGORY_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiQuery({
    schema: zodToOpenAPI(FieldOfCategoryMaterialGetAllCommand.RequestQuerySchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldOfCategoryMaterialGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получить все FieldOfCategoryMaterial внутри Handbook',
  })
  @ApiResponse({ status: 200, type: [FieldOfCategoryMaterialGetAllResponseDto] })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(FieldOfCategoryMaterialGetAllResponseDto)
  @Get('workspace/:workspaceId/handbook/:handbookId/get-all-in-handbook')
  async getAllInHandbookEP(
    @UrlParams() urlParams: IUrlParams,
    @Param('handbookId', ParseUUIDPipe)
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    @QueryParams() queryParams?: IQueryParams,
  ): Promise<FieldOfCategoryMaterialGetAllResponseDto> {
    try {
      const { ok, data } = await this.fieldOfCategoryMaterialService.getAllInHandbook(handbookId, queryParams);
      return okResponseHandler(ok, data, FieldOfCategoryMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_OF_CATEGORY_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiQuery({
    schema: zodToOpenAPI(FieldOfCategoryMaterialGetAllCommand.RequestQuerySchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldOfCategoryMaterialGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получить все FieldOfCategoryMaterial внутри FieldOfCategoryMaterial',
  })
  @ApiResponse({ status: 200, type: [FieldOfCategoryMaterialGetAllResponseDto] })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(FieldOfCategoryMaterialGetAllResponseDto)
  @Get('workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/get-all-in-category-material')
  async getAllInCategoryMaterialEP(
    @UrlParams() urlParams: IUrlParams,
    @Param('сategoryMaterialId', ParseUUIDPipe)
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @QueryParams() queryParams?: IQueryParams,
  ): Promise<FieldOfCategoryMaterialGetAllResponseDto> {
    try {
      const { ok, data } = await this.fieldOfCategoryMaterialService.getAllInCategoryMaterial(categoryMaterialId, queryParams);
      return okResponseHandler(ok, data, FieldOfCategoryMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_OF_CATEGORY_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(FieldOfCategoryMaterialCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldOfCategoryMaterialCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание FieldOfCategoryMaterial' })
  @ApiBearerAuth('access-token')
  //endregion
  @ApiResponse({ status: 201, type: FieldOfCategoryMaterialCreateResponseDto })
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(FieldOfCategoryMaterialCreateResponseDto)
  @Post('workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId')
  async createEP(
    @Body() dto: FieldOfCategoryMaterialCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @Param('handbookId', ParseUUIDPipe)
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    @Param('categoryMaterialId', ParseUUIDPipe)
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @User() userInfoFromJWT: IJWTPayload,
  ): Promise<FieldOfCategoryMaterialCreateResponseDto> {
    try {
      const { ok, data } = await this.fieldOfCategoryMaterialService.create(dto, handbookId, categoryMaterialId, userInfoFromJWT.uuid);
      return okResponseHandler(ok, data, FieldOfCategoryMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_OF_CATEGORY_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(FieldOfCategoryMaterialUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldOfCategoryMaterialUpdateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменение FieldOfCategoryMaterial по id FieldOfCategoryMaterial' })
  @ApiResponse({ status: 200, type: FieldOfCategoryMaterialUpdateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(FieldOfCategoryMaterialUpdateResponseDto)
  @Put(
    'workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/field-of-category-material/:fieldOfCategoryMaterialId',
  )
  async updateByIdEP(
    @Param('fieldOfCategoryMaterialId', ParseUUIDPipe)
    fieldOfCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: FieldOfCategoryMaterialUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldOfCategoryMaterialUpdateResponseDto> {
    try {
      const { ok, data } = await this.fieldOfCategoryMaterialService.updateById(fieldOfCategoryMaterialId, dto);
      return okResponseHandler(ok, data, FieldOfCategoryMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_OF_CATEGORY_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldOfCategoryMaterialDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Удаление FieldOfCategoryMaterial по id FieldOfCategoryMaterial',
  })
  @ApiResponse({ status: 200, type: FieldOfCategoryMaterialDeleteResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(FieldOfCategoryMaterialDeleteResponseDto)
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @Delete(
    'workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/field-of-category-material/:fieldOfCategoryMaterialId',
  )
  async deleteByIdEP(
    @Param('fieldOfCategoryMaterialId', ParseUUIDPipe)
    fieldOfCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldOfCategoryMaterialDeleteResponseDto> {
    try {
      const { ok, data } = await this.fieldOfCategoryMaterialService.deleteById(fieldOfCategoryMaterialId);
      return okResponseHandler(ok, data, FieldOfCategoryMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_OF_CATEGORY_MATERIAL, urlParams);
    }
  }
}
