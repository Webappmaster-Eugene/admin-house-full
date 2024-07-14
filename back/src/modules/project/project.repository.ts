import { Inject, Injectable } from '@nestjs/common';
import { ProjectCreateRequestDto } from './dto/controller/create-project.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IProjectRepository } from './types/project.repository.interface';
import { ProjectUpdateRequestDto } from './dto/controller/update-project.dto';
import { EntityUrlParamCommand } from 'libs/contracts';
import { CountData } from '../../common/types/main/count.data';
import { ProjectEntity } from './entities/project.entity';
import { KFI } from '../../common/utils/di';
import { DEFAULT_PROJECT_DESCRIPTION, DEFAULT_PROJECT_NAME } from './lib/consts/project.default-data';
import { QUANTITY_LIMIT } from '../../common/consts/take-quantity.limitation';
import { existenceEntityHandler } from '../../common/helpers/handlers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { limitTakeHandler } from '../../common/helpers/handlers/take-limit.handler';

@Injectable()
export class ProjectsRepository implements IProjectRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(projectId: EntityUrlParamCommand.RequestUuidParam): Promise<ProjectEntity> {
    try {
      const concreteProject = await this.databaseService.project.findUnique({
        where: {
          uuid: projectId,
        },
        include: {
          organization: true,
          projectMembers: true,
          customer: true,
          responsibleManager: true,
        },
      });

      return existenceEntityHandler(concreteProject, ProjectEntity, EntityName.PROJECT) as ProjectEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAll(skip = 0, take = QUANTITY_LIMIT.TAKE_MAX_LIMIT): Promise<ProjectEntity[]> {
    limitTakeHandler(take);

    try {
      const allProjects = await this.databaseService.project.findMany({
        take,
        skip,
        include: {
          organization: true,
          projectMembers: true,
          customer: true,
          responsibleManager: true,
        },
      });
      return existenceEntityHandler(allProjects, ProjectEntity, EntityName.PROJECT) as ProjectEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAllInWorkspace(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    skip = 0,
    take = QUANTITY_LIMIT.TAKE_MAX_LIMIT,
  ): Promise<ProjectEntity[]> {
    limitTakeHandler(take);

    try {
      const allProjectsInWorkspace = await this.databaseService.project.findMany({
        where: {
          organization: {
            workspaceUuid: workspaceId,
          },
        },
        take,
        skip,
        include: {
          organization: true,
          projectMembers: true,
          customer: true,
          responsibleManager: true,
        },
      });
      return existenceEntityHandler(allProjectsInWorkspace, ProjectEntity, EntityName.PROJECT) as ProjectEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAllInOrganization(
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    skip = 0,
    take = QUANTITY_LIMIT.TAKE_MAX_LIMIT,
  ): Promise<ProjectEntity[]> {
    limitTakeHandler(take);

    try {
      const allProjectsInOrganization = await this.databaseService.project.findMany({
        where: {
          organizationUuid: organizationId,
        },
        take,
        skip,
        include: {
          organization: true,
          projectMembers: true,
          customer: true,
          responsibleManager: true,
        },
      });
      return existenceEntityHandler(allProjectsInOrganization, ProjectEntity, EntityName.PROJECT) as ProjectEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAllCount(): Promise<CountData> {
    try {
      const total = await this.databaseService.project.count({
        select: {
          _all: true, // Count all records
        },
      });
      return { total: total._all };
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async create(
    dto: ProjectCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
    organizationId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<ProjectEntity> {
    try {
      const { name, description, customerMail } = dto;

      const newProject = await this.databaseService.project.create({
        data: {
          name: name || DEFAULT_PROJECT_NAME,
          description: description || DEFAULT_PROJECT_DESCRIPTION,
          customerMail,
          organizationUuid: organizationId,
          responsibleManagerUuid: managerId,
          customerUuid: managerId,
        },
        include: {
          organization: true,
          projectMembers: true,
          customer: true,
          responsibleManager: true,
        },
      });
      return existenceEntityHandler(newProject, ProjectEntity, EntityName.PROJECT) as ProjectEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(projectId: EntityUrlParamCommand.RequestUuidParam, dto: ProjectUpdateRequestDto): Promise<ProjectEntity> {
    try {
      const { name, description, customerMail, customerUuid } = dto;

      const updatedProject = await this.databaseService.project.update({
        where: {
          uuid: projectId,
        },
        data: {
          name,
          description,
          customerMail,
          customerUuid,
        },
        include: {
          organization: true,
          projectMembers: true,
          customer: true,
          responsibleManager: true,
        },
      });

      return existenceEntityHandler(updatedProject, ProjectEntity, EntityName.PROJECT) as ProjectEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(projectId: EntityUrlParamCommand.RequestUuidParam): Promise<ProjectEntity> {
    try {
      const deletedProject = await this.databaseService.project.delete({
        where: {
          uuid: projectId,
        },
        include: {
          organization: true,
          projectMembers: true,
          customer: true,
          responsibleManager: true,
        },
      });

      return existenceEntityHandler(deletedProject, ProjectEntity, EntityName.PROJECT) as ProjectEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
