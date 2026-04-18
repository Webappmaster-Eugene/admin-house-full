import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import {
  ConstructionPieCreateCommand,
  ConstructionPieDeleteCommand,
  ConstructionPieGetAllCommand,
  ConstructionPieGetCommand,
  ConstructionPieUpdateCommand,
  EntityUrlParamCommand,
  PieLayerCreateCommand,
  PieLayerDeleteCommand,
  PieLayerUpdateCommand,
} from 'libs/contracts';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { KFI } from '../../common/utils/di';
import { ConstructionPieService } from './construction-pie.service';
import { ConstructionPieExportService } from './construction-pie-export.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { WorkspaceMembersGuard } from '../../common/guards/workspace-members.guard';
import { WorkspaceCreatorGuard } from '../../common/guards/workspace-creator.guard';
import { User } from '../../common/decorators/user.decorator';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { EntityName } from '../../common/types/entity.enum';
import { ILogger } from '../../common/types/main/logger.interface';
import { okResponseHandler } from '../../common/helpers/handlers/ok-response.handler';
import { errorResponseHandler } from '../../common/helpers/handlers/error-response.handler';
import { ConstructionPieCreateRequestDto, ConstructionPieCreateResponseDto } from './dto/controller/pie-create.dto';
import { ConstructionPieUpdateRequestDto, ConstructionPieUpdateResponseDto } from './dto/controller/pie-update.dto';
import {
  ConstructionPieGetAllResponseDto,
  ConstructionPieGetResponseDto,
  ConstructionPieDeleteResponseDto,
} from './dto/controller/pie-get.dto';
import { PieLayerCreateRequestDto, PieLayerCreateResponseDto } from './dto/controller/layer-create.dto';
import { PieLayerUpdateRequestDto, PieLayerUpdateResponseDto } from './dto/controller/layer-update.dto';
import { PieLayerDeleteResponseDto } from './dto/controller/layer-delete.dto';

@ApiTags('Работа с пирогами (ConstructionPie)')
@Controller('construction-pie')
export class ConstructionPieController {
  constructor(
    @Inject(KFI.CONSTRUCTION_PIE_SERVICE)
    private readonly service: ConstructionPieService,
    @Inject(KFI.CONSTRUCTION_PIE_EXPORT_SERVICE)
    private readonly exportService: ConstructionPieExportService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: ILogger,
  ) {}

  @ApiOperation({ summary: 'Получить все пироги справочника' })
  @ApiOkResponse({ schema: zodToOpenAPI(ConstructionPieGetAllCommand.ResponseSchema) })
  @ApiResponse({ status: 200, type: ConstructionPieGetAllResponseDto })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(ConstructionPieGetAllResponseDto)
  @Get('workspace/:workspaceId/handbook/:handbookId/get-all')
  async getAllEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('handbookId', ParseUUIDPipe) handbookId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<ConstructionPieGetAllResponseDto> {
    try {
      const { ok, data } = await this.service.getAllInHandbook(workspaceId, handbookId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.CONSTRUCTION_PIE, urlParams);
    }
  }

  @ApiOperation({ summary: 'Экспорт всех пирогов справочника в Excel (.xlsx)' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @Get('workspace/:workspaceId/handbook/:handbookId/export')
  async exportAllEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('handbookId', ParseUUIDPipe) handbookId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
    @Res() res: Response,
  ): Promise<void> {
    try {
      // getAllInHandbook уже проверяет ownership handbookId <-> workspaceId
      await this.service.getAllInHandbook(workspaceId, handbookId);
      const { buffer, fileName } = await this.exportService.exportAllToBuffer(handbookId);
      res
        .status(200)
        .setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        .setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
        .send(buffer);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.CONSTRUCTION_PIE, urlParams);
    }
  }

  @ApiOperation({ summary: 'Получить пирог по id' })
  @ApiOkResponse({ schema: zodToOpenAPI(ConstructionPieGetCommand.ResponseSchema) })
  @ApiResponse({ status: 200, type: ConstructionPieGetResponseDto })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(ConstructionPieGetResponseDto)
  @Get('workspace/:workspaceId/handbook/:handbookId/construction-pie/:pieId')
  async getByIdEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('handbookId', ParseUUIDPipe) handbookId: EntityUrlParamCommand.RequestUuidParam,
    @Param('pieId', ParseUUIDPipe) pieId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<ConstructionPieGetResponseDto> {
    try {
      const { ok, data } = await this.service.getById(workspaceId, handbookId, pieId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.CONSTRUCTION_PIE, urlParams);
    }
  }

  @ApiOperation({ summary: 'Создать пирог' })
  @ApiBody({ schema: zodToOpenAPI(ConstructionPieCreateCommand.RequestSchema) })
  @ApiOkResponse({ schema: zodToOpenAPI(ConstructionPieCreateCommand.ResponseSchema) })
  @ApiResponse({ status: 201, type: ConstructionPieCreateResponseDto })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(ConstructionPieCreateResponseDto)
  @Post('workspace/:workspaceId/handbook/:handbookId/create')
  async createEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('handbookId', ParseUUIDPipe) handbookId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: ConstructionPieCreateRequestDto,
    @User() userInfoFromJWT: IJWTPayload,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<ConstructionPieCreateResponseDto> {
    try {
      const { ok, data } = await this.service.create(workspaceId, handbookId, dto, userInfoFromJWT.uuid);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.CONSTRUCTION_PIE, urlParams);
    }
  }

  @ApiOperation({ summary: 'Обновить пирог' })
  @ApiBody({ schema: zodToOpenAPI(ConstructionPieUpdateCommand.RequestSchema) })
  @ApiOkResponse({ schema: zodToOpenAPI(ConstructionPieUpdateCommand.ResponseSchema) })
  @ApiResponse({ status: 200, type: ConstructionPieUpdateResponseDto })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(ConstructionPieUpdateResponseDto)
  @Put('workspace/:workspaceId/handbook/:handbookId/construction-pie/:pieId/update')
  async updateByIdEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('handbookId', ParseUUIDPipe) handbookId: EntityUrlParamCommand.RequestUuidParam,
    @Param('pieId', ParseUUIDPipe) pieId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: ConstructionPieUpdateRequestDto,
    @User() userInfoFromJWT: IJWTPayload,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<ConstructionPieUpdateResponseDto> {
    try {
      const { ok, data } = await this.service.updateById(workspaceId, handbookId, pieId, dto, userInfoFromJWT.uuid);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.CONSTRUCTION_PIE, urlParams);
    }
  }

  @ApiOperation({ summary: 'Удалить пирог' })
  @ApiOkResponse({ schema: zodToOpenAPI(ConstructionPieDeleteCommand.ResponseSchema) })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(ConstructionPieDeleteResponseDto)
  @Delete('workspace/:workspaceId/handbook/:handbookId/construction-pie/:pieId/delete')
  async deleteByIdEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('handbookId', ParseUUIDPipe) handbookId: EntityUrlParamCommand.RequestUuidParam,
    @Param('pieId', ParseUUIDPipe) pieId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<ConstructionPieDeleteResponseDto> {
    try {
      const { ok, data } = await this.service.deleteById(workspaceId, handbookId, pieId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.CONSTRUCTION_PIE, urlParams);
    }
  }

  @ApiOperation({ summary: 'Создать слой пирога' })
  @ApiBody({ schema: zodToOpenAPI(PieLayerCreateCommand.RequestSchema) })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(PieLayerCreateResponseDto)
  @Post('workspace/:workspaceId/handbook/:handbookId/construction-pie/:pieId/layer/create')
  async createLayerEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('handbookId', ParseUUIDPipe) handbookId: EntityUrlParamCommand.RequestUuidParam,
    @Param('pieId', ParseUUIDPipe) pieId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: PieLayerCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<PieLayerCreateResponseDto> {
    try {
      const { ok, data } = await this.service.createLayer(workspaceId, handbookId, pieId, dto);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.PIE_LAYER, urlParams);
    }
  }

  @ApiOperation({ summary: 'Обновить слой пирога' })
  @ApiBody({ schema: zodToOpenAPI(PieLayerUpdateCommand.RequestSchema) })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(PieLayerUpdateResponseDto)
  @Put('workspace/:workspaceId/handbook/:handbookId/construction-pie/:pieId/layer/:layerId/update')
  async updateLayerEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('handbookId', ParseUUIDPipe) handbookId: EntityUrlParamCommand.RequestUuidParam,
    @Param('pieId', ParseUUIDPipe) pieId: EntityUrlParamCommand.RequestUuidParam,
    @Param('layerId', ParseUUIDPipe) layerId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: PieLayerUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<PieLayerUpdateResponseDto> {
    try {
      const { ok, data } = await this.service.updateLayer(workspaceId, handbookId, pieId, layerId, dto);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.PIE_LAYER, urlParams);
    }
  }

  @ApiOperation({ summary: 'Удалить слой пирога' })
  @ApiOkResponse({ schema: zodToOpenAPI(PieLayerDeleteCommand.ResponseSchema) })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(PieLayerDeleteResponseDto)
  @Delete('workspace/:workspaceId/handbook/:handbookId/construction-pie/:pieId/layer/:layerId/delete')
  async deleteLayerEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('handbookId', ParseUUIDPipe) handbookId: EntityUrlParamCommand.RequestUuidParam,
    @Param('pieId', ParseUUIDPipe) pieId: EntityUrlParamCommand.RequestUuidParam,
    @Param('layerId', ParseUUIDPipe) layerId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<PieLayerDeleteResponseDto> {
    try {
      const { ok, data } = await this.service.deleteLayer(workspaceId, handbookId, pieId, layerId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.PIE_LAYER, urlParams);
    }
  }
}
