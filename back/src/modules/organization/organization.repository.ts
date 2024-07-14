import { Inject, Injectable } from '@nestjs/common';
import { OrganizationCreateRequestDto } from './dto/controller/create-organization.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IOrganizationRepository } from './types/organization.repository.interface';
import { OrganizationUpdateRequestDto } from './dto/controller/update-organization.dto';
import { EntityUrlParamCommand } from 'libs/contracts';
import { CountData } from '../../common/types/main/count.data';
import { OrganizationEntity } from './entities/organization.entity';
import { KFI } from '../../common/utils/di';
import { QUANTITY_LIMIT } from '../../common/consts/take-quantity.limitation';
import { existenceEntityHandler } from '../../common/helpers/handlers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { limitTakeHandler } from '../../common/helpers/handlers/take-limit.handler';

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(id: EntityUrlParamCommand.RequestUuidParam): Promise<OrganizationEntity> {
    try {
      const concreteOrganization = await this.databaseService.organization.findUnique({
        where: {
          uuid: id,
        },
        include: {
          organizationLeader: true,
          organizationMembers: true,
          projects: true,
          workspace: true,
        },
      });

      return existenceEntityHandler(concreteOrganization, OrganizationEntity, EntityName.ORGANIZATION) as OrganizationEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getByManagerId(id: EntityUrlParamCommand.RequestUuidParam): Promise<OrganizationEntity> {
    try {
      const concreteOrganization = await this.databaseService.organization.findUnique({
        where: {
          uuid: id,
        },
        include: {
          organizationLeader: true,
          organizationMembers: true,
          projects: true,
          workspace: true,
        },
      });

      return existenceEntityHandler(concreteOrganization, OrganizationEntity, EntityName.ORGANIZATION, {
        message: `Organization with managerId=${id} not found`,
        description: 'Organization from your request did not found in the database',
      }) as OrganizationEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAll(skip = 0, take = QUANTITY_LIMIT.TAKE_MAX_LIMIT): Promise<OrganizationEntity[]> {
    limitTakeHandler(take);

    try {
      const allOrganizations = await this.databaseService.organization.findMany({
        take,
        skip,
        include: {
          organizationLeader: true,
          organizationMembers: true,
          projects: true,
          workspace: true,
        },
      });
      return existenceEntityHandler(allOrganizations, OrganizationEntity, EntityName.ORGANIZATION) as OrganizationEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAllInWorkspace(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    skip = 0,
    take = QUANTITY_LIMIT.TAKE_MAX_LIMIT,
  ): Promise<OrganizationEntity[]> {
    limitTakeHandler(take);

    try {
      const allOrganizationsInWorkspace = await this.databaseService.organization.findMany({
        where: {
          workspaceUuid: workspaceId,
        },
        take,
        skip,
        include: {
          organizationLeader: true,
          organizationMembers: true,
          projects: true,
          workspace: true,
        },
      });
      return existenceEntityHandler(allOrganizationsInWorkspace, OrganizationEntity, EntityName.ORGANIZATION) as OrganizationEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
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
      errorRepositoryHandler(error);
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
        include: {
          organizationLeader: true,
          organizationMembers: true,
          projects: true,
          workspace: true,
        },
      });

      return existenceEntityHandler(newOrganization, OrganizationEntity, EntityName.ORGANIZATION) as OrganizationEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    { description, name }: OrganizationUpdateRequestDto,
  ): Promise<OrganizationEntity> {
    try {
      const updatedOrganization = await this.databaseService.organization.update({
        where: {
          uuid: organizationId,
        },
        data: {
          name,
          description,
        },
        include: {
          organizationLeader: true,
          organizationMembers: true,
          projects: true,
          workspace: true,
        },
      });

      return existenceEntityHandler(updatedOrganization, OrganizationEntity, EntityName.ORGANIZATION) as OrganizationEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(organizationId: EntityUrlParamCommand.RequestUuidParam): Promise<OrganizationEntity> {
    try {
      const deletedOrganization = await this.databaseService.organization.delete({
        where: {
          uuid: organizationId,
        },
        include: {
          organizationLeader: true,
          organizationMembers: true,
          projects: true,
          workspace: true,
        },
      });

      return existenceEntityHandler(deletedOrganization, OrganizationEntity, EntityName.ORGANIZATION) as OrganizationEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
