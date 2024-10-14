import { Inject, Injectable } from '@nestjs/common';
import { MaterialCreateRequestDto } from './dto/controller/create-material.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IMaterialRepository } from './types/material.repository.interface';
import { MaterialUpdateRequestDto } from './dto/controller/update-material.dto';
import { EntityUrlParamCommand } from 'libs/contracts';
import { MaterialEntity } from './entities/material.entity';
import { KFI } from '../../common/utils/di';
import { existenceEntityHandler } from '../../common/helpers/handlers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { QUANTITY_LIMIT } from '../../common/consts/take-quantity.limitation';
import { limitTakeHandler } from '../../common/helpers/handlers/take-limit.handler';
import { MaterialUpdateNameRequestDto } from '../../modules/material/dto/controller/update-name-material.dto';
import { MaterialUpdateCategoryRequestDto } from '../../modules/material/dto/controller/update-category-material.dto';
import { EActiveStatuses, Prisma } from '.prisma/client';
import { templateNameMapper } from '../../common/helpers/handlers/template-name-mapper.handler';

@Injectable()
export class MaterialRepository implements IMaterialRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(materialId: EntityUrlParamCommand.RequestUuidParam): Promise<MaterialEntity> {
    try {
      //console.log('updatedMaterial6' + materialId);
      const findedMaterial = await this.databaseService.material.findUnique({
        where: {
          uuid: materialId,
        },
        include: {
          responsiblePartner: true,
          unitMeasurement: true,
          handbook: true,
          categoryMaterial: true,
          characteristicsMaterial: {
            where: {
              characteristicsMaterialStatus: EActiveStatuses.ACTIVE,
            },
          },
          priceChanges: true,
        },
      });
      //console.log('updatedMaterial7' + JSON.stringify(findedMaterial));
      return existenceEntityHandler(findedMaterial, MaterialEntity, EntityName.MATERIAL) as MaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAll(skip = 0, take = QUANTITY_LIMIT.TAKE_MAX_LIMIT): Promise<MaterialEntity[]> {
    limitTakeHandler(take);

    try {
      const allMaterials = await this.databaseService.material.findMany({
        skip,
        take,
        include: {
          responsiblePartner: true,
          unitMeasurement: true,
          handbook: true,
          categoryMaterial: true,
          characteristicsMaterial: {
            where: {
              characteristicsMaterialStatus: EActiveStatuses.ACTIVE,
            },
          },
          priceChanges: true,
        },
      });
      return existenceEntityHandler(allMaterials, MaterialEntity, EntityName.MATERIAL) as MaterialEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAllWithIds(
    ids: EntityUrlParamCommand.RequestUuidParam[],
    skip = 0,
    take = QUANTITY_LIMIT.TAKE_MAX_LIMIT,
  ): Promise<MaterialEntity[]> {
    limitTakeHandler(take);

    try {
      const allMaterialsWithIds = await this.databaseService.material.findMany({
        where: {
          uuid: {
            in: ids,
          },
        },
        skip,
        take,
        include: {
          responsiblePartner: true,
          unitMeasurement: true,
          handbook: true,
          categoryMaterial: true,
          characteristicsMaterial: {
            where: {
              characteristicsMaterialStatus: EActiveStatuses.ACTIVE,
            },
          },
          priceChanges: true,
        },
      });
      return existenceEntityHandler(allMaterialsWithIds, MaterialEntity, EntityName.MATERIAL) as MaterialEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAllInHandbook(
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    skip = 0,
    take = QUANTITY_LIMIT.TAKE_MAX_LIMIT,
  ): Promise<MaterialEntity[]> {
    limitTakeHandler(take);

    try {
      const allMaterials = await this.databaseService.material.findMany({
        where: { handbookUuid: handbookId },
        include: {
          responsiblePartner: true,
          unitMeasurement: true,
          handbook: true,
          categoryMaterial: true,
          characteristicsMaterial: {
            where: {
              characteristicsMaterialStatus: EActiveStatuses.ACTIVE,
            },
          },
          priceChanges: true,
        },
        skip,
        take,
      });
      return existenceEntityHandler(allMaterials, MaterialEntity, EntityName.MATERIAL) as MaterialEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAllInCategoryMaterial(
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    skip = 0,
    take = QUANTITY_LIMIT.TAKE_MAX_LIMIT,
  ): Promise<MaterialEntity[]> {
    limitTakeHandler(take);

    try {
      const allMaterials = await this.databaseService.material.findMany({
        where: { categoryMaterialUuid: categoryMaterialId },
        include: {
          responsiblePartner: true,
          unitMeasurement: true,
          handbook: true,
          categoryMaterial: true,
          characteristicsMaterial: {
            where: {
              characteristicsMaterialStatus: EActiveStatuses.ACTIVE,
            },
          },
          priceChanges: true,
        },
        skip,
        take,
      });
      return existenceEntityHandler(allMaterials, MaterialEntity, EntityName.MATERIAL) as MaterialEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async create(
    dto: MaterialCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<MaterialEntity> {
    try {
      const { name, responsiblePartnerUuid, unitMeasurementUuid, namePublic, comment, price } = dto;
      const lastMaterialInHandbook = await this.databaseService.material.findFirst({
        where: {
          handbookUuid: handbookId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      const numInOrder = lastMaterialInHandbook?.numInOrder + 1 || 1;
      const newMaterial = await this.databaseService.material.create({
        data: {
          name,
          responsiblePartnerUuid,
          unitMeasurementUuid,
          namePublic,
          numInOrder,
          comment,
          price,
          handbookUuid: handbookId,
          categoryMaterialUuid: categoryMaterialId,
        },
        include: {
          responsiblePartner: true,
          unitMeasurement: true,
          handbook: true,
          categoryMaterial: true,
          characteristicsMaterial: {
            where: {
              characteristicsMaterialStatus: EActiveStatuses.ACTIVE,
            },
          },
          priceChanges: true,
        },
      });
      return existenceEntityHandler(newMaterial, MaterialEntity, EntityName.MATERIAL) as MaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(materialId: EntityUrlParamCommand.RequestUuidParam, dto: MaterialUpdateRequestDto): Promise<MaterialEntity> {
    const { name, namePublic, comment, price, materialStatus, responsiblePartnerUuid, unitMeasurementUuid, sourceInfo } = dto;
    try {
      const updatedMaterial = await this.databaseService.material.update({
        where: {
          uuid: materialId,
        },
        data: {
          name,
          namePublic,
          comment,
          price,
          materialStatus,
          responsiblePartnerUuid,
          unitMeasurementUuid,
          sourceInfo,
        },
        include: {
          responsiblePartner: true,
          unitMeasurement: true,
          handbook: true,
          categoryMaterial: true,
          characteristicsMaterial: {
            where: {
              characteristicsMaterialStatus: EActiveStatuses.ACTIVE,
            },
          },
          priceChanges: true,
        },
      });

      return existenceEntityHandler(updatedMaterial, MaterialEntity, EntityName.MATERIAL) as MaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateMaterialsCategoryById(
    materialIds: EntityUrlParamCommand.RequestUuidParam[],
    newCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<Prisma.BatchPayload> {
    try {
      const updatedMaterials = await this.databaseService.material.updateMany({
        where: {
          uuid: {
            in: materialIds,
          },
        },
        data: {
          categoryMaterialUuid: newCategoryMaterialId,
        },
      });

      return updatedMaterials;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateNameForMaterialById(
    materialId: EntityUrlParamCommand.RequestUuidParam,
    { name }: MaterialUpdateNameRequestDto,
  ): Promise<MaterialEntity> {
    try {
      const updatedMaterial = await this.databaseService.material.update({
        where: {
          uuid: materialId,
        },
        data: {
          name,
        },
        include: {
          responsiblePartner: true,
          unitMeasurement: true,
          handbook: true,
          categoryMaterial: true,
          characteristicsMaterial: {
            where: {
              characteristicsMaterialStatus: EActiveStatuses.ACTIVE,
            },
          },
          priceChanges: true,
        },
      });

      return existenceEntityHandler(updatedMaterial, MaterialEntity, EntityName.MATERIAL) as MaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async rebuildNameForMaterialById(material: MaterialEntity, newName?: string): Promise<MaterialEntity> {
    try {
      const newMaterialName = newName ? newName : await templateNameMapper(this.databaseService, material);
      const updatedMaterial = await this.databaseService.material.update({
        where: {
          uuid: material.uuid,
        },
        data: {
          name: newMaterialName,
        },
        include: {
          responsiblePartner: true,
          unitMeasurement: true,
          handbook: true,
          categoryMaterial: true,
          characteristicsMaterial: {
            where: {
              characteristicsMaterialStatus: EActiveStatuses.ACTIVE,
            },
          },
          priceChanges: true,
        },
      });
      return existenceEntityHandler(updatedMaterial, MaterialEntity, EntityName.MATERIAL) as MaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async changeCategoryMaterialById(
    materialId: EntityUrlParamCommand.RequestUuidParam,
    { categoryMaterialUuid }: MaterialUpdateCategoryRequestDto,
  ): Promise<MaterialEntity> {
    try {
      // console.log('updatedMaterial1' + materialId);
      // console.log('updatedMaterial2' + categoryMaterialUuid);
      const updatedMaterial1 = await this.databaseService.material.findFirst({
        where: {
          uuid: materialId,
        },
      });

      //console.log('updatedMaterial3' + JSON.stringify(updatedMaterial1));
      const updatedMaterial = await this.databaseService.material.update({
        where: {
          uuid: materialId,
        },
        data: {
          categoryMaterialUuid,
        },
        include: {
          responsiblePartner: true,
          unitMeasurement: true,
          handbook: true,
          categoryMaterial: true,
          characteristicsMaterial: {
            where: {
              characteristicsMaterialStatus: EActiveStatuses.ACTIVE,
            },
          },
          priceChanges: true,
        },
      });
      console.log('updatedMaterial4' + JSON.stringify(updatedMaterial));

      return existenceEntityHandler(updatedMaterial, MaterialEntity, EntityName.MATERIAL) as MaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(id: EntityUrlParamCommand.RequestUuidParam): Promise<MaterialEntity> {
    try {
      const deletedMaterial = await this.databaseService.material.delete({
        where: {
          uuid: id,
        },
        include: {
          responsiblePartner: true,
          unitMeasurement: true,
          handbook: true,
          characteristicsMaterial: {
            where: {
              characteristicsMaterialStatus: EActiveStatuses.ACTIVE,
            },
          },
          priceChanges: true,
          categoryMaterial: true,
        },
      });

      return existenceEntityHandler(deletedMaterial, MaterialEntity, EntityName.MATERIAL) as MaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
