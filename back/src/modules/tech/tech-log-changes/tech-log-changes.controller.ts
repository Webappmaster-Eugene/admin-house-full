import { Controller, Get, Inject, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { ITechLogChangesService } from './types/tech-log-changes.service.interface';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { TechLogChangesGetResponseDto } from './dto/controller/get-tech-log-changes.dto';
import { TechLogChangesGetAllResponseDto } from './dto/controller/get-all-tech-log-changes.dto';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { TechLogChangesEntity } from 'src/modules/tech/tech-log-changes/entities/tech-log-changes.entity';
import { EntityName } from '../../../common/types/entity.enum';
import { ILogger } from '../../../common/types/main/logger.interface';
import { ITechLogChangesController } from './types/tech-log-changes.controller.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { errorResponseHandler } from '../../../common/helpers/handlers/error-response.handler';
import { okResponseHandler } from '../../../common/helpers/handlers/ok-response.handler';
import { IQueryParams, QueryParams } from '../../../common/decorators/query-params.decorator';
import { KFI } from 'src/common/utils/di';
import { TechLogChangesGetAllCommand, TechLogChangesGetCommand } from '@numart/house-admin-contracts';
import { IUrlParams, UrlParams } from 'src/common/decorators/url-params.decorator';

@ApiTags('Работа с технической таблицей для логгирования действий всех пользователей')
@Controller('tech-log-changes')
export class TechLogChangesController implements ITechLogChangesController {
  constructor(
    @Inject(KFI.TECH_LOG_CHANGES_SERVICE)
    private readonly techLogChangessService: ITechLogChangesService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(TechLogChangesGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получить информацию о techLogChangesUuid по uuid' })
  @ApiResponse({ status: 200, type: TechLogChangesGetResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard)
  @ZodSerializerDto(TechLogChangesGetResponseDto)
  @Get('/:techLogChangesId')
  async getByUuidEP(
    @Param('techLogChangesUuid', ParseIntPipe) techLogChangesUuid: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<TechLogChangesGetResponseDto> {
    try {
      const { ok, data } = await this.techLogChangessService.getByUuid(techLogChangesUuid);
      return okResponseHandler(ok, data, TechLogChangesEntity, this.logger);
    } catch (error) {
      errorResponseHandler(this.logger, error, EntityName.TECH_LOG_CHANGES, urlParams);
    }
  }

  //region SWAGGER
  @ApiQuery({
    schema: zodToOpenAPI(TechLogChangesGetAllCommand.RequestQuerySchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(TechLogChangesGetAllCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение всех techLogChangesUuid' })
  @ApiResponse({ status: 200, type: [TechLogChangesGetAllResponseDto] })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard)
  @ZodSerializerDto(TechLogChangesGetAllResponseDto)
  @Get()
  async getAllEP(@UrlParams() urlParams: IUrlParams, @QueryParams() queryParams?: IQueryParams): Promise<TechLogChangesGetAllResponseDto> {
    try {
      const { ok, data } = await this.techLogChangessService.getAll(queryParams);
      return okResponseHandler(ok, data, TechLogChangesEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.TECH_LOG_CHANGES, urlParams);
    }
  }

  //region SWAGGER
  @ApiQuery({
    schema: zodToOpenAPI(TechLogChangesGetAllCommand.RequestQuerySchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(TechLogChangesGetAllCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение всех techLogChangesUuid внутри определенного Entity' })
  @ApiResponse({ status: 200, type: [TechLogChangesGetAllResponseDto] })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard)
  @ZodSerializerDto(TechLogChangesGetAllResponseDto)
  @Get()
  async getAllFromEntityEP(
    EntityNameToSearch: EntityName,
    @UrlParams() urlParams: IUrlParams,
    @QueryParams() queryParams?: IQueryParams,
  ): Promise<TechLogChangesGetAllResponseDto> {
    try {
      const { ok, data } = await this.techLogChangessService.getAllFromEntity(EntityNameToSearch, queryParams);
      return okResponseHandler(ok, data, TechLogChangesEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.TECH_LOG_CHANGES, urlParams);
    }
  }
}