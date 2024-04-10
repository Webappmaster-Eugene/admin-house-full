import { Inject, Injectable } from '@nestjs/common';
import { WorkspaceCreateRequestDto } from './dto/controller/create-workspace.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IWorkspaceRepository } from './types/workspace.repository.interface';
import { WorkspaceUpdateRequestDto } from './dto/controller/update-workspace.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { WorkspaceEntity } from './entities/workspace.entity';
import { toEntityArray } from '../../common/utils/mappers';
import {
  DEFAULT_WORKSPACE_DESCRIPTION,
  DEFAULT_WORKSPACE_NAME,
} from './lib/consts/workspace.default-data';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { WorkspaceChangeOwnerRequestDto } from './dto/controller/change-owner-workspace.dto';
import { WorkspaceAddUserToManagerRequestDto } from './dto/controller/add-to-manager-workspace.dto';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';

@Injectable()
export class WorkspaceRepository implements IWorkspaceRepository {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly prismaService: IPrismaService,
  ) {}

  async getById(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<WorkspaceEntity> {
    const findedWorkspace = await this.prismaService.workspace.findUnique({
      where: {
        uuid: id,
      },
    });

    return new WorkspaceEntity(findedWorkspace);
  }

  async getByManagerId(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<WorkspaceEntity> {
    const findedWorkspace = await this.prismaService.workspace.findUnique({
      where: {
        workspaceCreatorUuid: id,
      },
    });

    return new WorkspaceEntity(findedWorkspace);
  }

  async getAll(): Promise<WorkspaceEntity[]> {
    const allWorkspaces = await this.prismaService.workspace.findMany();
    return toEntityArray<WorkspaceEntity>(allWorkspaces, WorkspaceEntity);
  }

  async getAllCount(): Promise<CountData> {
    const total = await this.prismaService.workspace.count({
      select: {
        _all: true, // Count all records
      },
    });
    return { total: total._all };
  }

  async create(
    { name, description }: WorkspaceCreateRequestDto,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<WorkspaceEntity> {
    const newWorkspace = await this.prismaService.workspace.create({
      data: {
        name: name || DEFAULT_WORKSPACE_NAME + ` of user #${userId}`,
        description:
          description || DEFAULT_WORKSPACE_DESCRIPTION + ` of user #${userId}`,
        workspaceCreatorUuid: userId,
      },
    });
    return new WorkspaceEntity(newWorkspace);
  }

  async updateById(
    id: string,
    { name, description }: WorkspaceUpdateRequestDto,
  ): Promise<WorkspaceEntity> {
    const updatedWorkspace = await this.prismaService.workspace.update({
      where: {
        uuid: id,
      },
      data: {
        name,
        description,
      },
    });
    return new WorkspaceEntity(updatedWorkspace);
  }

  async deleteById(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<WorkspaceEntity> {
    const deletedWorkspace = await this.prismaService.workspace.delete({
      where: {
        uuid: id,
      },
    });
    return new WorkspaceEntity(deletedWorkspace);
  }

  async changeWorkspaceOwner(
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceChangeOwnerRequestDto,
  ): Promise<WorkspaceEntity> {
    const changedWorkspace = await this.prismaService.workspace.update({
      where: {
        uuid: id,
      },
      data: {
        workspaceCreatorUuid: dto.workspaceCreatorUuid,
      },
    });
    return new WorkspaceEntity(changedWorkspace);
  }

  async addUserToManagerWorkspace(
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceAddUserToManagerRequestDto,
  ): Promise<WorkspaceEntity> {
    const changedWorkspace = await this.prismaService.workspace.update({
      where: {
        uuid: id,
      },
      data: {
        workspaceCreatorUuid: dto.workspaceCreatorUuid,
      },
    });
    return new WorkspaceEntity(changedWorkspace);
  }
}
