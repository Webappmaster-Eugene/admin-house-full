import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import {
  WorkspaceRequestDto,
  WorkspaceToUpdateRequestDto,
} from './dto/workspace.dto';
import { WorkspaceServiceInterface } from './workspace.repository.interface';
import {
  defaultWorkspaceDescription,
  defaultWorkspaceName,
} from './workspace.default-data';
import { WorkspaceEntity } from './entities/workspace.entity';

@Injectable()
export class WorkspaceService implements WorkspaceServiceInterface {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  async createWorkspaceByUserId(
    { name, description }: WorkspaceRequestDto,
    userId: number,
  ): Promise<WorkspaceEntity> {
    const isWorkspaceExists = await this.getWorkspaceByManagerId(userId);

    if (!isWorkspaceExists) {
      try {
        const newWorkspace = await this.prismaService.workspace.create({
          data: {
            name: name || defaultWorkspaceName + ` #${userId}`,
            description:
              description || defaultWorkspaceDescription + ` #${userId}`,
            workspaceCreatorId: userId,
          },
          select: {
            id: true,
            name: true,
            description: true,
            workspace_members: true,
            workspaceCreatorId: true,
            organizations: true,
            handbookOfWorkspaceId: true,
            createdAt: true,
            updatedAt: true,
          },
        });
        this.logger.log(
          `Workspace created successfully - newWorkspaceId ${newWorkspace.id}`,
          WorkspaceService.name,
        );
        return new WorkspaceEntity(newWorkspace);
      } catch (error) {
        throw new HttpException(
          `${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      this.logger.error(
        `Произошла ошибка при создании workspace для менеджера с id ${userId}. У пользователя уже есть один Workspace!`,
        WorkspaceService.name,
      );

      throw new HttpException(
        `Произошла ошибка при создании workspace для менеджера с id ${userId}. У пользователя уже есть один Workspace!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateWorkspaceById(
    { name, description }: WorkspaceToUpdateRequestDto,
    id: number,
  ): Promise<WorkspaceEntity> {
    try {
      const updatedWorkspace = await this.prismaService.workspace.update({
        where: {
          id,
        },
        data: {
          name,
          description,
        },
        select: {
          id: true,
          name: true,
          description: true,
          workspace_members: true,
          workspaceCreatorId: true,
          organizations: true,
          handbookOfWorkspaceId: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      this.logger.log(
        `Workspace updated successfully - workspaceId ${id}`,
        WorkspaceService.name,
      );
      return new WorkspaceEntity(updatedWorkspace);
    } catch (error) {
      // if (error instanceof Prisma.PrismaClientKnownRequestError) {
      //   if (error.code === 'P2002') {
      //   }

      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteWorkspaceById(id: number): Promise<WorkspaceEntity> {
    try {
      const deletedWorkspace = await this.prismaService.workspace.delete({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          workspace_members: true,
          workspaceCreatorId: true,
          organizations: true,
          handbookOfWorkspaceId: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      this.logger.log(
        `Workspace deleted successfully - workspaceId ${id}`,
        WorkspaceService.name,
      );
      return new WorkspaceEntity(deletedWorkspace);
    } catch (error) {
      // if (error instanceof Prisma.PrismaClientKnownRequestError) {
      //   if (error.code === 'P2002') {
      //   }

      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async changeWorkspaceOwner(
    id: number,
    newOwnerId: number,
  ): Promise<WorkspaceEntity> {
    try {
      const changingWorkspace = await this.prismaService.workspace.update({
        where: {
          id,
        },
        data: {
          workspaceCreatorId: newOwnerId,
        },
        select: {
          id: true,
          name: true,
          description: true,
          workspace_members: true,
          workspaceCreatorId: true,
          organizations: true,
          handbookOfWorkspaceId: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      this.logger.log(
        `Workspace's owner changed  successfully - workspaceId ${id}`,
        WorkspaceService.name,
      );
      return new WorkspaceEntity(changingWorkspace);
    } catch (error) {
      // if (error instanceof Prisma.PrismaClientKnownRequestError) {
      //   if (error.code === 'P2002') {
      //   }

      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllWorkspaces(): Promise<WorkspaceEntity[]> {
    try {
      const allWorkspaces = await this.prismaService.workspace.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          workspace_members: true,
          workspaceCreatorId: true,
          organizations: true,
          handbookOfWorkspaceId: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      const workspacesToView = allWorkspaces.map(
        (workspace) => new WorkspaceEntity(workspace),
      );
      this.logger.log(
        `All workspaces successfully received`,
        WorkspaceService.name,
      );
      return workspacesToView;
    } catch (error) {
      this.logger.error(
        `Произошла ошибка при запросе всех Workspaces`,
        error.stack,
        WorkspaceService.name,
      );
      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getWorkspaceById(id: number): Promise<WorkspaceEntity> {
    try {
      const concreteWorkspace = await this.prismaService.workspace.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          workspace_members: true,
          workspaceCreatorId: true,
          organizations: true,
          handbookOfWorkspaceId: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      const workspaceToView = new WorkspaceEntity(concreteWorkspace);

      this.logger.log(`Workspace received successfully`, WorkspaceService.name);
      return workspaceToView;
    } catch (error) {
      this.logger.error(
        `Произошла ошибка при получении Workspace c id ${id}`,
        error.stack,
        WorkspaceService.name,
      );
      throw new HttpException(
        `Произошла ошибка при получении Workspace c id ${id} - Workspace не существует`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getWorkspaceByManagerId(managerId: number): Promise<WorkspaceEntity> {
    try {
      const managerWorkspace = await this.prismaService.workspace.findUnique({
        where: {
          workspaceCreatorId: managerId,
        },
        select: {
          id: true,
          name: true,
          description: true,
          workspace_members: true,
          workspaceCreatorId: true,
          organizations: true,
          handbookOfWorkspaceId: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      const workspaceToView = new WorkspaceEntity(managerWorkspace);

      this.logger.log(`Workspace received successfully`, WorkspaceService.name);
      return workspaceToView;
    } catch (error) {
      this.logger.error(
        `Произошла ошибка при получении Workspace для менеджера с id ${managerId}`,
        error.stack,
        WorkspaceService.name,
      );
      throw new HttpException(
        `Произошла ошибка при получении Workspace для менеджера с id ${managerId}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
