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
import { zodToOpenAPI } from 'nestjs-zod';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import {
  ExternalResponse,
  UniversalExternalResponse,
} from '../../common/types/responses/universal-external-response.interface';
import { HandbookGetResponseDto } from './dto/controller/get-handbook.dto';
import {
  HandbookCreateRequestDto,
  HandbookCreateResponseDto,
} from './dto/controller/create-handbook.dto';
import { HandbookGetAllResponseDto } from './dto/controller/get-all-handbooks.dto';
import { toResponseClientArray } from '../../common/utils/mappers';
import {
  HandbookUpdateRequestDto,
  HandbookUpdateResponseDto,
} from './dto/controller/update-handbook.dto';
import { HandbookDeleteResponseDto } from './dto/controller/delete-handbook.dto';
import { IHandbookController } from './types/handbook.controller.interface';
import { IHandbookService } from './types/handbook.service.interface';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import {
  HandbookCreateCommand,
  HandbookDeleteCommand,
  HandbookGetAllCommand,
  HandbookGetCommand,
  HandbookUpdateCommand,
} from '../../../libs/contracts';
import { WorkspaceManagerGuard } from '../../common/guards/workspace.guard';

@ApiTags('Работа с Handbook пользователей')
@Controller('handbooks')
export class HandbookController implements IHandbookController {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_HANDBOOK_SERVICE)
    private readonly handbookService: IHandbookService,
  ) {}

  @ApiOkResponse({
    schema: zodToOpenAPI(HandbookGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение Handbook по id' })
  @ApiResponse({ status: 200, type: HandbookGetResponseDto })
  @UseGuards(AuthGuard)
  @Get('/:id')
  async getByIdEP(
    @Param('id', ParseUUIDPipe) id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalExternalResponse<HandbookGetResponseDto | null>> {
    const responseData = await this.handbookService.getById(id);
    if (responseData.ok) {
      return new ExternalResponse<HandbookGetResponseDto>(
        new HandbookGetResponseDto(responseData.data),
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
    schema: zodToOpenAPI(HandbookGetAllCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получить все Handbook пользователей (менеджеров Workspace)',
  })
  @ApiResponse({ status: 200, type: [HandbookGetAllResponseDto] })
  @RolesSetting('MANAGER', 'ADMIN')
  @UseGuards(AuthGuard)
  @Get()
  async getAllEP(): Promise<
    UniversalExternalResponse<HandbookGetAllResponseDto[] | null>
  > {
    const responseData = await this.handbookService.getAll();
    if (responseData.ok) {
      return new ExternalResponse<HandbookGetAllResponseDto[]>(
        toResponseClientArray(responseData.data, HandbookGetAllResponseDto),
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
    schema: zodToOpenAPI(HandbookCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(HandbookCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание Handbook' })
  @ApiResponse({ status: 201, type: HandbookCreateResponseDto })
  @RolesSetting('MANAGER')
  @UseGuards(AuthGuard)
  @Post()
  async createEP(
    @Body() dto: HandbookCreateRequestDto,
    @User() userInfo: IJWTPayload,
  ): Promise<UniversalExternalResponse<HandbookCreateResponseDto>> {
    // в create нужно передать id пользователя, для которого создается handbook
    const responseData = await this.handbookService.create(dto, userInfo);
    if (responseData.ok) {
      return new ExternalResponse<HandbookCreateResponseDto>(
        new HandbookCreateResponseDto(responseData.data),
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
    schema: zodToOpenAPI(HandbookUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(HandbookUpdateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменение Handbook пользователя по id Handbook' })
  @ApiResponse({ status: 200, type: HandbookUpdateResponseDto })
  @RolesSetting('MANAGER')
  @UseGuards(AuthGuard, WorkspaceManagerGuard)
  @Put('/:id')
  async updateByIdEP(
    @Param('/:id', ParseUUIDPipe) id: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: HandbookUpdateRequestDto,
    // @User() user: IJWTPayload,
  ): Promise<UniversalExternalResponse<HandbookUpdateResponseDto>> {
    const responseData = await this.handbookService.updateById(id, dto);
    if (responseData.ok) {
      return new ExternalResponse<HandbookUpdateResponseDto>(
        new HandbookUpdateResponseDto(responseData.data),
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
    schema: zodToOpenAPI(HandbookDeleteCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Удаление Handbook пользователя по id Handbook' })
  @ApiResponse({ status: 200, type: HandbookDeleteResponseDto })
  @Delete('/:id')
  async deleteByIdEP(
    @Param('id', ParseUUIDPipe) id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalExternalResponse<HandbookDeleteResponseDto>> {
    const responseData = await this.handbookService.deleteById(id);
    if (responseData.ok) {
      return new ExternalResponse<HandbookDeleteResponseDto>(
        new HandbookDeleteResponseDto(responseData.data),
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
