import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import {
  EntityUrlParamCommand,
  UnitTemplateComponentCreateCommand,
  UnitTemplateComponentDeleteCommand,
  UnitTemplateComponentUpdateCommand,
  UnitTemplateCreateCommand,
  UnitTemplateDeleteCommand,
  UnitTemplateGetAllCommand,
  UnitTemplateGetCommand,
  UnitTemplateUpdateCommand,
} from 'libs/contracts';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { KFI } from '../../common/utils/di';
import { UnitTemplateService } from './unit-template.service';
import { UnitTemplateExportService } from './unit-template-export.service';
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
import { UnitTemplateCreateRequestDto, UnitTemplateCreateResponseDto } from './dto/controller/unit-template-create.dto';
import { UnitTemplateUpdateRequestDto, UnitTemplateUpdateResponseDto } from './dto/controller/unit-template-update.dto';
import {
  UnitTemplateGetAllResponseDto,
  UnitTemplateGetResponseDto,
  UnitTemplateDeleteResponseDto,
} from './dto/controller/unit-template-get.dto';
import { UnitTemplateComponentCreateRequestDto, UnitTemplateComponentCreateResponseDto } from './dto/controller/component-create.dto';
import { UnitTemplateComponentUpdateRequestDto, UnitTemplateComponentUpdateResponseDto } from './dto/controller/component-update.dto';
import { UnitTemplateComponentDeleteResponseDto } from './dto/controller/component-delete.dto';

@ApiTags('Работа с шаблонами единичек (UnitTemplate)')
@Controller('unit-template')
export class UnitTemplateController {
  constructor(
    @Inject(KFI.UNIT_TEMPLATE_SERVICE)
    private readonly service: UnitTemplateService,
    @Inject(KFI.UNIT_TEMPLATE_EXPORT_SERVICE)
    private readonly exportService: UnitTemplateExportService,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: ILogger,
  ) {}

  @ApiOperation({ summary: 'Получить все единички справочника' })
  @ApiOkResponse({ schema: zodToOpenAPI(UnitTemplateGetAllCommand.ResponseSchema) })
  @ApiResponse({ status: 200, type: UnitTemplateGetAllResponseDto })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(UnitTemplateGetAllResponseDto)
  @Get('workspace/:workspaceId/handbook/:handbookId/get-all')
  async getAllEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('handbookId', ParseUUIDPipe) handbookId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UnitTemplateGetAllResponseDto> {
    try {
      const { ok, data } = await this.service.getAllInHandbook(workspaceId, handbookId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.UNIT_TEMPLATE, urlParams);
    }
  }

  @ApiOperation({ summary: 'Экспорт всех единичек справочника в Excel (.xlsx)' })
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
      errorResponseHandler(this.logger, error, EntityName.UNIT_TEMPLATE, urlParams);
    }
  }

  @ApiOperation({ summary: 'Получить единичку по id' })
  @ApiOkResponse({ schema: zodToOpenAPI(UnitTemplateGetCommand.ResponseSchema) })
  @ApiResponse({ status: 200, type: UnitTemplateGetResponseDto })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(UnitTemplateGetResponseDto)
  @Get('workspace/:workspaceId/handbook/:handbookId/unit-template/:templateId')
  async getByIdEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('handbookId', ParseUUIDPipe) handbookId: EntityUrlParamCommand.RequestUuidParam,
    @Param('templateId', ParseUUIDPipe) templateId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UnitTemplateGetResponseDto> {
    try {
      const { ok, data } = await this.service.getById(workspaceId, handbookId, templateId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.UNIT_TEMPLATE, urlParams);
    }
  }

  @ApiOperation({ summary: 'Создать единичку' })
  @ApiBody({ schema: zodToOpenAPI(UnitTemplateCreateCommand.RequestSchema) })
  @ApiOkResponse({ schema: zodToOpenAPI(UnitTemplateCreateCommand.ResponseSchema) })
  @ApiResponse({ status: 201, type: UnitTemplateCreateResponseDto })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(UnitTemplateCreateResponseDto)
  @Post('workspace/:workspaceId/handbook/:handbookId/create')
  async createEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('handbookId', ParseUUIDPipe) handbookId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: UnitTemplateCreateRequestDto,
    @User() userInfoFromJWT: IJWTPayload,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UnitTemplateCreateResponseDto> {
    try {
      const { ok, data } = await this.service.create(workspaceId, handbookId, dto, userInfoFromJWT.uuid);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.UNIT_TEMPLATE, urlParams);
    }
  }

  @ApiOperation({ summary: 'Обновить единичку' })
  @ApiBody({ schema: zodToOpenAPI(UnitTemplateUpdateCommand.RequestSchema) })
  @ApiOkResponse({ schema: zodToOpenAPI(UnitTemplateUpdateCommand.ResponseSchema) })
  @ApiResponse({ status: 200, type: UnitTemplateUpdateResponseDto })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(UnitTemplateUpdateResponseDto)
  @Put('workspace/:workspaceId/handbook/:handbookId/unit-template/:templateId/update')
  async updateByIdEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('handbookId', ParseUUIDPipe) handbookId: EntityUrlParamCommand.RequestUuidParam,
    @Param('templateId', ParseUUIDPipe) templateId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: UnitTemplateUpdateRequestDto,
    @User() userInfoFromJWT: IJWTPayload,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UnitTemplateUpdateResponseDto> {
    try {
      const { ok, data } = await this.service.updateById(workspaceId, handbookId, templateId, dto, userInfoFromJWT.uuid);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.UNIT_TEMPLATE, urlParams);
    }
  }

  @ApiOperation({ summary: 'Удалить единичку' })
  @ApiOkResponse({ schema: zodToOpenAPI(UnitTemplateDeleteCommand.ResponseSchema) })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(UnitTemplateDeleteResponseDto)
  @Delete('workspace/:workspaceId/handbook/:handbookId/unit-template/:templateId/delete')
  async deleteByIdEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('handbookId', ParseUUIDPipe) handbookId: EntityUrlParamCommand.RequestUuidParam,
    @Param('templateId', ParseUUIDPipe) templateId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UnitTemplateDeleteResponseDto> {
    try {
      const { ok, data } = await this.service.deleteById(workspaceId, handbookId, templateId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.UNIT_TEMPLATE, urlParams);
    }
  }

  @ApiOperation({ summary: 'Создать компонент в единичке' })
  @ApiBody({ schema: zodToOpenAPI(UnitTemplateComponentCreateCommand.RequestSchema) })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(UnitTemplateComponentCreateResponseDto)
  @Post('workspace/:workspaceId/handbook/:handbookId/unit-template/:templateId/component/create')
  async createComponentEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('handbookId', ParseUUIDPipe) handbookId: EntityUrlParamCommand.RequestUuidParam,
    @Param('templateId', ParseUUIDPipe) templateId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: UnitTemplateComponentCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UnitTemplateComponentCreateResponseDto> {
    try {
      const { ok, data } = await this.service.createComponent(workspaceId, handbookId, templateId, dto);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.UNIT_TEMPLATE_COMPONENT, urlParams);
    }
  }

  @ApiOperation({ summary: 'Обновить компонент единички' })
  @ApiBody({ schema: zodToOpenAPI(UnitTemplateComponentUpdateCommand.RequestSchema) })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(UnitTemplateComponentUpdateResponseDto)
  @Put('workspace/:workspaceId/handbook/:handbookId/unit-template/:templateId/component/:componentId/update')
  async updateComponentEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('handbookId', ParseUUIDPipe) handbookId: EntityUrlParamCommand.RequestUuidParam,
    @Param('templateId', ParseUUIDPipe) templateId: EntityUrlParamCommand.RequestUuidParam,
    @Param('componentId', ParseUUIDPipe) componentId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: UnitTemplateComponentUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UnitTemplateComponentUpdateResponseDto> {
    try {
      const { ok, data } = await this.service.updateComponent(workspaceId, handbookId, templateId, componentId, dto);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.UNIT_TEMPLATE_COMPONENT, urlParams);
    }
  }

  @ApiOperation({ summary: 'Удалить компонент единички' })
  @ApiOkResponse({ schema: zodToOpenAPI(UnitTemplateComponentDeleteCommand.ResponseSchema) })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(UnitTemplateComponentDeleteResponseDto)
  @Delete('workspace/:workspaceId/handbook/:handbookId/unit-template/:templateId/component/:componentId/delete')
  async deleteComponentEP(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('handbookId', ParseUUIDPipe) handbookId: EntityUrlParamCommand.RequestUuidParam,
    @Param('templateId', ParseUUIDPipe) templateId: EntityUrlParamCommand.RequestUuidParam,
    @Param('componentId', ParseUUIDPipe) componentId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UnitTemplateComponentDeleteResponseDto> {
    try {
      const { ok, data } = await this.service.deleteComponent(workspaceId, handbookId, templateId, componentId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.UNIT_TEMPLATE_COMPONENT, urlParams);
    }
  }
}
