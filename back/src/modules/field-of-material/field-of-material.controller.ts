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
  FieldOfMaterialCreateCommand,
  FieldOfMaterialDeleteCommand,
  FieldOfMaterialGetAllCommand,
  FieldOfMaterialGetCommand,
  FieldOfMaterialUpdateCommand,
} from '@numart/house-admin-contracts';
import { EntityName } from '../../common/types/entity.enum';
import { ILogger } from '../../common/types/main/logger.interface';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { WorkspaceMembersGuard } from '../../common/guards/workspace-members.guard';
import { EUserTypeVariants } from '@prisma/client';
import { WorkspaceCreatorGuard } from '../../common/guards/workspace-creator.guard';
import { FieldOfMaterialDeleteResponseDto } from './dto/controller/delete-field-of-material.dto';
import { FieldOfMaterialGetResponseDto } from './dto/controller/get-field-of-material.dto';
import { FieldOfMaterialEntity } from './entities/field-of-material.entity';
import { FieldOfMaterialGetAllResponseDto } from './dto/controller/get-all-field-of-materials.dto';
import { FieldOfMaterialCreateRequestDto, FieldOfMaterialCreateResponseDto } from './dto/controller/create-field-of-material.dto';
import { FieldOfMaterialUpdateRequestDto, FieldOfMaterialUpdateResponseDto } from './dto/controller/update-field-of-material.dto';
import { IFieldOfMaterialController } from './types/field-of-material.controller.interface';
import { IFieldOfMaterialService } from './types/field-of-material.service.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { okResponseHandler } from '../../common/helpers/handlers/ok-response.handler';
import { errorResponseHandler } from '../../common/helpers/handlers/error-response.handler';
import { IQueryParams, QueryParams } from '../../common/decorators/query-params.decorator';

@ApiTags('Работа с FieldOfMaterial')
@Controller('workspace/:workspaceId/handbook/:handbookId/field-of-material')
export class FieldOfMaterialController implements IFieldOfMaterialController {
  constructor(
    @Inject(KFI.FIELD_OF_MATERIAL_SERVICE)
    private readonly fieldOfMaterialService: IFieldOfMaterialService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldOfMaterialGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение FieldOfMaterial по id' })
  @ApiResponse({ status: 200, type: FieldOfMaterialGetResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(FieldOfMaterialGetResponseDto)
  @Get('/:fieldOfMaterialId')
  async getByIdEP(
    @Param('fieldOfMaterialId', ParseUUIDPipe)
    fieldOfMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldOfMaterialGetResponseDto> {
    try {
      const { ok, data } = await this.fieldOfMaterialService.getById(fieldOfMaterialId);
      return okResponseHandler(ok, data, FieldOfMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_OF_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiQuery({
    schema: zodToOpenAPI(FieldOfMaterialGetAllCommand.RequestQuerySchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldOfMaterialGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получить все FieldOfMaterial',
  })
  @ApiResponse({ status: 200, type: [FieldOfMaterialGetAllResponseDto] })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(FieldOfMaterialGetAllResponseDto)
  @Get()
  async getAllEP(@UrlParams() urlParams: IUrlParams, @QueryParams() queryParams?: IQueryParams): Promise<FieldOfMaterialGetAllResponseDto> {
    try {
      const { ok, data } = await this.fieldOfMaterialService.getAll(queryParams);
      return okResponseHandler(ok, data, FieldOfMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_OF_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(FieldOfMaterialCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldOfMaterialCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание FieldOfMaterial' })
  @ApiBearerAuth('access-token')
  //endregion
  @ApiResponse({ status: 201, type: FieldOfMaterialCreateResponseDto })
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(FieldOfMaterialCreateResponseDto)
  @Post()
  async createEP(
    @Body() dto: FieldOfMaterialCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @Param('handbookId', ParseUUIDPipe)
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    @User() userInfoFromJWT: IJWTPayload,
  ): Promise<FieldOfMaterialCreateResponseDto> {
    try {
      const { ok, data } = await this.fieldOfMaterialService.create(dto, handbookId, userInfoFromJWT.uuid);
      return okResponseHandler(ok, data, FieldOfMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_OF_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(FieldOfMaterialUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldOfMaterialUpdateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменение FieldOfMaterial по id FieldOfMaterial' })
  @ApiResponse({ status: 200, type: FieldOfMaterialUpdateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(FieldOfMaterialUpdateResponseDto)
  @Put('/:fieldOfMaterialId')
  async updateByIdEP(
    @Param('fieldOfMaterialId', ParseUUIDPipe)
    fieldOfMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: FieldOfMaterialUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldOfMaterialUpdateResponseDto> {
    try {
      const { ok, data } = await this.fieldOfMaterialService.updateById(fieldOfMaterialId, dto);
      return okResponseHandler(ok, data, FieldOfMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_OF_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldOfMaterialDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Удаление FieldOfMaterial по id FieldOfMaterial',
  })
  @ApiResponse({ status: 200, type: FieldOfMaterialDeleteResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(FieldOfMaterialDeleteResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Delete('/:fieldOfMaterialId')
  async deleteByIdEP(
    @Param('fieldOfMaterialId', ParseUUIDPipe)
    fieldOfMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldOfMaterialDeleteResponseDto> {
    try {
      const { ok, data } = await this.fieldOfMaterialService.deleteById(fieldOfMaterialId);
      return okResponseHandler(ok, data, FieldOfMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_OF_MATERIAL, urlParams);
    }
  }
}
