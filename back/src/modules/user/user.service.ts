import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RolesService } from '../roles/roles.service';
import { UserRequestDto, UserUpdateRequestDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { UserServiceInterface } from './user.repository.interface';
import { WorkspaceService } from '../workspace/workspace.service';
import { defaultRoleId } from './auth/lib/auth.consts';
import { UserEntity } from './entities/user.entity';
import { WorkspaceEntity } from '../workspace/entities/workspace.entity';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly rolesService: RolesService,
    private readonly configService: ConfigService,
    private readonly workspaceService: WorkspaceService,
    private readonly logger: Logger,
  ) {}

  async getUserById(id: number): Promise<UserEntity> {
    try {
      const findedUser = await this.prismaService.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          firstName: true,
          email: true,
          phone: true,
          address: true,
          updatedAt: true,
          createdAt: true,
          creator_of_workspace: {
            include: { workspace_creator: true },
          },
        },
      });

      return new UserEntity(findedUser);
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

  async getUserByEmail(email: string): Promise<UserEntity> {
    try {
      const findedUser = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });

      return new UserEntity(findedUser);
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

  async deleteUser(id: number): Promise<UserEntity> {
    try {
      const deletedUser = await this.prismaService.user.delete({
        where: {
          id,
        },
      });

      return new UserEntity(deletedUser);
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

  async getAllUsers(): Promise<UserEntity[]> {
    try {
      const allUsers = await this.prismaService.user.findMany();
      return allUsers.map((user) => new UserEntity(user));
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
  }: UserRequestDto): Promise<UserEntity> {
    let userExists: boolean | unknown;
    let newUserWorkspace: null | WorkspaceEntity;
    let newUserWithWorkspace: null | UserEntity;

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
          firstName,
          secondName,
          password: hashedPassword,
          address,
          info,
          documents,
          roleId: userRoleId,
          creatorOfWorkspaceId: null,
        },
      });

      if (roleId === 2) {
        newUserWorkspace = await this.workspaceService.createWorkspaceByUserId(
          {},
          newUser.id,
        );

        newUserWithWorkspace = await this.addExistedWorkspaceToManager(
          newUser.id,
          newUserWorkspace.id,
        );
      }

      return new UserEntity(newUserWithWorkspace || newUser);
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
  ): Promise<UserEntity> {
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
          firstName,
          secondName,
          address,
          info,
          documents,
        },
      });
      return new UserEntity(updatedUser);
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
  ): Promise<UserEntity> {
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
      const updatedManagerUser = await this.prismaService.user.update({
        where: {
          id: workspaceCreatorId,
        },
        data: {
          creatorOfWorkspaceId: workspaceId,
        },
      });
      return new UserEntity(updatedManagerUser);
    } catch (error) {
      this.logger.error(
        `Произошла ошибка при добавлении Workspace ${workspaceId} менеджеру с ${workspaceCreatorId}`,
        error.stack,
        UserService.name,
      );
      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addUserToManagerWorkspace(
    userId: number,
    managerId: number,
  ): Promise<UserEntity> {
    let userExists: unknown;

    try {
      userExists = await this.prismaService.user.findUnique({
        where: {
          id: userId,
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
        `Пользователя с таким id ${userId} не существует!`,
        UserService.name,
      );

      throw new NotFoundException(Error, {
        description: 'Такого пользователя не существует',
      });
    }

    try {
      const workspaceForAdding =
        await this.workspaceService.getWorkspaceByManagerId(managerId);

      if (workspaceForAdding) {
        const updatedUser = await this.prismaService.user.update({
          where: {
            id: userId,
          },
          data: {
            memberOfWorkspaceId: workspaceForAdding?.id,
          },
        });
        return new UserEntity(updatedUser);
      } else {
        this.logger.error(
          `Произошла ошибка при добавлении пользователя с id ${userId} в Workspace менеджера id ${managerId}`,
          UserService.name,
        );
        throw new HttpException(
          `Произошла ошибка при добавлении пользователя с id ${userId} в Workspace менеджера id ${managerId}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      this.logger.error(
        `Произошла ошибка при добавлении пользователя с id ${userId} в Workspace`,
        error.stack,
        UserService.name,
      );
      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUserById(id: number): Promise<UserEntity> {
    let userExists: boolean | unknown;

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
      return new UserEntity(deletedUser);
    } catch (error) {
      this.logger.error(
        `Произошла ошибка при удалении пользователя с id ${id}`,
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
