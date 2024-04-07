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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolesSetting } from '../../common/decorators/projects.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import {
  RoleCreateRequestDto,
  RoleCreateResponseDto,
} from './dto/controller/create-project.dto';
import { IRoleController } from './types/project.controller.interface';
import { IRoleService } from './types/project.service.interface';
import {
  RoleUpdateRequestDto,
  RoleUpdateResponseDto,
} from './dto/controller/update-project.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import {
  ExternalResponse,
  UniversalExternalResponse,
} from '../../common/types/responses/universal-external-response.interface';
import { RoleGetResponseDto } from './dto/controller/get-project.dto';
import { RoleGetAllResponseDto } from './dto/controller/get-all-projects.dto';
import { RoleDeleteResponseDto } from './dto/controller/delete-project.dto';
import { toResponseClientArray } from '../../common/utils/mappers/toResponseClientArray';
import { EUserTypeVariants } from '@prisma/client';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';

@Controller('projects')
export class RolesController implements IRoleController {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_ROLE_SERVICE)
    private readonly projectsService: IRoleService,
  ) {}

  @ApiOperation({ summary: 'Создать новую роль для пользователя' })
  @ApiResponse({ status: 201, type: RoleCreateResponseDto })
  @Post()
  async createEP(
    @Body() dto: RoleCreateRequestDto,
  ): Promise<UniversalExternalResponse<RoleCreateResponseDto>> {
    console.log(dto);
    const responseData = await this.projectsService.create(dto);
    if (responseData.ok) {
      return new ExternalResponse<RoleCreateResponseDto>(
        new RoleCreateResponseDto(responseData.data),
      );
    } else {
      const response = new ExternalResponse(
        null,
        responseData.error.httpCode,
        'Internal error',
        [responseData.error],
      );
      throw new HttpException(response, responseData.error.httpCode);
    }
  }

  @ApiOperation({ summary: 'Получение всех ролей пользователей' })
  @ApiResponse({ status: 200, type: [RoleGetAllResponseDto] })
  // @RolesSetting('ADMIN')
  // @UseGuards(AuthGuard)
  @Get()
  async getAllEP(): Promise<
    UniversalExternalResponse<RoleGetAllResponseDto[] | null>
  > {
    const responseData = await this.projectsService.getAll();
    if (responseData.ok) {
      return new ExternalResponse<RoleGetAllResponseDto[]>(
        toResponseClientArray(responseData.data, RoleGetAllResponseDto),
      );
    } else {
      const response = new ExternalResponse(
        null,
        responseData.error.httpCode,
        'Internal error',
        [responseData.error],
      );
      throw new HttpException(response, responseData.error.httpCode);
    }
  }

  @ApiOperation({ summary: 'Получить информацию о роли по ее id' })
  @ApiResponse({ status: 200, type: RoleGetResponseDto })
  // @RolesSetting('ADMIN')
  // @UseGuards(AuthGuard)
  @Get('/:id')
  async getByIdEP(
    @Param('id', ParseIntPipe) id: EntityUrlParamCommand.RequestParamNumber,
  ): Promise<UniversalExternalResponse<RoleGetResponseDto | null>> {
    const responseData = await this.projectsService.getById(id);
    if (responseData.ok) {
      return new ExternalResponse<RoleGetResponseDto>(
        new RoleGetResponseDto(responseData.data),
      );
    } else {
      const response = new ExternalResponse(
        null,
        responseData.error.httpCode,
        'Internal error',
        [responseData.error],
      );
      throw new HttpException(response, responseData.error.httpCode);
    }
  }

  @ApiOperation({ summary: 'Получить информацию о роли по ее наименованию' })
  @ApiResponse({ status: 200, type: RoleGetResponseDto })
  // @RolesSetting('ADMIN')
  // @UseGuards(AuthGuard)
  @Get('/name/:value')
  async getByValueEP(
    @Param('value', new ParseEnumPipe(EUserTypeVariants))
    value: EUserTypeVariants,
  ): Promise<UniversalExternalResponse<RoleGetResponseDto | null>> {
    const responseData = await this.projectsService.getByValue(value);
    if (responseData.ok) {
      return new ExternalResponse<RoleGetResponseDto>(
        new RoleGetResponseDto(responseData.data),
      );
    } else {
      const response = new ExternalResponse(
        null,
        responseData.error.httpCode,
        'Internal error',
        [responseData.error],
      );
      throw new HttpException(response, responseData.error.httpCode);
    }
  }

  @ApiOperation({ summary: 'Изменить роль по ее наименованию' })
  @ApiResponse({ status: 200, type: RoleUpdateResponseDto })
  // @RolesSetting('ADMIN')
  // @UseGuards(AuthGuard)
  @Put('/:id')
  async updateByIdEP(
    @Param('id', ParseUUIDPipe) id: EntityUrlParamCommand.RequestParam,
    @Body() dto: RoleUpdateRequestDto,
  ): Promise<UniversalExternalResponse<RoleUpdateResponseDto>> {
    const responseData = await this.projectsService.updateById(id, dto);
    if (responseData.ok) {
      return new ExternalResponse<RoleUpdateResponseDto>(
        new RoleUpdateResponseDto(responseData.data),
      );
    } else {
      const response = new ExternalResponse(
        null,
        responseData.error.httpCode,
        'Internal error',
        [responseData.error],
      );
      throw new HttpException(response, responseData.error.httpCode);
    }
  }

  @ApiOperation({ summary: 'Удалить роль по ее id' })
  @ApiResponse({ status: 200, type: RoleDeleteResponseDto })
  // @RolesSetting('ADMIN')
  // @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteByIdEP(
    @Param('id', ParseUUIDPipe) id: EntityUrlParamCommand.RequestParam,
  ): Promise<UniversalExternalResponse<RoleDeleteResponseDto>> {
    const responseData = await this.projectsService.deleteById(id);
    if (responseData.ok) {
      return new ExternalResponse<RoleDeleteResponseDto>(
        new RoleDeleteResponseDto(responseData.data),
      );
    } else {
      const response = new ExternalResponse(
        null,
        responseData.error.httpCode,
        'Internal error',
        [responseData.error],
      );
      throw new HttpException(response, responseData.error.httpCode);
    }
  }
}
