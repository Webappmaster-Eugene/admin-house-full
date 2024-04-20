import { Inject, Injectable } from '@nestjs/common';
import { GlobalCategoryCreateRequestDto } from './dto/controller/create-global-category.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IGlobalCategoryRepository } from './types/global-category.repository.interface';
import { GlobalCategoryUpdateRequestDto } from './dto/controller/update-global-category.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { GlobalCategoryEntity } from './entities/global-category.entity';
import { toEntityArray } from '../../common/utils/mappers';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';

@Injectable()
export class GlobalCategoryRepository implements IGlobalCategoryRepository {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(
    globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<GlobalCategoryEntity> {
    const findedGlobalCategory =
      await this.databaseService.globalCategory.findUnique({
        where: {
          uuid: globalCategoryId,
        },
      });

    return new GlobalCategoryEntity(findedGlobalCategory);
  }

  async getAll(): Promise<GlobalCategoryEntity[]> {
    const allGlobalCategories =
      await this.databaseService.globalCategory.findMany();
    return toEntityArray<GlobalCategoryEntity>(
      allGlobalCategories,
      GlobalCategoryEntity,
    );
  }

  async getAllCount(): Promise<CountData> {
    const total = await this.databaseService.globalCategory.count({
      select: {
        _all: true, // Count all records
      },
    });
    return { total: total._all };
  }

  async create(
    dto: GlobalCategoryCreateRequestDto,
  ): Promise<GlobalCategoryEntity> {
    const { name, comment, color } = dto;
    const newGlobalCategory = await this.databaseService.globalCategory.create({
      data: {
        name,
        comment,
        color,
      },
    });
    return new GlobalCategoryEntity(newGlobalCategory);
  }

  async updateById(
    globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
    dto: GlobalCategoryUpdateRequestDto,
  ): Promise<GlobalCategoryEntity> {
    const { name, comment, color } = dto;

    const updatedGlobalCategory =
      await this.databaseService.globalCategory.update({
        where: {
          uuid: globalCategoryId,
        },
        data: {
          name,
          comment,
          color,
        },
      });
    return new GlobalCategoryEntity(updatedGlobalCategory);
  }

  async deleteById(
    globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<GlobalCategoryEntity> {
    const deletedGlobalCategory =
      await this.databaseService.globalCategory.delete({
        where: {
          uuid: globalCategoryId,
        },
      });
    return new GlobalCategoryEntity(deletedGlobalCategory);
  }
}
