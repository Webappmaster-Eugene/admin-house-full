import { Inject, Injectable } from '@nestjs/common';
import { EUserTypeVariants } from '@prisma/client';
import { ProjectCreateRequestDto } from './dto/controller/create-project.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IProjectRepository } from './types/project.repository.interface';
import { ProjectUpdateRequestDto } from './dto/controller/update-project.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { ProjectEntity } from './entities/project.entity';
import { toEntityArray } from '../../common/utils/mappers/toEntityArray';
import { PrismaService } from '../../prisma/prisma.service';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';

@Injectable()
export class ProjectsRepository implements IProjectRepository {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly prismaService: IPrismaService,
  ) {}

  async create({
    name,
    description,
  }: ProjectCreateRequestDto): Promise<ProjectEntity> {
    const newProject = await this.prismaService.project.create({
      data: {
        name,
        description,
      },
    });
    return new ProjectEntity(newProject);
  }

  async updateById(
    id: string,
    { description }: ProjectUpdateRequestDto,
  ): Promise<ProjectEntity> {
    const updatedProject = await this.prismaService.project.update({
      where: {
        uuid: id,
      },
      data: {
        description,
      },
    });
    return new ProjectEntity(updatedProject);
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

  async deleteById(
    id: EntityUrlParamCommand.RequestParam,
  ): Promise<ProjectEntity> {
    const deletedProject = await this.prismaService.project.delete({
      where: {
        uuid: id,
      },
    });
    return new ProjectEntity(deletedProject);
  }

  async getById(
    id: EntityUrlParamCommand.RequestParamNumber,
  ): Promise<ProjectEntity> {
    console.log(id);
    console.log(typeof id);
    const concreteProject = await this.prismaService.project.findUnique({
      where: {
        idProject: id,
      },
    });
    console.log(concreteProject);

    return new ProjectEntity(concreteProject);
  }

  async getByValue(value: EUserTypeVariants): Promise<ProjectEntity> {
    const concreteProject = await this.prismaService.project.findUnique({
      where: {
        name: value,
      },
    });

    return new ProjectEntity(concreteProject);
  }
}
