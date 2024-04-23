import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PriceChangingCreateRequestDto } from './dto/controller/create-price-changing.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IPriceChangingRepository } from './types/price-changing.repository.interface';
import { PriceChangingUpdateRequestDto } from './dto/controller/update-price-changing.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { PriceChangingEntity } from './entities/price-changing.entity';
import { toEntityArray } from '../../common/utils/mappers';
import {
  DEFAULT_HANDBOOK_DESCRIPTION,
  DEFAULT_HANDBOOK_NAME,
} from './lib/consts/price-changing.default-data';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import {
  BackendErrorNames,
  InternalError,
} from '../../common/errors/errors.backend';
import { jsonStringify } from '../../common/helpers/stringify';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PriceChangingRepository implements IPriceChangingRepository {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(
    priceChangingId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<PriceChangingEntity> {
    try {
      const findedPriceChanging =
        await this.databaseService.priceChanging.findUnique({
          where: {
            uuid: priceChangingId,
          },
        });

      if (findedPriceChanging) {
        return new PriceChangingEntity(findedPriceChanging);
      } else {
        throw new NotFoundException({
          message: `PriceChanging with id=${priceChangingId} not found`,
          description:
            'PriceChanging from your request did not found in the database',
        });
      }
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)),
        );
      }

      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async getAll(): Promise<PriceChangingEntity[]> {
    try {
      const allPriceChangings =
        await this.databaseService.priceChanging.findMany();
      return toEntityArray<PriceChangingEntity>(
        allPriceChangings,
        PriceChangingEntity,
      );
    } catch (error: unknown) {
      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async create(
    dto: PriceChangingCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<PriceChangingEntity> {
    try {
      const { } = dto;
      const newPriceChanging = await this.databaseService.priceChanging.create({
        data: {},
      });
      return new PriceChangingEntity(newPriceChanging);
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(
            BackendErrorNames.CONFLICT_ERROR,
            jsonStringify(error),
          ),
        );
      }
      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async updateById(
    priceChangingId: EntityUrlParamCommand.RequestUuidParam,
    {}: PriceChangingUpdateRequestDto,
  ): Promise<PriceChangingEntity> {
    try {
      const updatedPriceChanging =
        await this.databaseService.priceChanging.update({
          where: {
            uuid: priceChangingId,
          },
          data: {
            name,
            description,
          },
        });

      return new PriceChangingEntity(updatedPriceChanging);
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)),
        );
      }

      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async deleteById(
    priceChangingId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<PriceChangingEntity> {
    try {
      const deletedPriceChanging =
        await this.databaseService.priceChanging.delete({
          where: {
            uuid: priceChangingId,
          },
        });

      return new PriceChangingEntity(deletedPriceChanging);
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)),
        );
      }

      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }
}
