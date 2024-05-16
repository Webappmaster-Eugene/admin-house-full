import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { FieldVariantsForSelectorFieldTypeGetResponseDto } from './dto/controller/get-field-variants-for-selector-field-type.dto';
import {
  FieldVariantsForSelectorFieldTypeCreateRequestDto,
  FieldVariantsForSelectorFieldTypeCreateResponseDto,
} from './dto/controller/create-field-variants-for-selector-field-type.dto';
import { FieldVariantsForSelectorFieldTypeGetAllResponseDto } from './dto/controller/get-all-field-variants-for-selector-field-type.dto';
import {
  FieldVariantsForSelectorFieldTypeUpdateRequestDto,
  FieldVariantsForSelectorFieldTypeUpdateResponseDto,
} from './dto/controller/update-field-variants-for-selector-field-type.dto';
import { FieldVariantsForSelectorFieldTypeDeleteResponseDto } from './dto/controller/delete-field-variants-for-selector-field-type.dto';
import { IFieldVariantsForSelectorFieldTypeController } from './types/field-variants-for-selector-field-type.controller.interface';
import { IFieldVariantsForSelectorFieldTypeService } from './types/field-variants-for-selector-field-type.service.interface';
import { KFI } from '../../common/utils/di';
import {
  FieldVariantsForSelectorFieldTypeCreateCommand,
  FieldVariantsForSelectorFieldTypeDeleteCommand,
  FieldVariantsForSelectorFieldTypeGetAllCommand,
  FieldVariantsForSelectorFieldTypeGetCommand,
  FieldVariantsForSelectorFieldTypeUpdateCommand,
} from '@numart/house-admin-contracts';
import { FieldVariantsForSelectorFieldTypeEntity } from './entities/field-variants-for-selector-field-type.entity';
import { EntityName } from '../../common/types/entity.enum';
import { ILogger } from '../../common/types/main/logger.interface';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { WorkspaceMembersGuard } from '../../common/guards/workspace-members.guard';
import { EUserTypeVariants } from '@prisma/client';
import { WorkspaceCreatorGuard } from '../../common/guards/workspace-creator.guard';
import { okResponseHandler } from '../../common/helpers/handlers/ok-response.handler';
import { errorResponseHandler } from '../../common/helpers/handlers/error-response.handler';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { IQueryParams, QueryParams } from '../../common/decorators/query-params.decorator';

@ApiTags('Работа с FieldVariantsForSelectorFieldType')
@Controller('/workspace/:workspaceId/handbook/:handbookId/field-of-material/:fieldOfMaterialId/field-variants')
export class FieldVariantsForSelectorFieldTypeController implements IFieldVariantsForSelectorFieldTypeController {
  constructor(
    @Inject(KFI.FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_SERVICE)
    private readonly fieldVariantsForSelectorFieldTypeService: IFieldVariantsForSelectorFieldTypeService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldVariantsForSelectorFieldTypeGetCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получение FieldVariantsForSelectorFieldType по id',
  })
  @ApiResponse({
    status: 200,
    type: FieldVariantsForSelectorFieldTypeGetResponseDto,
  })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(FieldVariantsForSelectorFieldTypeGetResponseDto)
  @Get('/:fieldVariantsForSelectorFieldTypeId')
  async getByIdEP(
    @Param('fieldVariantsForSelectorFieldTypeId', ParseUUIDPipe)
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldVariantsForSelectorFieldTypeGetResponseDto> {
    try {
      const { ok, data } = await this.fieldVariantsForSelectorFieldTypeService.getById(fieldVariantsForSelectorFieldTypeId);
      return okResponseHandler(ok, data, FieldVariantsForSelectorFieldTypeEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE, urlParams);
    }
  }

  //region SWAGGER
  @ApiQuery({
    schema: zodToOpenAPI(FieldVariantsForSelectorFieldTypeGetAllCommand.RequestQuerySchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldVariantsForSelectorFieldTypeGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получить все FieldVariantsForSelectorFieldType пользователей (менеджеров Workspace)',
  })
  @ApiResponse({
    status: 200,
    type: [FieldVariantsForSelectorFieldTypeGetAllResponseDto],
  })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(FieldVariantsForSelectorFieldTypeGetAllResponseDto)
  @Get()
  async getAllEP(
    @UrlParams() urlParams: IUrlParams,
    @QueryParams() queryParams?: IQueryParams,
  ): Promise<FieldVariantsForSelectorFieldTypeGetAllResponseDto> {
    try {
      const { ok, data } = await this.fieldVariantsForSelectorFieldTypeService.getAll(queryParams);
      return okResponseHandler(ok, data, FieldVariantsForSelectorFieldTypeEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(FieldVariantsForSelectorFieldTypeCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldVariantsForSelectorFieldTypeCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание FieldVariantsForSelectorFieldType' })
  @ApiResponse({
    status: 201,
    type: FieldVariantsForSelectorFieldTypeCreateResponseDto,
  })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(FieldVariantsForSelectorFieldTypeCreateResponseDto)
  @Post()
  async createEP(
    @Body() dto: FieldVariantsForSelectorFieldTypeCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @User() userInfoFromJWT: IJWTPayload,
    @Param('handbookId', ParseUUIDPipe)
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<FieldVariantsForSelectorFieldTypeCreateResponseDto> {
    try {
      const { ok, data } = await this.fieldVariantsForSelectorFieldTypeService.create(dto, handbookId);
      return okResponseHandler(ok, data, FieldVariantsForSelectorFieldTypeEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(FieldVariantsForSelectorFieldTypeUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldVariantsForSelectorFieldTypeUpdateCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Изменение FieldVariantsForSelectorFieldType по id FieldVariantsForSelectorFieldType',
  })
  @ApiResponse({
    status: 200,
    type: FieldVariantsForSelectorFieldTypeUpdateResponseDto,
  })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(FieldVariantsForSelectorFieldTypeUpdateResponseDto)
  @Put('/:fieldVariantsForSelectorFieldTypeId')
  async updateByIdEP(
    @Param('fieldVariantsForSelectorFieldTypeId', ParseUUIDPipe)
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: FieldVariantsForSelectorFieldTypeUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldVariantsForSelectorFieldTypeUpdateResponseDto> {
    try {
      const { ok, data } = await this.fieldVariantsForSelectorFieldTypeService.updateById(fieldVariantsForSelectorFieldTypeId, dto);
      return okResponseHandler(ok, data, FieldVariantsForSelectorFieldTypeEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldVariantsForSelectorFieldTypeDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Удаление FieldVariantsForSelectorFieldType внутри Workspace менеджера по id FieldVariantsForSelectorFieldType',
  })
  @ApiResponse({
    status: 200,
    type: FieldVariantsForSelectorFieldTypeDeleteResponseDto,
  })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(FieldVariantsForSelectorFieldTypeDeleteResponseDto)
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @Delete('/:fieldVariantsForSelectorFieldTypeId')
  async deleteByIdEP(
    @Param('fieldVariantsForSelectorFieldTypeId', ParseUUIDPipe)
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldVariantsForSelectorFieldTypeDeleteResponseDto> {
    try {
      const { ok, data } = await this.fieldVariantsForSelectorFieldTypeService.deleteById(fieldVariantsForSelectorFieldTypeId);
      return okResponseHandler(ok, data, FieldVariantsForSelectorFieldTypeEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE, urlParams);
    }
  }
}
