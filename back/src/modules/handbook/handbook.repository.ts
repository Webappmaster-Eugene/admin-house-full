import { Inject, Injectable } from '@nestjs/common';
import { HandbookCreateRequestDto } from './dto/controller/create-handbook.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IHandbookRepository } from './types/handbook.repository.interface';
import { HandbookUpdateRequestDto } from './dto/controller/update-handbook.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { HandbookEntity } from './entities/handbook.entity';
import { toEntityArray } from '../../common/utils/mappers';
import {
  DEFAULT_HANDBOOK_DESCRIPTION,
  DEFAULT_HANDBOOK_NAME,
} from './lib/consts/handbook.default-data';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';

@Injectable()
export class HandbookRepository implements IHandbookRepository {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly prismaService: IPrismaService,
  ) {}

  async getById(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<HandbookEntity> {
    const findedHandbook = await this.prismaService.handbook.findUnique({
      where: {
        uuid: id,
      },
    });

    return new HandbookEntity(findedHandbook);
  }

  async getByManagerId(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<HandbookEntity> {
    const findedHandbook = await this.prismaService.handbook.findUnique({
      where: {
        responsibleManagerUuid: id,
      },
    });

    return new HandbookEntity(findedHandbook);
  }

  async getAll(): Promise<HandbookEntity[]> {
    const allHandbooks = await this.prismaService.handbook.findMany();
    return toEntityArray<HandbookEntity>(allHandbooks, HandbookEntity);
  }

  async getAllCount(): Promise<CountData> {
    const total = await this.prismaService.handbook.count({
      select: {
        _all: true, // Count all records
      },
    });
    return { total: total._all };
  }

  async create(
    dto: HandbookCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<HandbookEntity> {
    const { name, description, canCustomerView } = dto;
    const newHandbook = await this.prismaService.handbook.create({
      data: {
        name: name || DEFAULT_HANDBOOK_NAME + ` of user #${managerId}`,
        description:
          description ||
          DEFAULT_HANDBOOK_DESCRIPTION + ` of user #${managerId}`,
        canCustomerView: canCustomerView || false,
        responsibleManagerUuid: managerId,
      },
    });
    return new HandbookEntity(newHandbook);
  }

  async updateById(
    id: string,
    { name, description }: HandbookUpdateRequestDto,
  ): Promise<HandbookEntity> {
    const updatedHandbook = await this.prismaService.handbook.update({
      where: {
        uuid: id,
      },
      data: {
        name,
        description,
      },
    });
    return new HandbookEntity(updatedHandbook);
  }

  async deleteById(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<HandbookEntity> {
    const deletedHandbook = await this.prismaService.handbook.delete({
      where: {
        uuid: id,
      },
    });
    return new HandbookEntity(deletedHandbook);
  }
}
