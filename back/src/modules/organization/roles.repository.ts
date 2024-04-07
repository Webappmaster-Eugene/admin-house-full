import { Inject, Injectable } from '@nestjs/common';
import { EUserTypeVariants } from '@prisma/client';
import { OrganizationCreateRequestDto } from './dto/controller/create-organization.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IOrganizationRepository } from './types/organization.repository.interface';
import { OrganizationUpdateRequestDto } from './dto/controller/update-organization.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { OrganizationEntity } from './entities/organization.entity';
import { toEntityArray } from '../../common/utils/mappers/toEntityArray';
import { PrismaService } from '../../prisma/prisma.service';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';

@Injectable()
export class OrganizationsRepository implements IOrganizationRepository {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly prismaService: IPrismaService,
  ) {}

  async create({
    name,
    description,
  }: OrganizationCreateRequestDto): Promise<OrganizationEntity> {
    const newOrganization = await this.prismaService.organization.create({
      data: {
        name,
        description,
      },
    });
    return new OrganizationEntity(newOrganization);
  }

  async updateById(
    id: string,
    { description }: OrganizationUpdateRequestDto,
  ): Promise<OrganizationEntity> {
    const updatedOrganization = await this.prismaService.organization.update({
      where: {
        uuid: id,
      },
      data: {
        description,
      },
    });
    return new OrganizationEntity(updatedOrganization);
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

  async deleteById(
    id: EntityUrlParamCommand.RequestParam,
  ): Promise<OrganizationEntity> {
    const deletedOrganization = await this.prismaService.organization.delete({
      where: {
        uuid: id,
      },
    });
    return new OrganizationEntity(deletedOrganization);
  }

  async getById(
    id: EntityUrlParamCommand.RequestParamNumber,
  ): Promise<OrganizationEntity> {
    console.log(id);
    console.log(typeof id);
    const concreteOrganization =
      await this.prismaService.organization.findUnique({
        where: {
          idOrganization: id,
        },
      });
    console.log(concreteOrganization);

    return new OrganizationEntity(concreteOrganization);
  }

  async getByValue(value: EUserTypeVariants): Promise<OrganizationEntity> {
    const concreteOrganization =
      await this.prismaService.organization.findUnique({
        where: {
          name: value,
        },
      });

    return new OrganizationEntity(concreteOrganization);
  }
}
