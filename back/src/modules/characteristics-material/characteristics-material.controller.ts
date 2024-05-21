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
  CharacteristicsMaterialCreateCommand,
  CharacteristicsMaterialDeleteCommand,
  CharacteristicsMaterialGetAllCommand,
  CharacteristicsMaterialGetCommand,
  CharacteristicsMaterialUpdateCommand,
} from '@numart/house-admin-contracts';
import { EntityName } from '../../common/types/entity.enum';
import { ILogger } from '../../common/types/main/logger.interface';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { WorkspaceMembersGuard } from '../../common/guards/workspace-members.guard';
import { EUserTypeVariants } from '.prisma/client';
import { CharacteristicsMaterialDeleteResponseDto } from './dto/controller/delete-characteristics-material.dto';
import { CharacteristicsMaterialGetResponseDto } from './dto/controller/get-characteristics-material.dto';
import { CharacteristicsMaterialEntity } from './entities/characteristics-material.entity';
import { CharacteristicsMaterialGetAllResponseDto } from './dto/controller/get-all-characteristics-materials.dto';
import {
  CharacteristicsMaterialCreateRequestDto,
  CharacteristicsMaterialCreateResponseDto,
} from './dto/controller/create-characteristics-material.dto';
import {
  CharacteristicsMaterialUpdateRequestDto,
  CharacteristicsMaterialUpdateResponseDto,
} from './dto/controller/update-characteristics-material.dto';
import { ICharacteristicsMaterialController } from './types/characteristics-material.controller.interface';
import { ICharacteristicsMaterialService } from './types/characteristics-material.service.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { okResponseHandler } from '../../common/helpers/handlers/ok-response.handler';
import { errorResponseHandler } from '../../common/helpers/handlers/error-response.handler';
import { IQueryParams, QueryParams } from '../../common/decorators/query-params.decorator';

@ApiTags('Работа с CharacteristicsMaterial')
@Controller(
  'workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId/characteristics-material',
)
export class CharacteristicsMaterialController implements ICharacteristicsMaterialController {
  constructor(
    @Inject(KFI.CHARACTERISTICS_MATERIAL_SERVICE)
    private readonly characteristicsMaterialService: ICharacteristicsMaterialService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(CharacteristicsMaterialGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение CharacteristicsMaterial по id' })
  @ApiResponse({ status: 200, type: CharacteristicsMaterialGetResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(CharacteristicsMaterialGetResponseDto)
  @Get('/:characteristicsMaterialId')
  async getByIdEP(
    @Param('characteristicsMaterialId', ParseUUIDPipe)
    characteristicsMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<CharacteristicsMaterialGetResponseDto> {
    try {
      const { ok, data } = await this.characteristicsMaterialService.getById(characteristicsMaterialId);
      return okResponseHandler(ok, data, CharacteristicsMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.CHARACTERISTICS_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiQuery({
    schema: zodToOpenAPI(CharacteristicsMaterialGetAllCommand.RequestQuerySchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(CharacteristicsMaterialGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получить все CharacteristicsMaterial',
  })
  @ApiResponse({ status: 200, type: [CharacteristicsMaterialGetAllResponseDto] })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(CharacteristicsMaterialGetAllResponseDto)
  @Get()
  async getAllEP(
    @UrlParams() urlParams: IUrlParams,
    @QueryParams() queryParams?: IQueryParams,
  ): Promise<CharacteristicsMaterialGetAllResponseDto> {
    try {
      const { ok, data } = await this.characteristicsMaterialService.getAll(queryParams);
      return okResponseHandler(ok, data, CharacteristicsMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.CHARACTERISTICS_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(CharacteristicsMaterialCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(CharacteristicsMaterialCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание CharacteristicsMaterial' })
  @ApiBearerAuth('access-token')
  //endregion
  @ApiResponse({ status: 201, type: CharacteristicsMaterialCreateResponseDto })
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(CharacteristicsMaterialCreateResponseDto)
  @Post()
  async createEP(
    @Body() dto: CharacteristicsMaterialCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @Param('handbookId', ParseUUIDPipe)
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    @Param('categoryMaterialId', ParseUUIDPipe)
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @Param('materialId', ParseUUIDPipe)
    materialId: EntityUrlParamCommand.RequestUuidParam,
    @User() userInfoFromJWT: IJWTPayload,
  ): Promise<CharacteristicsMaterialCreateResponseDto> {
    try {
      const { ok, data } = await this.characteristicsMaterialService.create(
        dto,
        handbookId,
        categoryMaterialId,
        materialId,
        userInfoFromJWT.uuid,
      );
      return okResponseHandler(ok, data, CharacteristicsMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.CHARACTERISTICS_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(CharacteristicsMaterialUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(CharacteristicsMaterialUpdateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменение CharacteristicsMaterial по id CharacteristicsMaterial' })
  @ApiResponse({ status: 200, type: CharacteristicsMaterialUpdateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(CharacteristicsMaterialUpdateResponseDto)
  @Put('/:characteristicsMaterialId')
  async updateByIdEP(
    @Param('characteristicsMaterialId', ParseUUIDPipe)
    characteristicsMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: CharacteristicsMaterialUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<CharacteristicsMaterialUpdateResponseDto> {
    try {
      const { ok, data } = await this.characteristicsMaterialService.updateById(characteristicsMaterialId, dto);
      return okResponseHandler(ok, data, CharacteristicsMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.CHARACTERISTICS_MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(CharacteristicsMaterialDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Удаление CharacteristicsMaterial по id CharacteristicsMaterial',
  })
  @ApiResponse({ status: 200, type: CharacteristicsMaterialDeleteResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(CharacteristicsMaterialDeleteResponseDto)
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @Delete('/:characteristicsMaterialId')
  async deleteByIdEP(
    @Param('characteristicsMaterialId', ParseUUIDPipe)
    characteristicsMaterialId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<CharacteristicsMaterialDeleteResponseDto> {
    try {
      const { ok, data } = await this.characteristicsMaterialService.deleteById(characteristicsMaterialId);
      return okResponseHandler(ok, data, CharacteristicsMaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.CHARACTERISTICS_MATERIAL, urlParams);
    }
  }
}
