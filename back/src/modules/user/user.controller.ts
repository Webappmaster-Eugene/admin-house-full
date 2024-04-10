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
import {
  UserUpdateRequestDto,
  UserUpdateResponseDto,
} from './dto/controller/update-user.dto';
import { User } from '../../common/decorators/user.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { UserEntity } from './entities/user.entity';
import { WorkspaceManagerGuard } from '../../common/guards/workspace.guard';
import { zodToOpenAPI } from 'nestjs-zod';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { IUserService } from './types/user.service.interface';
import { UserGetAllResponseDto } from './dto/controller/get-all-users.dto';
import {
  UserCreateCommand,
  UserGetAllCommand,
  UserGetCommand,
  UserUpdateCommand,
} from '../../../libs/contracts';
import {
  ExternalResponse,
  UniversalExternalResponse,
} from '../../common/types/responses/universal-external-response.interface';
import {
  UserCreateRequestDto,
  UserCreateResponseDto,
} from './dto/controller/create-user.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { UserGetResponseDto } from './dto/controller/get-user.dto';
import { RoleGetAllResponseDto } from '../roles/dto/controller/get-all-roles.dto';
import { toResponseClientArray } from '../../common/utils/mappers';
import { UserDeleteResponseDto } from './dto/controller/delete-user.dto';

@ApiTags('Работа с пользователями')
@Controller('users')
export class UserController {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_USER_SERVICE)
    private readonly userService: IUserService,
  ) {}

  @ApiOkResponse({
    schema: zodToOpenAPI(UserGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение пользователя по id' })
  @ApiResponse({ status: 200, type: UserGetResponseDto })
  @UseGuards(AuthGuard)
  @Get('/byId/:id')
  async getByIdEP(
    @Param('id', ParseUUIDPipe) id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalExternalResponse<UserGetResponseDto | null>> {
    const responseData = await this.userService.getById(id);
    if (responseData.ok) {
      return new ExternalResponse<UserGetResponseDto>(
        new UserGetResponseDto(responseData.data),
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
    schema: zodToOpenAPI(UserGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение пользователя по email' })
  @ApiResponse({ status: 200, type: UserGetResponseDto })
  @UseGuards(AuthGuard)
  @Get('/byEmail/:email')
  async getByEmailEP(
    @Param('email') email: EntityUrlParamCommand.RequestEmailParam,
  ): Promise<UniversalExternalResponse<UserGetResponseDto | null>> {
    const responseData = await this.userService.getByEmail(email);
    if (responseData.ok) {
      return new ExternalResponse<UserGetResponseDto>(
        new UserGetResponseDto(responseData.data),
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
    schema: zodToOpenAPI(UserGetAllCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [UserGetAllResponseDto] })
  @RolesSetting('ADMIN')
  @UseGuards(AuthGuard)
  @Get()
  async getAllEP(): Promise<
    UniversalExternalResponse<UserGetAllResponseDto[] | null>
  > {
    const responseData = await this.userService.getAll();
    if (responseData.ok) {
      return new ExternalResponse<UserGetAllResponseDto[]>(
        toResponseClientArray(responseData.data, UserGetAllResponseDto),
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
    schema: zodToOpenAPI(UserCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(UserCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, type: UserCreateResponseDto })
  @Post()
  async createEP(
    @Body() dto: UserCreateRequestDto,
    roleId?: EntityUrlParamCommand.RequestNumberParam,
  ): Promise<UniversalExternalResponse<UserCreateResponseDto>> {
    const responseData = await this.userService.create(dto, roleId);
    if (responseData.ok) {
      const run = new ExternalResponse<UserCreateResponseDto>(
        new UserCreateResponseDto(responseData.data),
      );
      console.log(run);
      return run;
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
    schema: zodToOpenAPI(UserUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(UserCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменение пользователя по его id' })
  @ApiResponse({ status: 200, type: UserUpdateResponseDto })
  @Put('/:id')
  async updateByIdEP(
    @Body() dto: UserUpdateRequestDto,
    @Param('id', ParseUUIDPipe) id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalExternalResponse<UserUpdateResponseDto>> {
    const responseData = await this.userService.updateById(id, dto);

    if (responseData.ok) {
      return new ExternalResponse<UserUpdateResponseDto>(
        new UserUpdateResponseDto(responseData.data),
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
    schema: zodToOpenAPI(UserCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Удаление пользователя по его id' })
  @ApiResponse({ status: 200, type: UserDeleteResponseDto })
  @Delete('/:id')
  async deleteByIdEP(
    @Param('id', ParseUUIDPipe) id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalExternalResponse<UserDeleteResponseDto>> {
    const responseData = await this.userService.deleteById(id);
    if (responseData.ok) {
      return new ExternalResponse<UserDeleteResponseDto>(
        new UserDeleteResponseDto(responseData.data),
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
    schema: zodToOpenAPI(UserGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение текущего пользователя (id, email)' })
  @ApiResponse({ status: 200, type: UserGetResponseDto })
  @UseGuards(AuthGuard)
  @Get('/me')
  async getCurrentUserEP(
    @User() userInfoFromJWT: IJWTPayload,
  ): Promise<UniversalExternalResponse<UserGetResponseDto | null>> {
    const responseData = await this.userService.getById(userInfoFromJWT.uuid);
    if (responseData.ok) {
      return new ExternalResponse<UserGetResponseDto>(
        new UserGetResponseDto(responseData.data),
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
