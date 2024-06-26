import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RoleCreateRequestDto, RoleCreateResponseDto } from './dto/controller/create-role.dto';
import { IRoleService } from './types/role.service.interface';
import { RoleUpdateRequestDto, RoleUpdateResponseDto } from './dto/controller/update-role.dto';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { RoleGetResponseDto } from './dto/controller/get-role.dto';
import { RoleGetAllResponseDto } from './dto/controller/get-all-roles.dto';
import { RoleDeleteResponseDto } from './dto/controller/delete-role.dto';
import { EUserTypeVariants } from '.prisma/client';
import { KFI } from '../../common/utils/di';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { RoleCreateCommand, RoleDeleteCommand, RoleGetAllCommand, RoleGetCommand, RoleUpdateCommand } from '@numart/house-admin-contracts';
import { RoleEntity } from './entities/role.entity';
import { EntityName } from '../../common/types/entity.enum';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { ILogger } from '../../common/types/main/logger.interface';
import { IRoleController } from './types/role.controller.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { errorResponseHandler } from '../../common/helpers/handlers/error-response.handler';
import { okResponseHandler } from '../../common/helpers/handlers/ok-response.handler';
import { IQueryParams, QueryParams } from '../../common/decorators/query-params.decorator';

@ApiTags('Работа с ролями')
@Controller('role')
export class RolesController implements IRoleController {
  constructor(
    @Inject(KFI.ROLE_SERVICE)
    private readonly rolesService: IRoleService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(RoleGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получить информацию о роли по ее id' })
  @ApiResponse({ status: 200, type: RoleGetResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard)
  @ZodSerializerDto(RoleGetResponseDto)
  @Get('/by-id/:roleId')
  async getByIdEP(
    // DOC это именно получение по id (1,2,3,4), а не по uuid
    @Param('roleId', ParseIntPipe) roleId: EntityUrlParamCommand.RequestNumberParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<RoleGetResponseDto> {
    try {
      const { ok, data } = await this.rolesService.getById(roleId);
      return okResponseHandler(ok, data, RoleEntity, this.logger);
    } catch (error) {
      errorResponseHandler(this.logger, error, EntityName.ROLE, urlParams);
    }
  }

  //#region SWAGGER
  @ApiOkResponse({ schema: zodToOpenAPI(RoleGetCommand.ResponseSchema) })
  @ApiOperation({ summary: 'Получить информацию о роли по ее наименованию' })
  @ApiResponse({ status: 200, type: RoleGetResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard)
  @ZodSerializerDto(RoleGetResponseDto)
  @Get('/by-name/:roleName')
  async getByValueEP(
    @Param('roleName', new ParseEnumPipe(EUserTypeVariants))
    roleName: EUserTypeVariants,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<RoleGetResponseDto> {
    try {
      const { ok, data } = await this.rolesService.getByValue(roleName);
      return okResponseHandler(ok, data, RoleEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.ROLE, urlParams);
    }
  }

  //region SWAGGER
  @ApiQuery({
    schema: zodToOpenAPI(RoleGetAllCommand.RequestQuerySchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(RoleGetAllCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение всех ролей пользователей' })
  @ApiResponse({ status: 200, type: [RoleGetAllResponseDto] })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard)
  @ZodSerializerDto(RoleGetAllResponseDto)
  @Get()
  async getAllEP(@UrlParams() urlParams: IUrlParams, @QueryParams() queryParams?: IQueryParams): Promise<RoleGetAllResponseDto> {
    try {
      const { ok, data } = await this.rolesService.getAll(queryParams);
      return okResponseHandler(ok, data, RoleEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.ROLE, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(RoleCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(RoleCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создать новую роль для пользователя' })
  @ApiResponse({ status: 201, type: RoleCreateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(RoleCreateResponseDto)
  @Post()
  async createEP(@Body() dto: RoleCreateRequestDto, @UrlParams() urlParams: IUrlParams): Promise<RoleCreateResponseDto> {
    try {
      const { ok, data } = await this.rolesService.create(dto);
      return okResponseHandler(ok, data, RoleEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.ROLE, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(RoleUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(RoleUpdateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменить роль по ее наименованию' })
  @ApiResponse({ status: 200, type: RoleUpdateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(RoleUpdateResponseDto)
  @Put('/:roleUuid')
  async updateByIdEP(
    @Param('roleUuid', ParseUUIDPipe)
    roleUuid: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: RoleUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<RoleUpdateResponseDto> {
    try {
      const { ok, data } = await this.rolesService.updateById(roleUuid, dto);
      return okResponseHandler(ok, data, RoleEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.ROLE, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(RoleDeleteCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Удалить роль по ее id' })
  @ApiResponse({ status: 200, type: RoleDeleteResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(RoleDeleteResponseDto)
  @Delete('/:roleUuid')
  async deleteByIdEP(
    @Param('roleUuid', ParseUUIDPipe)
    roleUuid: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<RoleDeleteResponseDto> {
    try {
      const { ok, data } = await this.rolesService.deleteById(roleUuid);
      return okResponseHandler(ok, data, RoleEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.ROLE, urlParams);
    }
  }
}
