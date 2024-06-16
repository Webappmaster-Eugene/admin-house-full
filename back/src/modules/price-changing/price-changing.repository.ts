import { Inject, Injectable } from '@nestjs/common';
import { PriceChangingCreateRequestDto } from './dto/controller/create-price-changing.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IPriceChangingRepository } from './types/price-changing.repository.interface';
import { PriceChangingUpdateRequestDto } from './dto/controller/update-price-changing.dto';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { PriceChangingEntity } from './entities/price-changing.entity';
import { KFI } from '../../common/utils/di';
import { existenceEntityHandler } from '../../common/helpers/handlers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { limitTakeHandler } from '../../common/helpers/handlers/take-limit.handler';
import { QUANTITY_LIMIT } from '../../common/consts/take-quantity.limitation';

@Injectable()
export class PriceChangingRepository implements IPriceChangingRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(priceChangingId: EntityUrlParamCommand.RequestUuidParam): Promise<PriceChangingEntity> {
    try {
      const findedPriceChanging = await this.databaseService.priceChanging.findUnique({
        where: {
          uuid: priceChangingId,
        },
      });

      return existenceEntityHandler(findedPriceChanging, PriceChangingEntity, EntityName.PRICE_CHANGING) as PriceChangingEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAllInHandbook(
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    skip = 0,
    take = QUANTITY_LIMIT.TAKE_MAX_LIMIT,
  ): Promise<PriceChangingEntity[]> {
    limitTakeHandler(take);

    try {
      const allPriceChangings = await this.databaseService.priceChanging.findMany({
        where: { material: { handbookUuid: handbookId } },
        skip,
        take,
      });
      return existenceEntityHandler(allPriceChangings, PriceChangingEntity, EntityName.PRICE_CHANGING) as PriceChangingEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAllInCategoryMaterial(
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    skip = 0,
    take = QUANTITY_LIMIT.TAKE_MAX_LIMIT,
  ): Promise<PriceChangingEntity[]> {
    limitTakeHandler(take);

    try {
      const allPriceChangings = await this.databaseService.priceChanging.findMany({
        where: {
          material: {
            categoryMaterialUuid: categoryMaterialId,
          },
        },
        skip,
        take,
      });
      return existenceEntityHandler(allPriceChangings, PriceChangingEntity, EntityName.PRICE_CHANGING) as PriceChangingEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAllInMaterial(
    materialId: EntityUrlParamCommand.RequestUuidParam,
    skip = 0,
    take = QUANTITY_LIMIT.TAKE_MAX_LIMIT,
  ): Promise<PriceChangingEntity[]> {
    limitTakeHandler(take);

    try {
      const allPriceChangings = await this.databaseService.priceChanging.findMany({ where: { materialUuid: materialId }, skip, take });
      return existenceEntityHandler(allPriceChangings, PriceChangingEntity, EntityName.PRICE_CHANGING) as PriceChangingEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAll(skip = 0, take = QUANTITY_LIMIT.TAKE_MAX_LIMIT): Promise<PriceChangingEntity[]> {
    limitTakeHandler(take);

    try {
      const allPriceChangings = await this.databaseService.priceChanging.findMany({ skip, take });
      return existenceEntityHandler(allPriceChangings, PriceChangingEntity, EntityName.PRICE_CHANGING) as PriceChangingEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async create(
    dto: PriceChangingCreateRequestDto,
    materialId: EntityUrlParamCommand.RequestUuidParam,
    changedById: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<PriceChangingEntity> {
    try {
      const { newPrice, comment, source } = dto;
      const newPriceChanging = await this.databaseService.priceChanging.create({
        data: { newPrice, comment, source, materialUuid: materialId },
      });
      return existenceEntityHandler(newPriceChanging, PriceChangingEntity, EntityName.PRICE_CHANGING) as PriceChangingEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(
    priceChangingId: EntityUrlParamCommand.RequestUuidParam,
    { newPrice, comment }: PriceChangingUpdateRequestDto,
  ): Promise<PriceChangingEntity> {
    try {
      const updatedPriceChanging = await this.databaseService.priceChanging.update({
        where: {
          uuid: priceChangingId,
        },
        data: {
          newPrice,
          comment,
        },
      });

      return existenceEntityHandler(updatedPriceChanging, PriceChangingEntity, EntityName.PRICE_CHANGING) as PriceChangingEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(priceChangingId: EntityUrlParamCommand.RequestUuidParam): Promise<PriceChangingEntity> {
    try {
      const deletedPriceChanging = await this.databaseService.priceChanging.delete({
        where: {
          uuid: priceChangingId,
        },
      });

      return existenceEntityHandler(deletedPriceChanging, PriceChangingEntity, EntityName.PRICE_CHANGING) as PriceChangingEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
