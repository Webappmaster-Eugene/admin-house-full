import { Inject, Injectable } from '@nestjs/common';
import { ProjectCreateRequestDto } from './dto/controller/create-project.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IProjectRepository } from './types/project.repository.interface';
import { ProjectUpdateRequestDto } from './dto/controller/update-project.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { ProjectEntity } from './entities/project.entity';
import { toEntityArray } from '../../common/utils/mappers';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import {
  DEFAULT_PROJECT_DESCRIPTION,
  DEFAULT_PROJECT_NAME,
} from './lib/consts/project.default-data';

@Injectable()
export class ProjectsRepository implements IProjectRepository {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly prismaService: IPrismaService,
  ) {}

  async getById(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<ProjectEntity> {
    const concreteProject = await this.prismaService.organization.findUnique({
      where: {
        uuid: id,
      },
    });

    return new ProjectEntity(concreteProject);
  }

  async getAll(): Promise<ProjectEntity[]> {
    const allProjects = await this.prismaService.project.findMany();
    return toEntityArray<ProjectEntity>(allProjects, ProjectEntity);
  }

  async getAllCount(): Promise<CountData> {
    const total = await this.prismaService.project.count({
      select: {
        _all: true, // Count all records
      },
    });
    return { total: total._all };
  }

  async create(
    dto: ProjectCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
    organizationId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<ProjectEntity> {
    const { name, description, customerMail } = dto;

    const newProject = await this.prismaService.project.create({
      data: {
        name: name || DEFAULT_PROJECT_NAME,
        description: description || DEFAULT_PROJECT_DESCRIPTION,
        customerMail,
        organizationUuid: organizationId,
        responsibleManagerUuid: managerId,
        customerUuid: managerId,
      },
    });
    return new ProjectEntity(newProject);
  }

  async updateById(
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: ProjectUpdateRequestDto,
  ): Promise<ProjectEntity> {
    const { name, description, customerMail, customerUuid } = dto;

    const updatedProject = await this.prismaService.project.update({
      where: {
        uuid: id,
      },
      data: {
        name,
        description,
        customerMail,
        customerUuid,
      },
    });
    return new ProjectEntity(updatedProject);
  }

  async deleteById(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<ProjectEntity> {
    const deletedProject = await this.prismaService.project.delete({
      where: {
        uuid: id,
      },
    });
    return new ProjectEntity(deletedProject);
  }
}
