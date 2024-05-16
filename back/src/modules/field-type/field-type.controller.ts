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
  FieldTypeCreateCommand,
  FieldTypeDeleteCommand,
  FieldTypeGetAllCommand,
  FieldTypeGetCommand,
  FieldTypeUpdateCommand,
} from '@numart/house-admin-contracts';
import { EntityName } from '../../common/types/entity.enum';
import { ILogger } from '../../common/types/main/logger.interface';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { EUserTypeVariants } from '@prisma/client';
import { FieldTypeDeleteResponseDto } from './dto/controller/delete-field-type.dto';
import { FieldTypeGetResponseDto } from './dto/controller/get-field-type.dto';
import { FieldTypeEntity } from './entities/field-type.entity';
import { FieldTypeGetAllResponseDto } from './dto/controller/get-all-field-types.dto';
import { FieldTypeCreateRequestDto, FieldTypeCreateResponseDto } from './dto/controller/create-field-type.dto';
import { FieldTypeUpdateRequestDto, FieldTypeUpdateResponseDto } from './dto/controller/update-field-type.dto';
import { IFieldTypeController } from './types/field-type.controller.interface';
import { IFieldTypeService } from './types/field-type.service.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { okResponseHandler } from '../../common/helpers/handlers/ok-response.handler';
import { errorResponseHandler } from '../../common/helpers/handlers/error-response.handler';
import { IQueryParams, QueryParams } from '../../common/decorators/query-params.decorator';

@ApiTags('Работа с FieldType')
@Controller('field-type')
export class FieldTypeController implements IFieldTypeController {
  constructor(
    @Inject(KFI.FIELD_TYPE_SERVICE)
    private readonly fieldTypeService: IFieldTypeService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldTypeGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение FieldType по id' })
  @ApiResponse({ status: 200, type: FieldTypeGetResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard)
  @ZodSerializerDto(FieldTypeGetResponseDto)
  @Get('/:fieldTypeId')
  async getByIdEP(
    @Param('fieldTypeId', ParseUUIDPipe)
    fieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldTypeGetResponseDto> {
    try {
      const { ok, data } = await this.fieldTypeService.getById(fieldTypeId);
      return okResponseHandler(ok, data, FieldTypeEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_TYPE, urlParams);
    }
  }

  //region SWAGGER
  @ApiQuery({
    schema: zodToOpenAPI(FieldTypeGetAllCommand.RequestQuerySchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldTypeGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получить все FieldType',
  })
  @ApiResponse({ status: 200, type: [FieldTypeGetAllResponseDto] })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard)
  @ZodSerializerDto(FieldTypeGetAllResponseDto)
  @Get()
  async getAllEP(@UrlParams() urlParams: IUrlParams, @QueryParams() queryParams?: IQueryParams): Promise<FieldTypeGetAllResponseDto> {
    try {
      const { ok, data } = await this.fieldTypeService.getAll(queryParams);
      return okResponseHandler(ok, data, FieldTypeEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_TYPE, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(FieldTypeCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldTypeCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание FieldType' })
  @ApiResponse({ status: 201, type: FieldTypeCreateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(FieldTypeCreateResponseDto)
  @Post()
  async createEP(
    @Body() dto: FieldTypeCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @User() userInfoFromJWT: IJWTPayload,
  ): Promise<FieldTypeCreateResponseDto> {
    // в create нужно передать id пользователя, для которого создается field-type
    try {
      const { ok, data } = await this.fieldTypeService.create(dto, userInfoFromJWT.uuid);
      return okResponseHandler(ok, data, FieldTypeEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_TYPE, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(FieldTypeUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldTypeUpdateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменение FieldType по id FieldType' })
  @ApiResponse({ status: 200, type: FieldTypeUpdateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(FieldTypeUpdateResponseDto)
  @Put('/:fieldTypeId')
  async updateByIdEP(
    @Param('fieldTypeId', ParseUUIDPipe)
    fieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: FieldTypeUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldTypeUpdateResponseDto> {
    try {
      const { ok, data } = await this.fieldTypeService.updateById(fieldTypeId, dto);
      return okResponseHandler(ok, data, FieldTypeEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_TYPE, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(FieldTypeDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Удаление FieldType по id FieldType',
  })
  @ApiResponse({ status: 200, type: FieldTypeDeleteResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(FieldTypeDeleteResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Delete('/:fieldTypeId')
  async deleteByIdEP(
    @Param('fieldTypeId', ParseUUIDPipe)
    fieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<FieldTypeDeleteResponseDto> {
    try {
      const { ok, data } = await this.fieldTypeService.deleteById(fieldTypeId);
      return okResponseHandler(ok, data, FieldTypeEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.FIELD_TYPE, urlParams);
    }
  }
}
