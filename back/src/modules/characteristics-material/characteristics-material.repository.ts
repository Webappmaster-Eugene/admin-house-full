import { Inject, Injectable } from '@nestjs/common';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { ICharacteristicsMaterialRepository } from './types/characteristics-material.repository.interface';
import { EntityUrlParamCommand } from 'libs/contracts';
import { KFI } from '../../common/utils/di';
import { CharacteristicsMaterialEntity } from './entities/characteristics-material.entity';
import { CharacteristicsMaterialCreateRequestDto } from './dto/controller/create-characteristics-material.dto';
import { existenceEntityHandler } from '../../common/helpers/handlers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { QUANTITY_LIMIT } from '../../common/consts/take-quantity.limitation';
import { limitTakeHandler } from '../../common/helpers/handlers/take-limit.handler';
import { EActiveStatuses } from '.prisma/client';

@Injectable()
export class CharacteristicsMaterialRepository implements ICharacteristicsMaterialRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(characteristicsMaterialId: EntityUrlParamCommand.RequestUuidParam): Promise<CharacteristicsMaterialEntity> {
    try {
      const findedCharacteristicsMaterial = await this.databaseService.characteristicsMaterial.findUnique({
        where: {
          uuid: characteristicsMaterialId,
        },
        include: {
          material: true,
          fieldOfCategoryMaterial: true,
          handbook: true,
        },
      });

      return existenceEntityHandler(
        findedCharacteristicsMaterial,
        CharacteristicsMaterialEntity,
        EntityName.CHARACTERISTICS_MATERIAL,
      ) as CharacteristicsMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAll(skip = 0, take = QUANTITY_LIMIT.TAKE_MAX_LIMIT): Promise<CharacteristicsMaterialEntity[]> {
    limitTakeHandler(take);

    try {
      const allCharacteristicsMaterials = await this.databaseService.characteristicsMaterial.findMany({
        take,
        skip,
        include: {
          material: true,
          fieldOfCategoryMaterial: true,
          handbook: true,
        },
      });
      return existenceEntityHandler(
        allCharacteristicsMaterials,
        CharacteristicsMaterialEntity,
        EntityName.CHARACTERISTICS_MATERIAL,
      ) as CharacteristicsMaterialEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAllInHandbook(
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    skip = 0,
    take = QUANTITY_LIMIT.TAKE_MAX_LIMIT,
  ): Promise<CharacteristicsMaterialEntity[]> {
    limitTakeHandler(take);

    try {
      const allCharacteristicsMaterials = await this.databaseService.characteristicsMaterial.findMany({
        where: { handbookUuid: handbookId },
        take,
        skip,
        include: {
          material: true,
          fieldOfCategoryMaterial: true,
          handbook: true,
        },
      });
      return existenceEntityHandler(
        allCharacteristicsMaterials,
        CharacteristicsMaterialEntity,
        EntityName.CHARACTERISTICS_MATERIAL,
      ) as CharacteristicsMaterialEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAllInCategoryMaterial(
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    skip = 0,
    take = QUANTITY_LIMIT.TAKE_MAX_LIMIT,
  ): Promise<CharacteristicsMaterialEntity[]> {
    limitTakeHandler(take);

    try {
      const allCharacteristicsMaterials = await this.databaseService.characteristicsMaterial.findMany({
        where: {
          material: {
            categoryMaterialUuid: categoryMaterialId,
          },
        },
        include: {
          material: true,
          fieldOfCategoryMaterial: true,
          handbook: true,
        },
        take,
        skip,
      });
      return existenceEntityHandler(
        allCharacteristicsMaterials,
        CharacteristicsMaterialEntity,
        EntityName.CHARACTERISTICS_MATERIAL,
      ) as CharacteristicsMaterialEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAllInMaterial(
    materialId: EntityUrlParamCommand.RequestUuidParam,
    skip = 0,
    take = QUANTITY_LIMIT.TAKE_MAX_LIMIT,
  ): Promise<CharacteristicsMaterialEntity[]> {
    limitTakeHandler(take);

    try {
      const allCharacteristicsMaterials = await this.databaseService.characteristicsMaterial.findMany({
        where: { materialUuid: materialId },
        take,
        skip,
        include: {
          material: true,
          fieldOfCategoryMaterial: true,
          handbook: true,
        },
      });
      return existenceEntityHandler(
        allCharacteristicsMaterials,
        CharacteristicsMaterialEntity,
        EntityName.CHARACTERISTICS_MATERIAL,
      ) as CharacteristicsMaterialEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async create(
    dto: CharacteristicsMaterialCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    materialId: EntityUrlParamCommand.RequestUuidParam,
    fieldCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    fieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    unitOfMeasurementId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<CharacteristicsMaterialEntity> {
    try {
      const { comment, value, characteristicsMaterialStatus } = dto;
      const lastCategoryMaterialInHandbook = await this.databaseService.material.findFirst({
        where: {
          handbookUuid: handbookId,
        },
      });
      const numInOrder = lastCategoryMaterialInHandbook?.numInOrder + 1 || 1;

      const newCharacteristicsMaterial = await this.databaseService.characteristicsMaterial.create({
        data: {
          comment,
          value,
          characteristicsMaterialStatus,
          numInOrder,
          fieldOfCategoryMaterialUuid: fieldCategoryMaterialId,
          materialUuid: materialId,
          handbookUuid: handbookId,
        },
        include: {
          material: true,
          fieldOfCategoryMaterial: true,
          handbook: true,
        },
      });

      return existenceEntityHandler(
        newCharacteristicsMaterial,
        CharacteristicsMaterialEntity,
        EntityName.CHARACTERISTICS_MATERIAL,
      ) as CharacteristicsMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(
    characteristicsMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: CharacteristicsMaterialCreateRequestDto,
  ): Promise<CharacteristicsMaterialEntity> {
    try {
      const { comment, value, characteristicsMaterialStatus } = dto;
      const updatedCharacteristicsMaterial = await this.databaseService.characteristicsMaterial.update({
        where: {
          uuid: characteristicsMaterialId,
        },
        data: {
          characteristicsMaterialStatus,
          comment,
          value,
        },
        include: {
          material: true,
          fieldOfCategoryMaterial: true,
          handbook: true,
        },
      });

      return existenceEntityHandler(
        updatedCharacteristicsMaterial,
        CharacteristicsMaterialEntity,
        EntityName.CHARACTERISTICS_MATERIAL,
      ) as CharacteristicsMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateManyStatusByMaterialId(
    materialId: EntityUrlParamCommand.RequestUuidParam,
    dto: CharacteristicsMaterialCreateRequestDto,
  ): Promise<CharacteristicsMaterialEntity[]> {
    try {
      const { comment, value, characteristicsMaterialStatus } = dto;
      const updatedCharacteristicsMaterial = await this.databaseService.characteristicsMaterial.updateMany({
        where: {
          materialUuid: materialId,
        },
        data: {
          characteristicsMaterialStatus,
          comment,
          value,
        },
      });

      const allCharacteristicsOfMaterial = await this.databaseService.characteristicsMaterial.findMany({
        where: { materialUuid: materialId },
        include: {
          material: true,
          fieldOfCategoryMaterial: true,
          handbook: true,
        },
      });
      return existenceEntityHandler(
        allCharacteristicsOfMaterial,
        CharacteristicsMaterialEntity,
        EntityName.CHARACTERISTICS_MATERIAL,
      ) as CharacteristicsMaterialEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(characteristicsMaterialId: EntityUrlParamCommand.RequestUuidParam): Promise<CharacteristicsMaterialEntity> {
    try {
      const deletedCharacteristicsMaterial = await this.databaseService.characteristicsMaterial.delete({
        where: {
          uuid: characteristicsMaterialId,
        },
        include: {
          material: true,
          fieldOfCategoryMaterial: true,
          handbook: true,
        },
      });
      return existenceEntityHandler(
        deletedCharacteristicsMaterial,
        CharacteristicsMaterialEntity,
        EntityName.CHARACTERISTICS_MATERIAL,
      ) as CharacteristicsMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
