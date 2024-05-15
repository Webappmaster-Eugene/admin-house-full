import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
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
import { KFI } from '../../common/utils/di';
import {
  GlobalCategoryMaterialCreateCommand,
  GlobalCategoryMaterialDeleteCommand,
  GlobalCategoryMaterialGetAllCommand,
  GlobalCategoryMaterialGetCommand,
  GlobalCategoryMaterialUpdateCommand,
} from '../../../libs/contracts';
import { GlobalCategoryMaterialEntity } from './entities/global-category-material.entity';
import { EntityName } from '../../common/types/entity.enum';
import { ILogger } from '../../common/types/main/logger.interface';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { EUserTypeVariants } from '@prisma/client';
import { GlobalCategoryMaterialGetResponseDto } from './dto/controller/get-global-category-material.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { okResponseHandler } from '../../common/helpers/handlers/ok-response.handler';
import { errorResponseHandler } from '../../common/helpers/handlers/error-response.handler';

@ApiTags('Работа с GlobalCategory')
@Controller('global-category-material')
export class GlobalCategoryMaterialController implements IGlobalCategoryMaterialController {
  constructor(
    @Inject(KFI.GLOBAL_CATEGORY_MATERIAL_SERVICE)
    private readonly globalCategoryMaterialService: IGlobalCategoryMaterialService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(GlobalCategoryMaterialGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение GlobalCategoryMaterial по id' })
  @ApiResponse({ status: 200, type: GlobalCategoryMaterialGetResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(GlobalCategoryMaterialGetResponseDto)
  @UseGuards(AuthGuard)
  @Get('/:globalCategoryMaterialId')
  async getByIdEP(
    @Param('globalCategoryMaterialId', ParseUUIDPipe)
    globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<GlobalCategoryMaterialGetResponseDto> {
    try {
      const { ok, data } = await this.globalCategoryMaterialService.getById(globalCategoryMaterialId);
      return okResponseHandler(ok, data, GlobalCategoryMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.GLOBAL_CATEGORY_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiQuery({
    schema: zodToOpenAPI(GlobalCategoryMaterialGetAllCommand.RequestQuerySchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(GlobalCategoryMaterialGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получить все GlobalCategory приложения',
  })
  @ApiResponse({ status: 200, type: [GlobalCategoryMaterialGetAllResponseDto] })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(GlobalCategoryMaterialGetAllResponseDto)
  @UseGuards(AuthGuard)
  @Get()
  async getAllEP(@UrlParams() urlParams: IUrlParams): Promise<GlobalCategoryMaterialGetAllResponseDto> {
    try {
      const { ok, data } = await this.globalCategoryMaterialService.getAll();
      return okResponseHandler(ok, data, GlobalCategoryMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.GLOBAL_CATEGORY_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(GlobalCategoryMaterialCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(GlobalCategoryMaterialCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание GlobalCategoryMaterial' })
  @ApiResponse({ status: 201, type: GlobalCategoryMaterialCreateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(GlobalCategoryMaterialCreateResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Post()
  async createEP(
    @Body() dto: GlobalCategoryMaterialCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<GlobalCategoryMaterialCreateResponseDto> {
    try {
      const { ok, data } = await this.globalCategoryMaterialService.create(dto);
      return okResponseHandler(ok, data, GlobalCategoryMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.GLOBAL_CATEGORY_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(GlobalCategoryMaterialUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(GlobalCategoryMaterialUpdateCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Изменение GlobalCategoryMaterial пользователя по id GlobalCategoryMaterial',
  })
  @ApiResponse({ status: 200, type: GlobalCategoryMaterialUpdateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
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
      const { ok, data } = await this.globalCategoryMaterialService.updateById(globalCategoryMaterialId, dto);
      return okResponseHandler(ok, data, GlobalCategoryMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.GLOBAL_CATEGORY_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(GlobalCategoryMaterialDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Удаление GlobalCategoryMaterial по id GlobalCategoryMaterial',
  })
  @ApiResponse({ status: 200, type: GlobalCategoryMaterialDeleteResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
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
      const { ok, data } = await this.globalCategoryMaterialService.deleteById(globalCategoryMaterialId);
      return okResponseHandler(ok, data, GlobalCategoryMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.GLOBAL_CATEGORY_MATERIAL, urlParams);
    }
  }
}
