import { Inject, Injectable } from '@nestjs/common';
import { GlobalCategoryMaterialCreateRequestDto } from './dto/controller/create-global-category-material.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IGlobalCategoryMaterialRepository } from './types/global-category-material.repository.interface';
import { GlobalCategoryMaterialUpdateRequestDto } from './dto/controller/update-global-category-material.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { GlobalCategoryMaterialEntity } from './entities/global-category-material.entity';
import { KFI } from '../../common/utils/di';
import { existenceEntityHandler } from '../../common/helpers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/error-repository.handler';

@Injectable()
export class GlobalCategoryMaterialRepository implements IGlobalCategoryMaterialRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam): Promise<GlobalCategoryMaterialEntity> {
    try {
      const findedGlobalCategory = await this.databaseService.globalCategoryMaterial.findUnique({
        where: {
          uuid: globalCategoryMaterialId,
        },
      });

      return existenceEntityHandler(
        findedGlobalCategory,
        GlobalCategoryMaterialEntity,
        EntityName.GLOBAL_CATEGORY_MATERIAL,
      ) as GlobalCategoryMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAll(): Promise<GlobalCategoryMaterialEntity[]> {
    try {
      const allGlobalCategories = await this.databaseService.globalCategoryMaterial.findMany();
      return existenceEntityHandler(
        allGlobalCategories,
        GlobalCategoryMaterialEntity,
        EntityName.GLOBAL_CATEGORY_MATERIAL,
      ) as GlobalCategoryMaterialEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async create(dto: GlobalCategoryMaterialCreateRequestDto): Promise<GlobalCategoryMaterialEntity> {
    try {
      const { name, comment, color, nameRu } = dto;
      const newGlobalCategoryMaterial = await this.databaseService.globalCategoryMaterial.create({
        data: {
          name,
          comment,
          color,
          nameRu,
        },
      });
      return existenceEntityHandler(
        newGlobalCategoryMaterial,
        GlobalCategoryMaterialEntity,
        EntityName.GLOBAL_CATEGORY_MATERIAL,
      ) as GlobalCategoryMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(
    globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: GlobalCategoryMaterialUpdateRequestDto,
  ): Promise<GlobalCategoryMaterialEntity> {
    try {
      const { name, comment, color, nameRu } = dto;

      const updatedGlobalCategoryMaterial = await this.databaseService.globalCategoryMaterial.update({
        where: {
          uuid: globalCategoryMaterialId,
        },
        data: {
          name,
          comment,
          color,
          nameRu,
        },
      });
      return existenceEntityHandler(
        updatedGlobalCategoryMaterial,
        GlobalCategoryMaterialEntity,
        EntityName.GLOBAL_CATEGORY_MATERIAL,
      ) as GlobalCategoryMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam): Promise<GlobalCategoryMaterialEntity> {
    try {
      const deletedGlobalCategory = await this.databaseService.globalCategoryMaterial.delete({
        where: {
          uuid: globalCategoryMaterialId,
        },
      });
      return existenceEntityHandler(
        deletedGlobalCategory,
        GlobalCategoryMaterialEntity,
        EntityName.GLOBAL_CATEGORY_MATERIAL,
      ) as GlobalCategoryMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
