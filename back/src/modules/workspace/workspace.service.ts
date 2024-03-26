import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import {
  WorkspaceRequestDto,
  WorkspaceResponseDto,
  WorkspaceToUpdateRequestDto,
} from './dto/workspace.dto';
import { WorkspaceServiceInterface } from './workspace.repository.interface';
import {
  defaultWorkspaceDescription,
  defaultWorkspaceName,
} from './workspace.default-data';

@Injectable()
export class WorkspaceService implements WorkspaceServiceInterface {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  async createWorkspaceByUserId({
    name = defaultWorkspaceName,
    description = defaultWorkspaceDescription,
    workspaceCreatorId,
  }: WorkspaceRequestDto): Promise<WorkspaceResponseDto> {
    try {
      const newWorkspace = await this.prismaService.workspace.create({
        data: {
          name: name + ` #${workspaceCreatorId}`,
          description: description + ` #${workspaceCreatorId}`,
          workspace_creator_id: workspaceCreatorId,
        },
        select: {
          id: true,
          name: true,
          description: true,
          workspace_members: true,
          workspace_creator_id: true,
          organizations: true,
          handbook_of_workspace_id: true,
          created_at: true,
          updated_at: true,
        },
      });
      this.logger.log(
        `Workspace created successfully - newWorkspaceId ${newWorkspace.id}`,
        WorkspaceService.name,
      );
      return new WorkspaceResponseDto(newWorkspace);
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

  async updateWorkspaceById(
    { name, description }: WorkspaceToUpdateRequestDto,
    id: number,
  ): Promise<WorkspaceResponseDto> {
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
          workspace_creator_id: true,
          organizations: true,
          handbook_of_workspace_id: true,
          created_at: true,
          updated_at: true,
        },
      });

      this.logger.log(
        `Workspace updated successfully - workspaceId ${id}`,
        WorkspaceService.name,
      );
      return new WorkspaceResponseDto(updatedWorkspace);
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

  async deleteWorkspaceById(id: number): Promise<WorkspaceResponseDto> {
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
          workspace_creator_id: true,
          organizations: true,
          handbook_of_workspace_id: true,
          created_at: true,
          updated_at: true,
        },
      });

      this.logger.log(
        `Workspace deleted successfully - workspaceId ${id}`,
        WorkspaceService.name,
      );
      return new WorkspaceResponseDto(deletedWorkspace);
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
  ): Promise<WorkspaceResponseDto> {
    try {
      const changingWorkspace = await this.prismaService.workspace.update({
        where: {
          id,
        },
        data: {
          workspace_creator_id: newOwnerId,
        },
        select: {
          id: true,
          name: true,
          description: true,
          workspace_members: true,
          workspace_creator_id: true,
          organizations: true,
          handbook_of_workspace_id: true,
          created_at: true,
          updated_at: true,
        },
      });

      this.logger.log(
        `Workspace's owner changed  successfully - workspaceId ${id}`,
        WorkspaceService.name,
      );
      return new WorkspaceResponseDto(changingWorkspace);
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

  async getAllWorkspaces(): Promise<WorkspaceResponseDto[]> {
    try {
      const allWorkspaces = await this.prismaService.workspace.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          workspace_members: true,
          workspace_creator_id: true,
          organizations: true,
          handbook_of_workspace_id: true,
          created_at: true,
          updated_at: true,
        },
      });
      const workspacesToView = allWorkspaces.map(
        (workspace) => new WorkspaceResponseDto(workspace),
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

  async getWorkspaceById(id: number): Promise<WorkspaceResponseDto> {
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
          workspace_creator_id: true,
          organizations: true,
          handbook_of_workspace_id: true,
          created_at: true,
          updated_at: true,
        },
      });
      const workspaceToView = new WorkspaceResponseDto(concreteWorkspace);

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
}
