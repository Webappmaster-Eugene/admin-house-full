import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { ExternalResponse } from '../../common/types/responses/universal-external-response.interface';
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
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import {
  ResponsiblePartnerProducerCreateCommand,
  ResponsiblePartnerProducerDeleteCommand,
  ResponsiblePartnerProducerGetAllCommand,
  ResponsiblePartnerProducerGetCommand,
  ResponsiblePartnerProducerUpdateCommand,
} from '../../../libs/contracts';
import { ResponsiblePartnerProducerEntity } from './entities/responsible-partner-producer.entity';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { jsonStringify } from '../../common/helpers/stringify';
import { errorExtractor } from '../../common/helpers/inner-error.extractor';
import { EntityName } from '../../common/types/entity.enum';
import { BACKEND_ERRORS } from '../../common/errors/errors.backend';
import { ILogger } from '../../common/types/main/logger.interface';
import {
  IUrlParams,
  UrlParams,
} from '../../common/decorators/url-params.decorator';
import { WorkspaceMembersGuard } from '../../common/guards/workspace-members.guard';
import { EUserTypeVariants } from '@prisma/client';
import { WorkspaceCreatorGuard } from '../../common/guards/workspace-creator.guard';

@ApiTags('Работа с ResponsiblePartnerProducer')
@Controller('/responsible-partner-producer')
export class ResponsiblePartnerProducerController
  implements IResponsiblePartnerProducerController
{
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_RESPONSIBLE_PARTNER_PRODUCER_SERVICE)
    private readonly responsiblePartnerProducerService: IResponsiblePartnerProducerService,
    @Inject(KEYS_FOR_INJECTION.I_LOGGER) private readonly logger: ILogger,
  ) {}

  @ApiOkResponse({
    schema: zodToOpenAPI(ResponsiblePartnerProducerGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение ResponsiblePartnerProducer по id' })
  @ApiResponse({ status: 200, type: ResponsiblePartnerProducerGetResponseDto })
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(ResponsiblePartnerProducerGetResponseDto)
  @Get('/:responsiblePartnerProducerId')
  async getByIdEP(
    @Param('responsiblePartnerProducerId', ParseUUIDPipe)
    responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<ResponsiblePartnerProducerGetResponseDto> {
    try {
      const responseData = await this.responsiblePartnerProducerService.getById(
        responsiblePartnerProducerId,
      );
      if (responseData.ok) {
        return new ExternalResponse<ResponsiblePartnerProducerEntity>(
          responseData.data,
        );
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.RESPONSIBLE_PARTNER_PRODUCER,
          urlParams,
        );
        const response = new ExternalResponse(null, statusCode, message, [
          fullError,
        ]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(
        null,
        error.httpCode,
        BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description,
        [error],
      );
    }
  }

  @ApiOkResponse({
    schema: zodToOpenAPI(
      ResponsiblePartnerProducerGetAllCommand.ResponseSchema,
    ),
  })
  @ApiOperation({
    summary:
      'Получить все ResponsiblePartnerProducer пользователей (менеджеров Workspace)',
  })
  @ApiResponse({
    status: 200,
    type: [ResponsiblePartnerProducerGetAllResponseDto],
  })
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(ResponsiblePartnerProducerGetAllResponseDto)
  @Get()
  async getAllEP(
    @UrlParams() urlParams: IUrlParams,
  ): Promise<ResponsiblePartnerProducerGetAllResponseDto> {
    try {
      const responseData =
        await this.responsiblePartnerProducerService.getAll();
      if (responseData.ok) {
        return new ExternalResponse<ResponsiblePartnerProducerEntity[]>(
          responseData.data,
        );
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.RESPONSIBLE_PARTNER_PRODUCER,
          urlParams,
        );
        const response = new ExternalResponse(null, statusCode, message, [
          fullError,
        ]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(
        null,
        error.httpCode,
        BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description,
        [error],
      );
    }
  }

  @ApiBody({
    schema: zodToOpenAPI(ResponsiblePartnerProducerCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(
      ResponsiblePartnerProducerCreateCommand.ResponseSchema,
    ),
  })
  @ApiOperation({ summary: 'Создание ResponsiblePartnerProducer' })
  @ApiResponse({
    status: 201,
    type: ResponsiblePartnerProducerCreateResponseDto,
  })
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
      const responseData = await this.responsiblePartnerProducerService.create(
        dto,
        userInfoFromJWT.uuid,
      );
      if (responseData.ok) {
        return new ExternalResponse<ResponsiblePartnerProducerEntity>(
          responseData.data,
        );
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.RESPONSIBLE_PARTNER_PRODUCER,
          urlParams,
        );
        const response = new ExternalResponse(null, statusCode, message, [
          fullError,
        ]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(
        null,
        error.httpCode,
        BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description,
        [error],
      );
    }
  }

  @ApiBody({
    schema: zodToOpenAPI(ResponsiblePartnerProducerUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(
      ResponsiblePartnerProducerUpdateCommand.ResponseSchema,
    ),
  })
  @ApiOperation({
    summary:
      'Изменение ResponsiblePartnerProducer пользователя по id ResponsiblePartnerProducer',
  })
  @ApiResponse({
    status: 200,
    type: ResponsiblePartnerProducerUpdateResponseDto,
  })
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
      const responseData =
        await this.responsiblePartnerProducerService.updateById(
          responsiblePartnerProducerId,
          dto,
        );
      if (responseData.ok) {
        return new ExternalResponse<ResponsiblePartnerProducerEntity>(
          responseData.data,
        );
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.RESPONSIBLE_PARTNER_PRODUCER,
          urlParams,
        );
        const response = new ExternalResponse(null, statusCode, message, [
          fullError,
        ]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(
        null,
        error.httpCode,
        BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description,
        [error],
      );
    }
  }

  @ApiOkResponse({
    schema: zodToOpenAPI(
      ResponsiblePartnerProducerDeleteCommand.ResponseSchema,
    ),
  })
  @ApiOperation({
    summary:
      'Удаление ResponsiblePartnerProducer внутри Workspace менеджера по id ResponsiblePartnerProducer',
  })
  @ApiResponse({
    status: 200,
    type: ResponsiblePartnerProducerDeleteResponseDto,
  })
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
      const responseData =
        await this.responsiblePartnerProducerService.deleteById(
          responsiblePartnerProducerId,
        );
      if (responseData.ok) {
        return new ExternalResponse<ResponsiblePartnerProducerEntity>(
          responseData.data,
        );
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.RESPONSIBLE_PARTNER_PRODUCER,
          urlParams,
        );
        const response = new ExternalResponse(null, statusCode, message, [
          fullError,
        ]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(
        null,
        error.httpCode,
        BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description,
        [error],
      );
    }
  }
}
