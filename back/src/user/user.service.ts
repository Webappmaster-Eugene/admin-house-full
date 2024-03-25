import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RolesService } from '../roles/roles.service';
import {
  UserRequestDto,
  UserResponseDto,
  UserUpdateRequestDto,
} from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { UserServiceInterface } from './user.repository.interface';
import { WorkspaceService } from '../workspace/workspace.service';
import { defaultRoleId } from './auth/consts';
import { WorkspaceResponseDto } from '../workspace/dto/workspace.dto';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly rolesService: RolesService,
    private readonly configService: ConfigService,
    private readonly workspaceService: WorkspaceService,
    private readonly logger: Logger,
  ) {}

  async getUserById(id: number): Promise<UserResponseDto> {
    try {
      const findedUser = await this.prismaService.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          first_name: true,
          email: true,
          phone: true,
          address: true,
          updated_at: true,
          created_at: true,
          creator_of_workspace: {
            include: { workspace_creator: true },
          },
        },
      });

      return new UserResponseDto(findedUser);
    } catch (error) {
      // if (error instanceof Prisma.PrismaClientKnownRequestError) {
      //   if (error.code === 'P2002') {
      // if() {
      //
      // }
      this.logger.error(
        `Произошла ошибка при попытке получения всех пользователей из БД!`,
        UserService.name,
      );

      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserByEmail(email: string): Promise<UserResponseDto> {
    try {
      const findedUser = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });

      return new UserResponseDto(findedUser);
    } catch (error) {
      // if (error instanceof Prisma.PrismaClientKnownRequestError) {
      //   if (error.code === 'P2002') {
      // if() {
      //
      // }
      this.logger.error(
        `Произошла ошибка при попытке получения всех пользователей из БД!`,
        UserService.name,
      );

      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(id: number): Promise<UserResponseDto> {
    try {
      const deletedUser = await this.prismaService.user.delete({
        where: {
          id,
        },
      });

      return new UserResponseDto(deletedUser);
    } catch (error) {
      // if (error instanceof Prisma.PrismaClientKnownRequestError) {
      //   if (error.code === 'P2002') {
      // if() {
      //
      // }
      this.logger.error(
        `Произошла ошибка при попытке удаления пользователя с id ${id} из БД!`,
        UserService.name,
      );

      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    try {
      const allUsers = await this.prismaService.user.findMany();
      return allUsers.map((user) => new UserResponseDto(user));
    } catch (error) {
      this.logger.error(
        `Произошла ошибка при попытке получения всех пользователей из БД!`,
        UserService.name,
      );

      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createUser({
    firstName,
    secondName,
    phone,
    email,
    password,
    address,
    info,
    documents,
    roleId,
  }: UserRequestDto): Promise<UserResponseDto> {
    let userExists: boolean | unknown;
    let newUserWorkspace: WorkspaceResponseDto;
    let newUserWithWorkspace: UserResponseDto;

    const userRoleId = roleId ? roleId : defaultRoleId;

    try {
      userExists = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      this.logger.error(
        `Произошла ошибка при проверке существования пользователя с email ${email}!`,
        UserService.name,
      );
      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (userExists) {
      this.logger.error(
        `Пользователь с таким email ${email} уже существует!`,
        UserService.name,
      );

      throw new ConflictException({
        message: 'Конфликт уникальности',
        description: `Пользователь с таким email ${email} уже существует!`,
      });
    }

    this.logger.log(
      `Проверка пройдена успешно! Пользователя с таким email ${email} не существует, регистрация возможна.`,
      UserService.name,
    );

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await this.prismaService.user.create({
        data: {
          email,
          phone,
          first_name: firstName,
          second_name: secondName,
          password: hashedPassword,
          address,
          info,
          documents,
          role_id: userRoleId,
          // workspace_id: null,
        },
      });

      if (roleId === 2) {
        newUserWorkspace = await this.workspaceService.createWorkspaceByUserId({
          workspaceCreatorId: newUser.id,
        });

        //newUserWithWorkspace = await this.addWorkspaceToUser(
        //  Number(newUser.id),
        //  Number(newUserWorkspace.id),
        //);
      } else {
        // newUserWithWorkspace = await this.addWorkspaceToUser(
        //   newUser.id,
        //   newUserWorkspace.id,
        // );
      }

      return new UserResponseDto(newUser);
    } catch (error) {
      throw new HttpException(
        `Ошибка при создании и обработке пользователя в БД`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUserById(
    {
      firstName,
      secondName,
      phone,
      address,
      info,
      documents,
    }: UserUpdateRequestDto,
    id: number,
  ): Promise<UserResponseDto> {
    let userExists: unknown;

    try {
      userExists = await this.prismaService.user.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!userExists) {
      this.logger.error(
        `Пользователя с таким id ${id} не существует!`,
        UserService.name,
      );

      throw new NotFoundException(Error, {
        description: 'Такого пользователя не существует',
      });
    }

    try {
      const updatedUser = await this.prismaService.user.update({
        where: {
          id,
        },
        data: {
          phone,
          first_name: firstName,
          second_name: secondName,
          address,
          info,
          documents,
        },
      });
      return new UserResponseDto(updatedUser);
    } catch (error) {
      this.logger.error(
        `Произошла ошибка при обновлении пользователя`,
        error.stack,
        UserService.name,
      );
      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addExistedWorkspaceToManager(
    workspaceCreatorId: number,
    workspaceId: number,
  ): Promise<UserResponseDto> {
    let userExists: unknown;

    try {
      userExists = await this.prismaService.user.findUnique({
        where: {
          id: workspaceCreatorId,
        },
      });
    } catch (error) {
      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!userExists) {
      this.logger.error(
        `Пользователя с таким id ${workspaceCreatorId} не существует!`,
        UserService.name,
      );

      throw new NotFoundException(Error, {
        description: 'Такого пользователя не существует',
      });
    }

    try {
      //const updatedUser = await this.prismaService.user.update({
      //  where: {
      //   id: workspaceCreatorId,
      //  },
      // data: {
      //   workspace_id: workspaceId,
      //  },
      //});
      return new UserResponseDto(userExists);
    } catch (error) {
      this.logger.error(
        `Произошла ошибка при добавлении Workspace пользователю`,
        error.stack,
        UserService.name,
      );
      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /*
  async addUserToManagerWorkspace(userId: number): Promise<UserResponseDto> {
    let userExists: unknown;

    try {
      userExists = await this.prismaService.user.findUnique({
        where: {
          id: workspaceCreatorId,
        },
      });
    } catch (error) {
      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!userExists) {
      this.logger.error(
        `Пользователя с таким id ${workspaceCreatorId} не существует!`,
        UserService.name,
      );

      throw new NotFoundException(Error, {
        description: 'Такого пользователя не существует',
      });
    }

    try {
      const updatedUser = await this.prismaService.user.update({
        where: {
          id: workspaceCreatorId,
        },
        data: {
          workspace_id: workspaceId,
        },
      });
      return new UserResponseDto(updatedUser);
    } catch (error) {
      this.logger.error(
        `Произошла ошибка при добавлении Workspace пользователю`,
        error.stack,
        UserService.name,
      );
      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
*/

  async deleteUserById(id: number): Promise<UserResponseDto> {
    let userExists: unknown;

    try {
      userExists = await this.prismaService.user.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!userExists) {
      this.logger.error(
        `Пользователя с таким id ${id} не существует!`,
        UserService.name,
      );

      throw new NotFoundException(Error, {
        description: 'Такого пользователя не существует',
      });
    }

    try {
      const deletedUser = await this.prismaService.user.delete({
        where: {
          id,
        },
      });
      return new UserResponseDto(deletedUser);
    } catch (error) {
      this.logger.error(
        `Произошла ошибка при обновлении пользователя`,
        error.stack,
        UserService.name,
      );
      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
