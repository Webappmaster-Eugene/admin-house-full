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
          fieldType: true,
          fieldUnitMeasurement: true,
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
          fieldType: true,
          fieldUnitMeasurement: true,
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
          fieldType: true,
          fieldUnitMeasurement: true,
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
          fieldType: true,
          fieldUnitMeasurement: true,
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
          fieldType: true,
          fieldUnitMeasurement: true,
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
    //categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    materialId: EntityUrlParamCommand.RequestUuidParam,
    fieldCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    fieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    unitOfMeasurementUuid: EntityUrlParamCommand.RequestUuidParam,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<CharacteristicsMaterialEntity> {
    try {
      const { name, comment, value } = dto;
      const newCharacteristicsMaterial = await this.databaseService.characteristicsMaterial.create({
        data: {
          name,
          comment,
          value,
          fieldUnitMeasurementUuid: unitOfMeasurementUuid,
          fieldTypeUuid: fieldTypeId,
          fieldOfCategoryMaterialUuid: fieldCategoryMaterialId,
          materialUuid: materialId,
          handbookUuid: handbookId,
        },
        include: {
          material: true,
          fieldOfCategoryMaterial: true,
          handbook: true,
          fieldType: true,
          fieldUnitMeasurement: true,
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
      const { name, comment, value } = dto;
      const updatedCharacteristicsMaterial = await this.databaseService.characteristicsMaterial.update({
        where: {
          uuid: characteristicsMaterialId,
        },
        data: {
          name,
          comment,
          value,
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

  async deleteById(characteristicsMaterialId: EntityUrlParamCommand.RequestUuidParam): Promise<CharacteristicsMaterialEntity> {
    try {
      const deletedCharacteristicsMaterial = await this.databaseService.characteristicsMaterial.delete({
        where: {
          uuid: characteristicsMaterialId,
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
