import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
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
  PriceChangingCreateCommand,
  PriceChangingDeleteCommand,
  PriceChangingGetAllCommand,
  PriceChangingGetCommand,
  PriceChangingUpdateCommand,
} from '@numart/house-admin-contracts';
import { PriceChangingEntity } from './entities/price-changing.entity';
import { EntityName } from '../../common/types/entity.enum';
import { ILogger } from '../../common/types/main/logger.interface';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { WorkspaceMembersGuard } from '../../common/guards/workspace-members.guard';
import { EUserTypeVariants } from '@prisma/client';
import { WorkspaceCreatorGuard } from '../../common/guards/workspace-creator.guard';
import { okResponseHandler } from '../../common/helpers/handlers/ok-response.handler';
import { errorResponseHandler } from '../../common/helpers/handlers/error-response.handler';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@ApiTags('Работа с PriceChanging')
@Controller('workspace/:workspaceId/handbook/:handbookId/material/:materialId/price-changing')
export class PriceChangingController implements IPriceChangingController {
  constructor(
    @Inject(KFI.PRICE_CHANGING_SERVICE)
    private readonly priceChangingService: IPriceChangingService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(PriceChangingGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение PriceChanging по id' })
  @ApiResponse({ status: 200, type: PriceChangingGetResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(PriceChangingGetResponseDto)
  @Get('/:priceChangingId')
  async getByIdEP(
    @Param('priceChangingId', ParseUUIDPipe)
    priceChangingId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<PriceChangingGetResponseDto> {
    try {
      const { ok, data } = await this.priceChangingService.getById(priceChangingId);
      return okResponseHandler(ok, data, PriceChangingEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.PRICE_CHANGING, urlParams);
    }
  }

  //region SWAGGER
  @ApiQuery({
    schema: zodToOpenAPI(PriceChangingGetAllCommand.RequestQuerySchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(PriceChangingGetAllCommand.ResponseSchema),
  })
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
  async getAllEP(@UrlParams() urlParams: IUrlParams): Promise<PriceChangingGetAllResponseDto> {
    try {
      const { ok, data } = await this.priceChangingService.getAll();
      return okResponseHandler(ok, data, PriceChangingEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.PRICE_CHANGING, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(PriceChangingCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(PriceChangingCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание PriceChanging' })
  @ApiResponse({ status: 201, type: PriceChangingCreateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(PriceChangingCreateResponseDto)
  @Post()
  async createEP(
    @Body() dto: PriceChangingCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    userInfoFromJWT: IJWTPayload,
    materialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<PriceChangingCreateResponseDto> {
    try {
      const { ok, data } = await this.priceChangingService.create(dto, userInfoFromJWT.uuid, materialId);
      return okResponseHandler(ok, data, PriceChangingEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.PRICE_CHANGING, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(PriceChangingUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(PriceChangingUpdateCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Изменение PriceChanging пользователя по id PriceChanging',
  })
  @ApiResponse({ status: 200, type: PriceChangingUpdateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(PriceChangingUpdateResponseDto)
  @Put('/:priceChangingId')
  async updateByIdEP(
    @Param('priceChangingId', ParseUUIDPipe)
    priceChangingId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: PriceChangingUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<PriceChangingUpdateResponseDto> {
    try {
      const { ok, data } = await this.priceChangingService.updateById(priceChangingId, dto);
      return okResponseHandler(ok, data, PriceChangingEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.PRICE_CHANGING, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(PriceChangingDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Удаление PriceChanging внутри Workspace менеджера по id PriceChanging',
  })
  @ApiResponse({ status: 200, type: PriceChangingDeleteResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(PriceChangingDeleteResponseDto)
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @Delete('/:priceChangingId')
  async deleteByIdEP(
    @Param('priceChangingId', ParseUUIDPipe)
    priceChangingId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<PriceChangingDeleteResponseDto> {
    try {
      const { ok, data } = await this.priceChangingService.deleteById(priceChangingId);
      return okResponseHandler(ok, data, PriceChangingEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.PRICE_CHANGING, urlParams);
    }
  }
}