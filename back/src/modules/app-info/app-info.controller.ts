import { Body, Controller, Get, Inject, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { AppInfoUpdateRequestDto, AppInfoUpdateResponseDto } from './dto/controller/update-app-info.dto';
import { KFI } from '../../common/utils/di';
import { AppInfoGetCommand, AppInfoUpdateCommand } from '@numart/house-admin-contracts';
import { EntityName } from '../../common/types/entity.enum';
import { ILogger } from '../../common/types/main/logger.interface';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { AppInfoGetResponseDto } from './dto/controller/get-app-info.dto';
import { IAppInfoController } from './types/app-info.controller.interface';
import { IAppInfoService } from './types/app-info.service.interface';
import { AppInfoEntity } from './entities/app-info.entity';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { EUserTypeVariants } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { okResponseHandler } from '../../common/helpers/handlers/ok-response.handler';
import { errorResponseHandler } from '../../common/helpers/handlers/error-response.handler';

@ApiTags('Работа с AppInfo')
@Controller('app-info')
export class AppInfoController implements IAppInfoController {
  constructor(
    @Inject(KFI.APP_INFO_SERVICE)
    private readonly appInfoService: IAppInfoService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(AppInfoGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение AppInfo' })
  @ApiResponse({ status: 200, type: AppInfoGetResponseDto })
  //endregion
  @ZodSerializerDto(AppInfoGetResponseDto)
  @Get()
  async getEP(@UrlParams() urlParams: IUrlParams): Promise<AppInfoGetResponseDto> {
    try {
      const { ok, data } = await this.appInfoService.get();
      return okResponseHandler(ok, data, AppInfoEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.APP_INFO, urlParams);
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
      const { ok, data } = await this.appInfoService.update(dto);
      return okResponseHandler(ok, data, AppInfoEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.APP_INFO, urlParams);
    }
  }
}
