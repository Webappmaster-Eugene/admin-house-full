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
import { PriceChangingGetResponseDto } from './dto/controller/get-price-changing.dto';
import {
  PriceChangingCreateRequestDto,
  PriceChangingCreateResponseDto,
} from './dto/controller/create-price-changing.dto';
import { PriceChangingGetAllResponseDto } from './dto/controller/get-all-price-changings.dto';
import {
  PriceChangingUpdateRequestDto,
  PriceChangingUpdateResponseDto,
} from './dto/controller/update-price-changing.dto';
import { PriceChangingDeleteResponseDto } from './dto/controller/delete-price-changing.dto';
import { IPriceChangingController } from './types/price-changing.controller.interface';
import { IPriceChangingService } from './types/price-changing.service.interface';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import {
  PriceChangingCreateCommand,
  PriceChangingDeleteCommand,
  PriceChangingGetAllCommand,
  PriceChangingGetCommand,
  PriceChangingUpdateCommand,
} from '../../../libs/contracts';
import { PriceChangingEntity } from './entities/price-changing.entity';
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

@ApiTags('Работа с PriceChanging пользователей')
@Controller('material/:materialId/price-changing')
export class PriceChangingController implements IPriceChangingController {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRICE_CHANGING_SERVICE)
    private readonly priceChangingService: IPriceChangingService,
    @Inject(KEYS_FOR_INJECTION.I_LOGGER) private readonly logger: ILogger,
  ) {}

  @ApiOkResponse({
    schema: zodToOpenAPI(PriceChangingGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение PriceChanging по id' })
  @ApiResponse({ status: 200, type: PriceChangingGetResponseDto })
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(PriceChangingGetResponseDto)
  @Get('/:priceChangingId')
  async getByIdEP(
    @Param('priceChangingId', ParseUUIDPipe)
    priceChangingId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<PriceChangingGetResponseDto> {
    try {
      const responseData =
        await this.priceChangingService.getById(priceChangingId);
      if (responseData.ok) {
        return new ExternalResponse<PriceChangingEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.PRICE_CHANGING,
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
    schema: zodToOpenAPI(PriceChangingGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получить все PriceChanging пользователей (менеджеров Workspace)',
  })
  @ApiResponse({ status: 200, type: [PriceChangingGetAllResponseDto] })
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(PriceChangingGetAllResponseDto)
  @Get()
  async getAllEP(
    @UrlParams() urlParams: IUrlParams,
  ): Promise<PriceChangingGetAllResponseDto> {
    try {
      const responseData = await this.priceChangingService.getAll();
      if (responseData.ok) {
        return new ExternalResponse<PriceChangingEntity[]>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.PRICE_CHANGING,
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
    schema: zodToOpenAPI(PriceChangingCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(PriceChangingCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание PriceChanging' })
  @ApiResponse({ status: 201, type: PriceChangingCreateResponseDto })
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(PriceChangingCreateResponseDto)
  @Post()
  async createEP(
    @Body() dto: PriceChangingCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @User() userInfoFromJWT: IJWTPayload,
  ): Promise<PriceChangingCreateResponseDto> {
    try {
      const responseData = await this.priceChangingService.create(
        dto,
        userInfoFromJWT.uuid,
      );
      if (responseData.ok) {
        return new ExternalResponse<PriceChangingEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.PRICE_CHANGING,
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
    schema: zodToOpenAPI(PriceChangingUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(PriceChangingUpdateCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Изменение PriceChanging пользователя по id PriceChanging',
  })
  @ApiResponse({ status: 200, type: PriceChangingUpdateResponseDto })
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(PriceChangingUpdateResponseDto)
  @Put('/:priceChangingId')
  async updateByIdEP(
    @Param('priceChangingId', ParseUUIDPipe)
    priceChangingId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: PriceChangingUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<PriceChangingUpdateResponseDto> {
    try {
      const responseData = await this.priceChangingService.updateById(
        priceChangingId,
        dto,
      );
      if (responseData.ok) {
        return new ExternalResponse<PriceChangingEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.PRICE_CHANGING,
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
    schema: zodToOpenAPI(PriceChangingDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary:
      'Удаление PriceChanging внутри Workspace менеджера по id PriceChanging',
  })
  @ApiResponse({ status: 200, type: PriceChangingDeleteResponseDto })
  @ZodSerializerDto(PriceChangingDeleteResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Delete('/:priceChangingId')
  async deleteByIdEP(
    @Param('priceChangingId', ParseUUIDPipe)
    priceChangingId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<PriceChangingDeleteResponseDto> {
    try {
      const responseData =
        await this.priceChangingService.deleteById(priceChangingId);
      if (responseData.ok) {
        return new ExternalResponse<PriceChangingEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.PRICE_CHANGING,
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
