import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectCreateRequestDto } from './dto/controller/create-project.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IProjectRepository } from './types/project.repository.interface';
import { ProjectUpdateRequestDto } from './dto/controller/update-project.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { ProjectEntity } from './entities/project.entity';
import { toEntityArray } from '../../common/utils/mappers';
import { KFI } from '../../common/utils/di';
import { DEFAULT_PROJECT_DESCRIPTION, DEFAULT_PROJECT_NAME } from './lib/consts/project.default-data';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { BackendErrorNames, InternalError } from '../../common/errors/errors.backend';
import { jsonStringify } from '../../common/helpers/stringify';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
      });

      if (concreteProject) {
        return new ProjectEntity(concreteProject);
      } else {
        throw new NotFoundException({
          message: `Project with id=${projectId} not found`,
          description: 'Project from your request did not found in the database',
        });
      }
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw new InternalResponse(null, false, new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)));
      }

      throw new InternalResponse(null, false, new InternalError(BackendErrorNames.INTERNAL_ERROR, jsonStringify(error)));
    }
  }

  async getAll(): Promise<ProjectEntity[]> {
    try {
      const allProjects = await this.databaseService.project.findMany();
      return toEntityArray<ProjectEntity>(allProjects, ProjectEntity);
    } catch (error: unknown) {
      throw new InternalResponse(null, false, new InternalError(BackendErrorNames.INTERNAL_ERROR, jsonStringify(error)));
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
      throw new InternalResponse(null, false, new InternalError(BackendErrorNames.INTERNAL_ERROR, jsonStringify(error)));
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
      });
      return new ProjectEntity(newProject);
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new InternalResponse(null, false, new InternalError(BackendErrorNames.CONFLICT_ERROR, jsonStringify(error)));
      }
      throw new InternalResponse(null, false, new InternalError(BackendErrorNames.INTERNAL_ERROR, jsonStringify(error)));
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
      });

      return new ProjectEntity(updatedProject);
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new InternalResponse(null, false, new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)));
      }

      throw new InternalResponse(null, false, new InternalError(BackendErrorNames.INTERNAL_ERROR, jsonStringify(error)));
    }
  }

  async deleteById(projectId: EntityUrlParamCommand.RequestUuidParam): Promise<ProjectEntity> {
    try {
      const deletedProject = await this.databaseService.project.delete({
        where: {
          uuid: projectId,
        },
      });

      return new ProjectEntity(deletedProject);
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new InternalResponse(null, false, new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)));
      }

      throw new InternalResponse(null, false, new InternalError(BackendErrorNames.INTERNAL_ERROR, jsonStringify(error)));
    }
  }
}
