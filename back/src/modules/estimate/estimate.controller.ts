import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import {
  EntityUrlParamCommand,
  EstimateCreateCommand,
  EstimateDeleteCommand,
  EstimateGetAllCommand,
  EstimateGetCommand,
  EstimateItemCreateCommand,
  EstimateItemDeleteCommand,
  EstimateItemUpdateCommand,
  EstimateSectionCreateCommand,
  EstimateSectionDeleteCommand,
  EstimateSectionUpdateCommand,
  EstimateUpdateCommand,
} from 'libs/contracts';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { KFI } from '../../common/utils/di';
import { EstimateService } from './estimate.service';
import { EstimateExportService } from './estimate-export.service';
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
import { EstimateCreateRequestDto, EstimateCreateResponseDto } from './dto/controller/estimate-create.dto';
import { EstimateUpdateRequestDto, EstimateUpdateResponseDto } from './dto/controller/estimate-update.dto';
import { EstimateGetResponseDto } from './dto/controller/estimate-get.dto';
import { EstimateGetAllResponseDto } from './dto/controller/estimate-get-all.dto';
import { EstimateDeleteResponseDto } from './dto/controller/estimate-delete.dto';
import { EstimateSectionCreateRequestDto, EstimateSectionCreateResponseDto } from './dto/controller/section-create.dto';
import { EstimateSectionUpdateRequestDto, EstimateSectionUpdateResponseDto } from './dto/controller/section-update.dto';
import { EstimateSectionDeleteResponseDto } from './dto/controller/section-delete.dto';
import { EstimateItemCreateRequestDto, EstimateItemCreateResponseDto } from './dto/controller/item-create.dto';
import { EstimateItemUpdateRequestDto, EstimateItemUpdateResponseDto } from './dto/controller/item-update.dto';
import { EstimateItemDeleteResponseDto } from './dto/controller/item-delete.dto';

@ApiTags('Работа со сметами (Estimate)')
@Controller('estimate')
export class EstimateController {
  constructor(
    @Inject(KFI.ESTIMATE_SERVICE)
    private readonly estimateService: EstimateService,
    @Inject(KFI.ESTIMATE_EXPORT_SERVICE)
    private readonly exportService: EstimateExportService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: ILogger,
  ) {}

  // ========================= Estimates =========================

  @ApiOperation({ summary: 'Получить все сметы проекта' })
  @ApiOkResponse({ schema: zodToOpenAPI(EstimateGetAllCommand.ResponseSchema) })
  @ApiResponse({ status: 200, type: EstimateGetAllResponseDto })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(EstimateGetAllResponseDto)
  @Get('workspace/:workspaceId/project/:projectId/get-all')
  async getAllByProjectEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('projectId', ParseUUIDPipe) projectId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<EstimateGetAllResponseDto> {
    try {
      const { ok, data } = await this.estimateService.getAllByProject(workspaceId, projectId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.ESTIMATE, urlParams);
    }
  }

  @ApiOperation({ summary: 'Получить смету по id с полной иерархией' })
  @ApiOkResponse({ schema: zodToOpenAPI(EstimateGetCommand.ResponseSchema) })
  @ApiResponse({ status: 200, type: EstimateGetResponseDto })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(EstimateGetResponseDto)
  @Get('workspace/:workspaceId/project/:projectId/estimate/:estimateId')
  async getByIdEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('projectId', ParseUUIDPipe) projectId: EntityUrlParamCommand.RequestUuidParam,
    @Param('estimateId', ParseUUIDPipe) estimateId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<EstimateGetResponseDto> {
    try {
      const { ok, data } = await this.estimateService.getById(workspaceId, projectId, estimateId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.ESTIMATE, urlParams);
    }
  }

  @ApiOperation({ summary: 'Создать смету в проекте' })
  @ApiBody({ schema: zodToOpenAPI(EstimateCreateCommand.RequestSchema) })
  @ApiOkResponse({ schema: zodToOpenAPI(EstimateCreateCommand.ResponseSchema) })
  @ApiResponse({ status: 201, type: EstimateCreateResponseDto })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(EstimateCreateResponseDto)
  @Post('workspace/:workspaceId/project/:projectId/create')
  async createEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('projectId', ParseUUIDPipe) projectId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: EstimateCreateRequestDto,
    @User() userInfoFromJWT: IJWTPayload,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<EstimateCreateResponseDto> {
    try {
      const { ok, data } = await this.estimateService.create(workspaceId, projectId, dto, userInfoFromJWT.uuid);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.ESTIMATE, urlParams);
    }
  }

  @ApiOperation({ summary: 'Обновить смету по id' })
  @ApiBody({ schema: zodToOpenAPI(EstimateUpdateCommand.RequestSchema) })
  @ApiOkResponse({ schema: zodToOpenAPI(EstimateUpdateCommand.ResponseSchema) })
  @ApiResponse({ status: 200, type: EstimateUpdateResponseDto })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(EstimateUpdateResponseDto)
  @Put('workspace/:workspaceId/project/:projectId/estimate/:estimateId/update')
  async updateByIdEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('projectId', ParseUUIDPipe) projectId: EntityUrlParamCommand.RequestUuidParam,
    @Param('estimateId', ParseUUIDPipe) estimateId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: EstimateUpdateRequestDto,
    @User() userInfoFromJWT: IJWTPayload,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<EstimateUpdateResponseDto> {
    try {
      const { ok, data } = await this.estimateService.updateById(workspaceId, projectId, estimateId, dto, userInfoFromJWT.uuid);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.ESTIMATE, urlParams);
    }
  }

  @ApiOperation({ summary: 'Удалить смету по id' })
  @ApiOkResponse({ schema: zodToOpenAPI(EstimateDeleteCommand.ResponseSchema) })
  @ApiResponse({ status: 200, type: EstimateDeleteResponseDto })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(EstimateDeleteResponseDto)
  @Delete('workspace/:workspaceId/project/:projectId/estimate/:estimateId/delete')
  async deleteByIdEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('projectId', ParseUUIDPipe) projectId: EntityUrlParamCommand.RequestUuidParam,
    @Param('estimateId', ParseUUIDPipe) estimateId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<EstimateDeleteResponseDto> {
    try {
      const { ok, data } = await this.estimateService.deleteById(workspaceId, projectId, estimateId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.ESTIMATE, urlParams);
    }
  }

  @ApiOperation({ summary: 'Экспорт сметы в Excel (.xlsx)' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @Get('workspace/:workspaceId/project/:projectId/estimate/:estimateId/export')
  async exportByIdEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('projectId', ParseUUIDPipe) projectId: EntityUrlParamCommand.RequestUuidParam,
    @Param('estimateId', ParseUUIDPipe) estimateId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
    @Res() res: Response,
  ): Promise<void> {
    try {
      await this.estimateService.getById(workspaceId, projectId, estimateId);
      const { buffer, fileName } = await this.exportService.exportToBuffer(estimateId);
      res
        .status(200)
        .setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        .setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
        .send(buffer);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.ESTIMATE, urlParams);
    }
  }

  // ========================= Sections =========================

  @ApiOperation({ summary: 'Создать раздел/подраздел сметы' })
  @ApiBody({ schema: zodToOpenAPI(EstimateSectionCreateCommand.RequestSchema) })
  @ApiOkResponse({ schema: zodToOpenAPI(EstimateSectionCreateCommand.ResponseSchema) })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(EstimateSectionCreateResponseDto)
  @Post('workspace/:workspaceId/project/:projectId/estimate/:estimateId/section/create')
  async createSectionEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('projectId', ParseUUIDPipe) projectId: EntityUrlParamCommand.RequestUuidParam,
    @Param('estimateId', ParseUUIDPipe) estimateId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: EstimateSectionCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<EstimateSectionCreateResponseDto> {
    try {
      const { ok, data } = await this.estimateService.createSection(workspaceId, projectId, estimateId, dto);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.ESTIMATE_SECTION, urlParams);
    }
  }

  @ApiOperation({ summary: 'Обновить раздел сметы' })
  @ApiBody({ schema: zodToOpenAPI(EstimateSectionUpdateCommand.RequestSchema) })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(EstimateSectionUpdateResponseDto)
  @Put('workspace/:workspaceId/project/:projectId/estimate/:estimateId/section/:sectionId/update')
  async updateSectionEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('projectId', ParseUUIDPipe) projectId: EntityUrlParamCommand.RequestUuidParam,
    @Param('estimateId', ParseUUIDPipe) estimateId: EntityUrlParamCommand.RequestUuidParam,
    @Param('sectionId', ParseUUIDPipe) sectionId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: EstimateSectionUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<EstimateSectionUpdateResponseDto> {
    try {
      const { ok, data } = await this.estimateService.updateSection(workspaceId, projectId, estimateId, sectionId, dto);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.ESTIMATE_SECTION, urlParams);
    }
  }

  @ApiOperation({ summary: 'Удалить раздел сметы' })
  @ApiOkResponse({ schema: zodToOpenAPI(EstimateSectionDeleteCommand.ResponseSchema) })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(EstimateSectionDeleteResponseDto)
  @Delete('workspace/:workspaceId/project/:projectId/estimate/:estimateId/section/:sectionId/delete')
  async deleteSectionEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('projectId', ParseUUIDPipe) projectId: EntityUrlParamCommand.RequestUuidParam,
    @Param('estimateId', ParseUUIDPipe) estimateId: EntityUrlParamCommand.RequestUuidParam,
    @Param('sectionId', ParseUUIDPipe) sectionId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<EstimateSectionDeleteResponseDto> {
    try {
      const { ok, data } = await this.estimateService.deleteSection(workspaceId, projectId, estimateId, sectionId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.ESTIMATE_SECTION, urlParams);
    }
  }

  // ========================= Items =========================

  @ApiOperation({ summary: 'Создать строку раздела сметы' })
  @ApiBody({ schema: zodToOpenAPI(EstimateItemCreateCommand.RequestSchema) })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(EstimateItemCreateResponseDto)
  @Post('workspace/:workspaceId/project/:projectId/estimate/:estimateId/section/:sectionId/item/create')
  async createItemEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('projectId', ParseUUIDPipe) projectId: EntityUrlParamCommand.RequestUuidParam,
    @Param('estimateId', ParseUUIDPipe) estimateId: EntityUrlParamCommand.RequestUuidParam,
    @Param('sectionId', ParseUUIDPipe) sectionId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: EstimateItemCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<EstimateItemCreateResponseDto> {
    try {
      const { ok, data } = await this.estimateService.createItem(workspaceId, projectId, estimateId, sectionId, dto);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.ESTIMATE_ITEM, urlParams);
    }
  }

  @ApiOperation({ summary: 'Обновить строку раздела сметы' })
  @ApiBody({ schema: zodToOpenAPI(EstimateItemUpdateCommand.RequestSchema) })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(EstimateItemUpdateResponseDto)
  @Put('workspace/:workspaceId/project/:projectId/estimate/:estimateId/section/:sectionId/item/:itemId/update')
  async updateItemEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('projectId', ParseUUIDPipe) projectId: EntityUrlParamCommand.RequestUuidParam,
    @Param('estimateId', ParseUUIDPipe) estimateId: EntityUrlParamCommand.RequestUuidParam,
    @Param('sectionId', ParseUUIDPipe) sectionId: EntityUrlParamCommand.RequestUuidParam,
    @Param('itemId', ParseUUIDPipe) itemId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: EstimateItemUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<EstimateItemUpdateResponseDto> {
    try {
      const { ok, data } = await this.estimateService.updateItem(workspaceId, projectId, estimateId, sectionId, itemId, dto);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.ESTIMATE_ITEM, urlParams);
    }
  }

  @ApiOperation({ summary: 'Удалить строку раздела сметы' })
  @ApiOkResponse({ schema: zodToOpenAPI(EstimateItemDeleteCommand.ResponseSchema) })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(EstimateItemDeleteResponseDto)
  @Delete('workspace/:workspaceId/project/:projectId/estimate/:estimateId/section/:sectionId/item/:itemId/delete')
  async deleteItemEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('projectId', ParseUUIDPipe) projectId: EntityUrlParamCommand.RequestUuidParam,
    @Param('estimateId', ParseUUIDPipe) estimateId: EntityUrlParamCommand.RequestUuidParam,
    @Param('sectionId', ParseUUIDPipe) sectionId: EntityUrlParamCommand.RequestUuidParam,
    @Param('itemId', ParseUUIDPipe) itemId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<EstimateItemDeleteResponseDto> {
    try {
      const { ok, data } = await this.estimateService.deleteItem(workspaceId, projectId, estimateId, sectionId, itemId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.ESTIMATE_ITEM, urlParams);
    }
  }
}
