import { Inject, Injectable } from '@nestjs/common';
import { OrganizationCreateRequestDto } from './dto/controller/create-organization.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IOrganizationRepository } from './types/organization.repository.interface';
import { OrganizationUpdateRequestDto } from './dto/controller/update-organization.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { OrganizationEntity } from './entities/organization.entity';
import { toEntityArray } from '../../common/utils/mappers';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly prismaService: IPrismaService,
  ) {}

  async getById(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<OrganizationEntity> {
    const concreteOrganization =
      await this.prismaService.organization.findUnique({
        where: {
          uuid: id,
        },
      });

    return new OrganizationEntity(concreteOrganization);
  }

  async getByManagerId(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<OrganizationEntity> {
    const concreteOrganization =
      await this.prismaService.organization.findUnique({
        where: {
          organizationLeaderUuid: id,
        },
      });

    return new OrganizationEntity(concreteOrganization);
  }

  async getAll(): Promise<OrganizationEntity[]> {
    const allOrganizations = await this.prismaService.organization.findMany();
    return toEntityArray<OrganizationEntity>(
      allOrganizations,
      OrganizationEntity,
    );
  }

  async getAllCount(): Promise<CountData> {
    const total = await this.prismaService.organization.count({
      select: {
        _all: true, // Count all records
      },
    });
    return { total: total._all };
  }

  async create(
    dto: OrganizationCreateRequestDto,
    userId: EntityUrlParamCommand.RequestUuidParam,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<OrganizationEntity> {
    const { description, name } = dto;

    const newOrganization = await this.prismaService.organization.create({
      data: {
        organizationLeaderUuid: userId,
        workspaceUuid: workspaceId,
        name,
        description,
      },
    });
    return new OrganizationEntity(newOrganization);
  }

  async updateById(
    id: EntityUrlParamCommand.RequestUuidParam,
    { description, name }: OrganizationUpdateRequestDto,
  ): Promise<OrganizationEntity> {
    const updatedOrganization = await this.prismaService.organization.update({
      where: {
        uuid: id,
      },
      data: {
        name,
        description,
      },
    });
    return new OrganizationEntity(updatedOrganization);
  }

  async deleteById(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<OrganizationEntity> {
    const deletedOrganization = await this.prismaService.organization.delete({
      where: {
        uuid: id,
      },
    });
    return new OrganizationEntity(deletedOrganization);
  }
}
