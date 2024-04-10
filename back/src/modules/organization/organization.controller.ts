import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Inject,
  Param,
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
  ApiTags,
} from '@nestjs/swagger';
import { OrganizationEntity } from './entities/organization.entity';
import {
  ExternalResponse,
  UniversalExternalResponse,
} from '../../common/types/responses/universal-external-response.interface';
import { toResponseClientArray } from '../../common/utils/mappers';
import { WorkspaceCreateResponseDto } from '../workspace/dto/controller/create-workspace.dto';
import { zodToOpenAPI } from 'nestjs-zod';
import {
  OrganizationCreateCommand,
  OrganizationGetAllCommand,
  OrganizationGetCommand,
  OrganizationUpdateCommand,
} from '../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { IOrganizationService } from './types/organization.service.interface';
import { OrganizationGetAllResponseDto } from './dto/controller/get-all-organizations.dto';
import { OrganizationGetResponseDto } from './dto/controller/get-organization.dto';
import { OrganizationDeleteResponseDto } from './dto/controller/delete-organization.dto';
import {
  OrganizationUpdateRequestDto,
  OrganizationUpdateResponseDto,
} from './dto/controller/update-organization.dto';
import {
  OrganizationCreateRequestDto,
  OrganizationCreateResponseDto,
} from './dto/controller/create-organization.dto';
import { OrganizationDeleteCommand } from '../../../libs/contracts';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { WorkspaceManagerGuard } from '../../common/guards/workspace.guard';
import { User } from '../../common/decorators/user.decorator';
import { IOrganizationController } from './types/organization.controller.interface';

@ApiTags('Работа с Organization пользователей')
@Controller('organizations')
export class OrganizationController {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_ORGANIZATION_SERVICE)
    private readonly organizationService: IOrganizationService,
  ) {}

  @ApiOkResponse({
    schema: zodToOpenAPI(OrganizationGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение Organization по id' })
  @ApiResponse({ status: 200, type: OrganizationGetResponseDto })
  @Get('/:id')
  async getByIdEP(
    @Param('id') id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalExternalResponse<OrganizationGetResponseDto | null>> {
    const responseData = await this.organizationService.getById(id);
    if (responseData.ok) {
      return new ExternalResponse<OrganizationGetResponseDto>(
        new OrganizationGetResponseDto(responseData.data),
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

  @ApiOkResponse({
    schema: zodToOpenAPI(OrganizationGetAllCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получить все Organizations пользователей' })
  @ApiResponse({ status: 200, type: [OrganizationGetAllResponseDto] })
  @RolesSetting('MANAGER', 'ADMIN')
  @UseGuards(AuthGuard)
  @Get()
  async getAllEP(): Promise<
    UniversalExternalResponse<OrganizationGetAllResponseDto[] | null>
  > {
    const responseData = await this.organizationService.getAll();
    if (responseData.ok) {
      return new ExternalResponse<OrganizationGetAllResponseDto[]>(
        toResponseClientArray(responseData.data, OrganizationGetAllResponseDto),
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

  @ApiBody({
    schema: zodToOpenAPI(OrganizationCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(OrganizationCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание Organization' })
  @ApiResponse({ status: 201, type: OrganizationEntity })
  @RolesSetting('MANAGER')
  @UseGuards(AuthGuard, WorkspaceManagerGuard)
  @Post()
  async createEP(
    @Body() dto: OrganizationCreateRequestDto,
    @User() userInfo: IJWTPayload,
  ): Promise<UniversalExternalResponse<OrganizationCreateResponseDto>> {
    // в create нужно передать id Workspace, в котором создается Organization
    const responseData = await this.organizationService.create(dto, userInfo);
    if (responseData.ok) {
      return new ExternalResponse<WorkspaceCreateResponseDto>(
        new WorkspaceCreateResponseDto(responseData.data),
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

  @ApiBody({
    schema: zodToOpenAPI(OrganizationUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(OrganizationUpdateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменение Organization по id Organization' })
  @ApiResponse({ status: 200, type: OrganizationUpdateResponseDto })
  @Put('/:id')
  async updateByIdEP(
    @Body() dto: OrganizationUpdateRequestDto,
    @Param('id', ParseIntPipe)
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalExternalResponse<OrganizationUpdateResponseDto>> {
    const responseData = await this.organizationService.updateById(id, dto);
    if (responseData.ok) {
      return new ExternalResponse<OrganizationUpdateResponseDto>(
        new OrganizationUpdateResponseDto(responseData.data),
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

  @ApiOkResponse({
    schema: zodToOpenAPI(OrganizationDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Удаление Organization по id Organization',
  })
  @ApiResponse({ status: 200, type: OrganizationDeleteResponseDto })
  @Delete('/:id')
  async deleteByIdEP(
    @Param('id', ParseUUIDPipe) id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalExternalResponse<OrganizationDeleteResponseDto>> {
    const responseData = await this.organizationService.deleteById(id);
    if (responseData.ok) {
      return new ExternalResponse<OrganizationDeleteResponseDto>(
        new OrganizationDeleteResponseDto(responseData.data),
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
