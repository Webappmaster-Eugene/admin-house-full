import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
import { WorkspaceChangeOwnerRequestDto } from './dto/controller/change-owner-workspace.dto';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import {
  BackendErrorNames,
  InternalError,
} from '../../common/errors/errors.backend';
import { jsonStringify } from '../../common/helpers/stringify';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class WorkspaceRepository implements IWorkspaceRepository {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<WorkspaceEntity> {
    try {
      const findedWorkspace = await this.databaseService.workspace.findUnique({
        where: {
          uuid: workspaceId,
        },
      });

      if (findedWorkspace) {
        return new WorkspaceEntity(findedWorkspace);
      } else {
        throw new NotFoundException({
          message: `Workspace with id=${workspaceId} not found`,
          description:
            'Workspace from your request did not found in the database',
        });
      }
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)),
        );
      }

      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async getByManagerId(
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<WorkspaceEntity> {
    try {
      const findedWorkspace = await this.databaseService.workspace.findUnique({
        where: {
          workspaceCreatorUuid: managerId,
        },
      });

      if (findedWorkspace) {
        return new WorkspaceEntity(findedWorkspace);
      } else {
        throw new NotFoundException({
          message: `Workspace with managerId=${managerId} not found`,
          description:
            'Workspace from your request did not found in the database',
        });
      }
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)),
        );
      }

      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async getAll(): Promise<WorkspaceEntity[]> {
    try {
      const allWorkspaces = await this.databaseService.workspace.findMany();
      return toEntityArray<WorkspaceEntity>(allWorkspaces, WorkspaceEntity);
    } catch (error: unknown) {
      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async getAllCount(): Promise<CountData> {
    try {
      const total = await this.databaseService.workspace.count({
        select: {
          _all: true, // Count all records
        },
      });
      return { total: total._all };
    } catch (error: unknown) {
      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async create(
    { name, description }: WorkspaceCreateRequestDto,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<WorkspaceEntity> {
    try {
      const newWorkspace = await this.databaseService.workspace.create({
        data: {
          name: name || DEFAULT_WORKSPACE_NAME + ` of user #${userId}`,
          description:
            description ||
            DEFAULT_WORKSPACE_DESCRIPTION + ` of user #${userId}`,
          workspaceCreatorUuid: userId,
        },
      });
      return new WorkspaceEntity(newWorkspace);
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(
            BackendErrorNames.CONFLICT_ERROR,
            jsonStringify(error),
          ),
        );
      }
      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async updateById(
    workspaceId: string,
    { name, description, handbookOfWorkspaceUuid }: WorkspaceUpdateRequestDto,
  ): Promise<WorkspaceEntity> {
    try {
      const updatedWorkspace = await this.databaseService.workspace.update({
        where: {
          uuid: workspaceId,
        },
        data: {
          name,
          description,
          handbookOfWorkspaceUuid,
        },
      });

      return new WorkspaceEntity(updatedWorkspace);
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)),
        );
      }

      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async deleteById(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<WorkspaceEntity> {
    try {
      const deletedWorkspace = await this.databaseService.workspace.delete({
        where: {
          uuid: workspaceId,
        },
      });

      return new WorkspaceEntity(deletedWorkspace);
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)),
        );
      }

      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async changeWorkspaceOwner(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceChangeOwnerRequestDto,
  ): Promise<WorkspaceEntity> {
    try {
      const changedWorkspace = await this.databaseService.workspace.update({
        where: {
          uuid: workspaceId,
        },
        data: {
          workspaceCreatorUuid: dto.uuid,
        },
      });
      return new WorkspaceEntity(changedWorkspace);
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)),
        );
      }

      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }
}
