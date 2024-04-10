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
  UsePipes,
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
import { IRoleController } from './types/role.controller.interface';
import { IRoleService } from './types/role.service.interface';
import {
  RoleUpdateRequestDto,
  RoleUpdateResponseDto,
} from './dto/controller/update-role.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import {
  ExternalResponse,
  UniversalExternalResponse,
} from '../../common/types/responses/universal-external-response.interface';
import {
  RoleGetResponseDto,
  RoleGetResponseReturnDto,
} from './dto/controller/get-role.dto';
import { RoleGetAllResponseDto } from './dto/controller/get-all-roles.dto';
import { RoleDeleteResponseDto } from './dto/controller/delete-role.dto';
import { toResponseClientArray } from '../../common/utils/mappers';
import { EUserTypeVariants } from '@prisma/client';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { ZodSerializerDto, zodToOpenAPI, ZodValidationPipe } from 'nestjs-zod';
import {
  RoleCreateCommand,
  RoleDeleteCommand,
  RoleGetAllCommand,
  RoleGetCommand,
  RoleUpdateCommand,
} from '../../../libs/contracts';
import { RoleEntity } from './entities/role.entity';

@UsePipes(ZodValidationPipe)
@Controller('roles')
export class RolesController implements IRoleController {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_ROLE_SERVICE)
    private readonly rolesService: IRoleService,
  ) {}

  @ApiOkResponse({
    schema: zodToOpenAPI(RoleGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получить информацию о роли по ее id' })
  @ApiResponse({ status: 200, type: RoleGetResponseDto })
  // @RolesSetting('ADMIN')
  // @UseGuards(AuthGuard)
  @ZodSerializerDto(RoleGetResponseReturnDto)
  @Get('/:id')
  async getByIdEP(
    @Param('id', ParseIntPipe) id: EntityUrlParamCommand.RequestNumberParam, // : Promise<UniversalExternalResponse<RoleGetResponseDto | null>>
  ) {
    const responseData = await this.rolesService.getById(id);
    // const f = new RoleGetResponseDto(responseData.data);
    // // console.log(f);
    // // return f;
    // const obj = new ExternalResponse<RoleGetResponseDto>(f);
    // console.log(obj);
    // return obj;

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

  @ApiOkResponse({
    schema: zodToOpenAPI(RoleGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получить информацию о роли по ее наименованию' })
  @ApiResponse({ status: 200, type: RoleGetResponseDto })
  @RolesSetting('ADMIN')
  @UseGuards(AuthGuard)
  @Get('/name/:value')
  async getByValueEP(
    @Param('value', new ParseEnumPipe(EUserTypeVariants))
    value: EUserTypeVariants,
  ): Promise<UniversalExternalResponse<RoleGetResponseDto | null>> {
    const responseData = await this.rolesService.getByValue(value);
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

  @ApiOkResponse({
    schema: zodToOpenAPI(RoleGetAllCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение всех ролей пользователей' })
  @ApiResponse({ status: 200, type: [RoleGetAllResponseDto] })
  @UseGuards(AuthGuard)
  @Get()
  async getAllEP(): Promise<
    UniversalExternalResponse<RoleGetAllResponseDto[] | null>
  > {
    const responseData = await this.rolesService.getAll();
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

  @ApiBody({
    schema: zodToOpenAPI(RoleCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(RoleCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создать новую роль для пользователя' })
  @ApiResponse({ status: 201, type: RoleCreateResponseDto })
  @Post()
  async createEP(
    @Body() dto: RoleCreateRequestDto,
  ): Promise<UniversalExternalResponse<RoleCreateResponseDto>> {
    const responseData = await this.rolesService.create(dto);
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

  @ApiBody({
    schema: zodToOpenAPI(RoleUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(RoleUpdateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменить роль по ее наименованию' })
  @ApiResponse({ status: 200, type: RoleUpdateResponseDto })
  @RolesSetting('ADMIN')
  @UseGuards(AuthGuard)
  @Put('/:id')
  async updateByIdEP(
    @Param('id', ParseUUIDPipe) id: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: RoleUpdateRequestDto,
  ): Promise<UniversalExternalResponse<RoleUpdateResponseDto>> {
    const responseData = await this.rolesService.updateById(id, dto);
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

  @ApiOkResponse({
    schema: zodToOpenAPI(RoleDeleteCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Удалить роль по ее id' })
  @ApiResponse({ status: 200, type: RoleDeleteResponseDto })
  @RolesSetting('ADMIN')
  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteByIdEP(
    @Param('id', ParseUUIDPipe) id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalExternalResponse<RoleDeleteResponseDto>> {
    const responseData = await this.rolesService.deleteById(id);
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
