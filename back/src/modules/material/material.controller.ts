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
import { MaterialGetResponseDto } from './dto/controller/get-material.dto';
import {
  MaterialCreateRequestDto,
  MaterialCreateResponseDto,
} from './dto/controller/create-material.dto';
import { MaterialGetAllResponseDto } from './dto/controller/get-all-materials.dto';
import {
  MaterialUpdateRequestDto,
  MaterialUpdateResponseDto,
} from './dto/controller/update-material.dto';
import { MaterialDeleteResponseDto } from './dto/controller/delete-material.dto';
import { IMaterialController } from './types/material.controller.interface';
import { IMaterialService } from './types/material.service.interface';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import {
  MaterialCreateCommand,
  MaterialDeleteCommand,
  MaterialGetAllCommand,
  MaterialGetCommand,
  MaterialUpdateCommand,
} from '../../../libs/contracts';
import { MaterialEntity } from './entities/material.entity';
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

@ApiTags('Работа с Material пользователей')
@Controller('/workspace/:workspaceId/material')
export class MaterialController implements IMaterialController {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_HANDBOOK_SERVICE)
    private readonly materialService: IMaterialService,
    @Inject(KEYS_FOR_INJECTION.I_LOGGER) private readonly logger: ILogger,
  ) {}

  @ApiOkResponse({
    schema: zodToOpenAPI(MaterialGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение Material по id' })
  @ApiResponse({ status: 200, type: MaterialGetResponseDto })
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(MaterialGetResponseDto)
  @Get('/:materialId')
  async getByIdEP(
    @Param('materialId', ParseUUIDPipe)
    materialId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<MaterialGetResponseDto> {
    try {
      const responseData = await this.materialService.getById(materialId);
      if (responseData.ok) {
        return new ExternalResponse<MaterialEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.HANDBOOK,
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
    schema: zodToOpenAPI(MaterialGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получить все Material пользователей (менеджеров Workspace)',
  })
  @ApiResponse({ status: 200, type: [MaterialGetAllResponseDto] })
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(MaterialGetAllResponseDto)
  @Get()
  async getAllEP(
    @UrlParams() urlParams: IUrlParams,
  ): Promise<MaterialGetAllResponseDto> {
    try {
      const responseData = await this.materialService.getAll();
      if (responseData.ok) {
        return new ExternalResponse<MaterialEntity[]>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.HANDBOOK,
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
    schema: zodToOpenAPI(MaterialCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(MaterialCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание Material' })
  @ApiResponse({ status: 201, type: MaterialCreateResponseDto })
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
      const responseData = await this.materialService.create(
        dto,
        userInfoFromJWT.uuid,
      );
      if (responseData.ok) {
        return new ExternalResponse<MaterialEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.HANDBOOK,
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
    schema: zodToOpenAPI(MaterialUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(MaterialUpdateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменение Material пользователя по id Material' })
  @ApiResponse({ status: 200, type: MaterialUpdateResponseDto })
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
      const responseData = await this.materialService.updateById(
        materialId,
        dto,
      );
      if (responseData.ok) {
        return new ExternalResponse<MaterialEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.HANDBOOK,
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
    schema: zodToOpenAPI(MaterialDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Удаление Material внутри Workspace менеджера по id Material',
  })
  @ApiResponse({ status: 200, type: MaterialDeleteResponseDto })
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
      const responseData = await this.materialService.deleteById(materialId);
      if (responseData.ok) {
        return new ExternalResponse<MaterialEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.HANDBOOK,
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
