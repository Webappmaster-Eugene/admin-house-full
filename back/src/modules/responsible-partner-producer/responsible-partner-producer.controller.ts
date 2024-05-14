import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { ResponsiblePartnerProducerGetResponseDto } from './dto/controller/get-responsible-partner-producer.dto';
import {
  ResponsiblePartnerProducerCreateRequestDto,
  ResponsiblePartnerProducerCreateResponseDto,
} from './dto/controller/create-responsible-partner-producer.dto';
import { ResponsiblePartnerProducerGetAllResponseDto } from './dto/controller/get-all-responsible-partner-producers.dto';
import {
  ResponsiblePartnerProducerUpdateRequestDto,
  ResponsiblePartnerProducerUpdateResponseDto,
} from './dto/controller/update-responsible-partner-producer.dto';
import { ResponsiblePartnerProducerDeleteResponseDto } from './dto/controller/delete-responsible-partner-producer.dto';
import { IResponsiblePartnerProducerController } from './types/responsible-partner-producer.controller.interface';
import { IResponsiblePartnerProducerService } from './types/responsible-partner-producer.service.interface';
import { KFI } from '../../common/utils/di';
import {
  ResponsiblePartnerProducerCreateCommand,
  ResponsiblePartnerProducerDeleteCommand,
  ResponsiblePartnerProducerGetAllCommand,
  ResponsiblePartnerProducerGetCommand,
  ResponsiblePartnerProducerUpdateCommand,
} from '../../../libs/contracts';
import { ResponsiblePartnerProducerEntity } from './entities/responsible-partner-producer.entity';
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

@ApiTags('Работа с ResponsiblePartnerProducer')
@Controller('/responsible-partner-producer')
export class ResponsiblePartnerProducerController implements IResponsiblePartnerProducerController {
  constructor(
    @Inject(KFI.RESPONSIBLE_PARTNER_PRODUCER_SERVICE)
    private readonly responsiblePartnerProducerService: IResponsiblePartnerProducerService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponsiblePartnerProducerGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение ResponsiblePartnerProducer по id' })
  @ApiResponse({ status: 200, type: ResponsiblePartnerProducerGetResponseDto })
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(ResponsiblePartnerProducerGetResponseDto)
  @Get('/:responsiblePartnerProducerId')
  async getByIdEP(
    @Param('responsiblePartnerProducerId', ParseUUIDPipe)
    responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<ResponsiblePartnerProducerGetResponseDto> {
    try {
      const { ok, data } = await this.responsiblePartnerProducerService.getById(responsiblePartnerProducerId);
      return okResponseHandler(ok, data, ResponsiblePartnerProducerEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.RESPONSIBLE_PARTNER_PRODUCER, urlParams);
    }
  }

  //region SWAGGER
  @ApiQuery({
    schema: zodToOpenAPI(ResponsiblePartnerProducerGetAllCommand.RequestQuerySchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponsiblePartnerProducerGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получить все ResponsiblePartnerProducer пользователей (менеджеров Workspace)',
  })
  @ApiResponse({
    status: 200,
    type: [ResponsiblePartnerProducerGetAllResponseDto],
  })
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(ResponsiblePartnerProducerGetAllResponseDto)
  @Get()
  async getAllEP(
    @UrlParams() urlParams: IUrlParams,
    @QueryParams() queryParams?: IQueryParams,
  ): Promise<ResponsiblePartnerProducerGetAllResponseDto> {
    try {
      const { ok, data } = await this.responsiblePartnerProducerService.getAll(queryParams);
      return okResponseHandler(ok, data, ResponsiblePartnerProducerEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.RESPONSIBLE_PARTNER_PRODUCER, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(ResponsiblePartnerProducerCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponsiblePartnerProducerCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание ResponsiblePartnerProducer' })
  @ApiResponse({
    status: 201,
    type: ResponsiblePartnerProducerCreateResponseDto,
  })
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(ResponsiblePartnerProducerCreateResponseDto)
  @Post()
  async createEP(
    @Body() dto: ResponsiblePartnerProducerCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @User() userInfoFromJWT: IJWTPayload,
  ): Promise<ResponsiblePartnerProducerCreateResponseDto> {
    try {
      const { ok, data } = await this.responsiblePartnerProducerService.create(dto, userInfoFromJWT.uuid);
      return okResponseHandler(ok, data, ResponsiblePartnerProducerEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.RESPONSIBLE_PARTNER_PRODUCER, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(ResponsiblePartnerProducerUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponsiblePartnerProducerUpdateCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Изменение ResponsiblePartnerProducer пользователя по id ResponsiblePartnerProducer',
  })
  @ApiResponse({
    status: 200,
    type: ResponsiblePartnerProducerUpdateResponseDto,
  })
  //endregion
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(ResponsiblePartnerProducerUpdateResponseDto)
  @Put('/:responsiblePartnerProducerId')
  async updateByIdEP(
    @Param('responsiblePartnerProducerId', ParseUUIDPipe)
    responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: ResponsiblePartnerProducerUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<ResponsiblePartnerProducerUpdateResponseDto> {
    try {
      const { ok, data } = await this.responsiblePartnerProducerService.updateById(responsiblePartnerProducerId, dto);
      return okResponseHandler(ok, data, ResponsiblePartnerProducerEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.RESPONSIBLE_PARTNER_PRODUCER, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(ResponsiblePartnerProducerDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Удаление ResponsiblePartnerProducer внутри Workspace менеджера по id ResponsiblePartnerProducer',
  })
  @ApiResponse({
    status: 200,
    type: ResponsiblePartnerProducerDeleteResponseDto,
  })
  //endregion
  @ZodSerializerDto(ResponsiblePartnerProducerDeleteResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Delete('/:responsiblePartnerProducerId')
  async deleteByIdEP(
    @Param('responsiblePartnerProducerId', ParseUUIDPipe)
    responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<ResponsiblePartnerProducerDeleteResponseDto> {
    try {
      const { ok, data } = await this.responsiblePartnerProducerService.deleteById(responsiblePartnerProducerId);
      return okResponseHandler(ok, data, ResponsiblePartnerProducerEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.RESPONSIBLE_PARTNER_PRODUCER, urlParams);
    }
  }
}
