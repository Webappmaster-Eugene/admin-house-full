import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Inject,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
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
} from '@nestjs/swagger';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import {
  RoleCreateRequestDto,
  RoleCreateResponseDto,
} from './dto/controller/create-role.dto';
import { IRoleService } from './types/role.service.interface';
import {
  RoleUpdateRequestDto,
  RoleUpdateResponseDto,
} from './dto/controller/update-role.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { ExternalResponse } from '../../common/types/responses/universal-external-response.interface';
import { RoleGetResponseDto } from './dto/controller/get-role.dto';
import { RoleGetAllResponseDto } from './dto/controller/get-all-roles.dto';
import { RoleDeleteResponseDto } from './dto/controller/delete-role.dto';
import { EUserTypeVariants } from '@prisma/client';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import {
  RoleCreateCommand,
  RoleDeleteCommand,
  RoleGetAllCommand,
  RoleGetCommand,
  RoleUpdateCommand,
} from '../../../libs/contracts';
import { RoleEntity } from './entities/role.entity';
import { jsonStringify } from '../../common/helpers/stringify';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { errorExtractor } from '../../common/helpers/inner-error.extractor';
import { EntityName } from '../../common/types/entity.enum';
import {
  IUrlParams,
  UrlParams,
} from '../../common/decorators/url-params.decorator';
import { ILogger } from '../../common/types/main/logger.interface';
import { IRoleController } from './types/role.controller.interface';
import { BACKEND_ERRORS } from '../../common/errors/errors.backend';

@Controller('role')
export class RolesController implements IRoleController {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_ROLE_SERVICE)
    private readonly rolesService: IRoleService,
    @Inject(KEYS_FOR_INJECTION.I_LOGGER) private readonly logger: ILogger,
  ) {}

  @ApiOkResponse({
    schema: zodToOpenAPI(RoleGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получить информацию о роли по ее id' })
  @ApiResponse({ status: 200, type: RoleGetResponseDto })
  @UseGuards(AuthGuard)
  @ZodSerializerDto(RoleGetResponseDto)
  @Get('/:roleId')
  async getByIdEP(
    @Param('roleId', ParseIntPipe) id: EntityUrlParamCommand.RequestNumberParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<RoleGetResponseDto> {
    try {
      const responseData = await this.rolesService.getById(id);
      if (responseData.ok) {
        return new ExternalResponse<RoleEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.ROLE,
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
    schema: zodToOpenAPI(RoleGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получить информацию о роли по ее наименованию' })
  @ApiResponse({ status: 200, type: RoleGetResponseDto })
  // @UseGuards(AuthGuard)
  @ZodSerializerDto(RoleGetResponseDto)
  @Get('/name/:nameRole')
  async getByValueEP(
    @Param('nameRole', new ParseEnumPipe(EUserTypeVariants))
    value: EUserTypeVariants,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<RoleGetResponseDto> {
    try {
      const responseData = await this.rolesService.getByValue(value);
      if (responseData.ok) {
        return new ExternalResponse<RoleEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.ROLE,
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
    schema: zodToOpenAPI(RoleGetAllCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение всех ролей пользователей' })
  @ApiResponse({ status: 200, type: [RoleGetAllResponseDto] })
  // @UseGuards(AuthGuard)
  @ZodSerializerDto(RoleGetAllResponseDto)
  @Get()
  async getAllEP(
    @UrlParams() urlParams: IUrlParams,
  ): Promise<RoleGetAllResponseDto> {
    try {
      const responseData = await this.rolesService.getAll();
      if (responseData.ok) {
        return new ExternalResponse<RoleEntity[]>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.ROLE,
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
    schema: zodToOpenAPI(RoleCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(RoleCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создать новую роль для пользователя' })
  @ApiResponse({ status: 201, type: RoleCreateResponseDto })
  // @RolesSetting(EUserTypeVariants.ADMIN)
  // @UseGuards(AuthGuard)
  @ZodSerializerDto(RoleCreateResponseDto)
  @Post()
  async createEP(
    @Body() dto: RoleCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<RoleCreateResponseDto> {
    try {
      const responseData = await this.rolesService.create(dto);
      if (responseData.ok) {
        return new ExternalResponse<RoleEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.ROLE,
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
    schema: zodToOpenAPI(RoleUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(RoleUpdateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменить роль по ее наименованию' })
  @ApiResponse({ status: 200, type: RoleUpdateResponseDto })
  // @RolesSetting(EUserTypeVariants.ADMIN)
  // @UseGuards(AuthGuard)
  @ZodSerializerDto(RoleGetResponseDto)
  @Put('/:roleUuid')
  async updateByIdEP(
    @Param('roleUuid', ParseUUIDPipe)
    roleUuid: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: RoleUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<RoleUpdateResponseDto> {
    try {
      const responseData = await this.rolesService.updateById(roleUuid, dto);
      if (responseData.ok) {
        return new ExternalResponse<RoleEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.ROLE,
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
    schema: zodToOpenAPI(RoleDeleteCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Удалить роль по ее id' })
  @ApiResponse({ status: 200, type: RoleDeleteResponseDto })
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
      const responseData = await this.rolesService.deleteById(roleUuid);
      if (responseData.ok) {
        return new ExternalResponse<RoleEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(
          error,
          EntityName.ROLE,
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
