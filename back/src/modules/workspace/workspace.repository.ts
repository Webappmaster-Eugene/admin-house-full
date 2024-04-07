import { Inject, Injectable } from '@nestjs/common';
import { EUserTypeVariants } from '@prisma/client';
import { WorkspaceCreateRequestDto } from './dto/controller/create-workspace.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IWorkspaceRepository } from './types/workspace.repository.interface';
import { WorkspaceUpdateRequestDto } from './dto/controller/update-workspace.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { WorkspaceEntity } from './entities/workspace.entity';
import { toEntityArray } from '../../common/utils/mappers/toEntityArray';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WorkspaceRepository implements IWorkspaceRepository {
  constructor(
    @Inject('IPrismaService') private readonly prismaService: IPrismaService,
  ) {}

  async create({
    name,
    description,
  }: WorkspaceCreateRequestDto): Promise<WorkspaceEntity> {
    const newWorkspace = await this.prismaService.workspace.create({
      data: {
        name,
        description,
      },
    });
    return new WorkspaceEntity(newWorkspace);
  }

  async updateById(
    id: string,
    { description }: WorkspaceUpdateRequestDto,
  ): Promise<WorkspaceEntity> {
    const updatedWorkspace = await this.prismaService.workspace.update({
      where: {
        uuid: id,
      },
      data: {
        description,
      },
    });
    return new WorkspaceEntity(updatedWorkspace);
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

  async deleteById(
    id: EntityUrlParamCommand.RequestParam,
  ): Promise<WorkspaceEntity> {
    const deletedWorkspace = await this.prismaService.workspace.delete({
      where: {
        uuid: id,
      },
    });
    return new WorkspaceEntity(deletedWorkspace);
  }

  async getById(
    id: EntityUrlParamCommand.RequestParamNumber,
  ): Promise<WorkspaceEntity> {
    console.log(id);
    console.log(typeof id);
    const concreteWorkspace = await this.prismaService.workspace.findUnique({
      where: {
        idWorkspace: id,
      },
    });
    console.log(concreteWorkspace);

    return new WorkspaceEntity(concreteWorkspace);
  }

  async getByValue(value: EUserTypeVariants): Promise<WorkspaceEntity> {
    const concreteWorkspace = await this.prismaService.workspace.findUnique({
      where: {
        name: value,
      },
    });

    return new WorkspaceEntity(concreteWorkspace);
  }
}
