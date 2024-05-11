import { Body, Controller, Get, HttpException, Inject, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { ExternalResponse } from '../../common/types/responses/universal-external-response.interface';
import { AppInfoUpdateRequestDto, AppInfoUpdateResponseDto } from './dto/controller/update-app-info.dto';
import { KFI } from '../../common/utils/di';
import { AppInfoGetCommand, AppInfoUpdateCommand } from '../../../libs/contracts';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { jsonStringify } from '../../common/helpers/stringify';
import { errorExtractor } from '../../common/helpers/inner-error.extractor';
import { EntityName } from '../../common/types/entity.enum';
import { ILogger } from '../../common/types/main/logger.interface';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { AppInfoGetResponseDto } from './dto/controller/get-app-info.dto';
import { IAppInfoController } from './types/app-info.controller.interface';
import { IAppInfoService } from './types/app-info.service.interface';
import { BACKEND_ERRORS } from '../../common/errors/errors.backend';
import { AppInfoEntity } from './entities/app-info.entity';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { EUserTypeVariants } from '@prisma/client';

@ApiTags('Работа с AppInfo')
@Controller('app-info')
export class AppInfoController implements IAppInfoController {
  constructor(
    @Inject(KFI.APP_INFO_SERVICE)
    private readonly appInfoService: IAppInfoService,
    @Inject(KFI.LOGGER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(AppInfoGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение AppInfo' })
  @ApiResponse({ status: 200, type: AppInfoGetResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(AppInfoGetResponseDto)
  @UseGuards(AuthGuard)
  @Get()
  async getEP(@UrlParams() urlParams: IUrlParams): Promise<AppInfoGetResponseDto> {
    try {
      const responseData = await this.appInfoService.get();
      if (responseData.ok) {
        return new ExternalResponse<AppInfoEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(error, EntityName.APP_INFO, urlParams);
        const response = new ExternalResponse(null, statusCode, message, [fullError]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(null, error.httpCode, BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description, [error]);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(AppInfoUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(AppInfoUpdateCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Изменение AppInfo админом',
  })
  @ApiResponse({ status: 200, type: AppInfoUpdateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(AppInfoUpdateResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Put()
  async updateEP(@Body() dto: AppInfoUpdateRequestDto, @UrlParams() urlParams: IUrlParams): Promise<AppInfoUpdateResponseDto> {
    try {
      const responseData = await this.appInfoService.update(dto);
      if (responseData.ok) {
        return new ExternalResponse<AppInfoEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(error, EntityName.APP_INFO, urlParams);
        const response = new ExternalResponse(null, statusCode, message, [fullError]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(null, error.httpCode, BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description, [error]);
    }
  }
}
