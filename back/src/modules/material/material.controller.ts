import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { MaterialGetResponseDto } from './dto/controller/get-material.dto';
import { MaterialCreateRequestDto, MaterialCreateResponseDto } from './dto/controller/create-material.dto';
import { MaterialGetAllResponseDto } from './dto/controller/get-all-materials.dto';
import { MaterialUpdateRequestDto, MaterialUpdateResponseDto } from './dto/controller/update-material.dto';
import { MaterialDeleteResponseDto } from './dto/controller/delete-material.dto';
import { IMaterialController } from './types/material.controller.interface';
import { IMaterialService } from './types/material.service.interface';
import { KFI } from '../../common/utils/di';
import {
  MaterialCreateCommand,
  MaterialDeleteCommand,
  MaterialGetAllCommand,
  MaterialGetCommand,
  MaterialUpdateCommand,
} from '../../../libs/contracts';
import { MaterialEntity } from './entities/material.entity';
import { EntityName } from '../../common/types/entity.enum';
import { ILogger } from '../../common/types/main/logger.interface';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { WorkspaceMembersGuard } from '../../common/guards/workspace-members.guard';
import { EUserTypeVariants } from '@prisma/client';
import { WorkspaceCreatorGuard } from '../../common/guards/workspace-creator.guard';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { okResponseHandler } from '../../common/helpers/ok-response.handler';
import { errorResponseHandler } from '../../common/helpers/error-response.handler';
import { IQueryParams, QueryParams } from '../../common/decorators/query-params.decorator';

@ApiTags('Работа с Material пользователей')
@Controller('/workspace/:workspaceId/material')
export class MaterialController implements IMaterialController {
  constructor(
    @Inject(KFI.MATERIAL_SERVICE)
    private readonly materialService: IMaterialService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(MaterialGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение Material по id' })
  @ApiResponse({ status: 200, type: MaterialGetResponseDto })
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(MaterialGetResponseDto)
  @Get('/:materialId')
  async getByIdEP(
    @Param('materialId', ParseUUIDPipe)
    materialId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<MaterialGetResponseDto> {
    try {
      const { ok, data } = await this.materialService.getById(materialId);
      return okResponseHandler(ok, data, MaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiQuery({
    schema: zodToOpenAPI(MaterialGetAllCommand.RequestQuerySchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(MaterialGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получить все Material пользователей (менеджеров Workspace)',
  })
  @ApiResponse({ status: 200, type: [MaterialGetAllResponseDto] })
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(MaterialGetAllResponseDto)
  @Get()
  async getAllEP(@UrlParams() urlParams: IUrlParams, @QueryParams() queryParams?: IQueryParams): Promise<MaterialGetAllResponseDto> {
    try {
      const { ok, data } = await this.materialService.getAll(queryParams);
      return okResponseHandler(ok, data, MaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(MaterialCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(MaterialCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание Material' })
  @ApiResponse({ status: 201, type: MaterialCreateResponseDto })
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(MaterialCreateResponseDto)
  @Post()
  async createEP(
    @Body() dto: MaterialCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @User() userInfoFromJWT: IJWTPayload,
  ): Promise<MaterialCreateResponseDto> {
    // в create нужно передать id пользователя, для которого создается material
    try {
      const { ok, data } = await this.materialService.create(dto, userInfoFromJWT.uuid);
      return okResponseHandler(ok, data, MaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(MaterialUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(MaterialUpdateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменение Material пользователя по id Material' })
  @ApiResponse({ status: 200, type: MaterialUpdateResponseDto })
  //endregion
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(MaterialUpdateResponseDto)
  @Put('/:materialId')
  async updateByIdEP(
    @Param('materialId', ParseUUIDPipe)
    materialId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: MaterialUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<MaterialUpdateResponseDto> {
    try {
      const { ok, data } = await this.materialService.updateById(materialId, dto);
      return okResponseHandler(ok, data, MaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.MATERIAL, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(MaterialDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Удаление Material внутри Workspace менеджера по id Material',
  })
  @ApiResponse({ status: 200, type: MaterialDeleteResponseDto })
  //endregion
  @ZodSerializerDto(MaterialDeleteResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Delete('/:materialId')
  async deleteByIdEP(
    @Param('materialId', ParseUUIDPipe)
    materialId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<MaterialDeleteResponseDto> {
    try {
      const { ok, data } = await this.materialService.deleteById(materialId);
      return okResponseHandler(ok, data, MaterialEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.MATERIAL, urlParams);
    }
  }
}
