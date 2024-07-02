import { Inject, Injectable } from '@nestjs/common';
import { MaterialCreateRequestDto } from './dto/controller/create-material.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IMaterialRepository } from './types/material.repository.interface';
import { MaterialUpdateRequestDto } from './dto/controller/update-material.dto';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { MaterialEntity } from './entities/material.entity';
import { KFI } from '../../common/utils/di';
import { existenceEntityHandler } from '../../common/helpers/handlers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { QUANTITY_LIMIT } from '../../common/consts/take-quantity.limitation';
import { limitTakeHandler } from '../../common/helpers/handlers/take-limit.handler';

@Injectable()
export class MaterialRepository implements IMaterialRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(materialId: EntityUrlParamCommand.RequestUuidParam): Promise<MaterialEntity> {
    try {
      const findedMaterial = await this.databaseService.material.findUnique({
        where: {
          uuid: materialId,
        },
        include: {
          responsiblePartner: true,
          unitMeasurement: true,
          handbook: true,
          categoryMaterial: true,
          characteristicsMaterial: true,
          priceChanges: true,
        },
      });

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
          characteristicsMaterial: true,
          priceChanges: true,
        },
      });
      console.log('allMaterials', allMaterials);
      return existenceEntityHandler(allMaterials, MaterialEntity, EntityName.MATERIAL) as MaterialEntity[];
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
          characteristicsMaterial: true,
          priceChanges: true,
        },
        skip,
        take,
      });
      console.log('allMaterials', allMaterials);
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
          characteristicsMaterial: true,
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
      const newMaterial = await this.databaseService.material.create({
        data: {
          name,
          responsiblePartnerUuid,
          unitMeasurementUuid,
          namePublic,
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
          characteristicsMaterial: true,
          priceChanges: true,
        },
      });
      return existenceEntityHandler(newMaterial, MaterialEntity, EntityName.MATERIAL) as MaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(materialId: EntityUrlParamCommand.RequestUuidParam, dto: MaterialUpdateRequestDto): Promise<MaterialEntity> {
    const { name, namePublic, comment, price } = dto;
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
        },
        include: {
          responsiblePartner: true,
          unitMeasurement: true,
          handbook: true,
          categoryMaterial: true,
          characteristicsMaterial: true,
          priceChanges: true,
        },
      });

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
          categoryMaterial: true,
          characteristicsMaterial: true,
          priceChanges: true,
        },
      });

      return existenceEntityHandler(deletedMaterial, MaterialEntity, EntityName.MATERIAL) as MaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
