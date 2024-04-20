import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { OrganizationCreateRequestDto } from './dto/controller/create-organization.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IOrganizationRepository } from './types/organization.repository.interface';
import { OrganizationUpdateRequestDto } from './dto/controller/update-organization.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { OrganizationEntity } from './entities/organization.entity';
import { toEntityArray } from '../../common/utils/mappers';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import {
  BackendErrorNames,
  InternalError,
} from '../../common/errors/errors.backend';
import { jsonStringify } from '../../common/helpers/stringify';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<OrganizationEntity> {
    try {
      const concreteOrganization =
        await this.databaseService.organization.findUnique({
          where: {
            uuid: id,
          },
        });

      if (concreteOrganization) {
        return new OrganizationEntity(concreteOrganization);
      } else {
        throw new NotFoundException({
          message: `Organization with id=${id} not found`,
          description:
            'Organization from your request did not found in the database',
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
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<OrganizationEntity> {
    try {
      const concreteOrganization =
        await this.databaseService.organization.findUnique({
          where: {
            uuid: id,
          },
        });

      if (concreteOrganization) {
        return new OrganizationEntity(concreteOrganization);
      } else {
        throw new NotFoundException({
          message: `Organization with managerId=${id} not found`,
          description:
            'Organization from your request did not found in the database',
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

  async getAll(): Promise<OrganizationEntity[]> {
    try {
      const allOrganizations =
        await this.databaseService.organization.findMany();
      return toEntityArray<OrganizationEntity>(
        allOrganizations,
        OrganizationEntity,
      );
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
      const total = await this.databaseService.organization.count({
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
    dto: OrganizationCreateRequestDto,
    userId: EntityUrlParamCommand.RequestUuidParam,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<OrganizationEntity> {
    try {
      const { description, name } = dto;

      const newOrganization = await this.databaseService.organization.create({
        data: {
          organizationLeaderUuid: userId,
          workspaceUuid: workspaceId,
          name,
          description,
        },
      });
      return new OrganizationEntity(newOrganization);
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
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    { description, name }: OrganizationUpdateRequestDto,
  ): Promise<OrganizationEntity> {
    try {
      const updatedOrganization =
        await this.databaseService.organization.update({
          where: {
            uuid: organizationId,
          },
          data: {
            name,
            description,
          },
        });

      return new OrganizationEntity(updatedOrganization);
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
    organizationId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<OrganizationEntity> {
    try {
      const deletedOrganization =
        await this.databaseService.organization.delete({
          where: {
            uuid: organizationId,
          },
        });

      return new OrganizationEntity(deletedOrganization);
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
