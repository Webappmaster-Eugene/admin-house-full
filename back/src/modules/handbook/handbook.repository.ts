import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { HandbookCreateRequestDto } from './dto/controller/create-handbook.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IHandbookRepository } from './types/handbook.repository.interface';
import { HandbookUpdateRequestDto } from './dto/controller/update-handbook.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { HandbookEntity } from './entities/handbook.entity';
import { toEntityArray } from '../../common/utils/mappers';
import { DEFAULT_HANDBOOK_DESCRIPTION, DEFAULT_HANDBOOK_NAME } from './lib/consts/handbook.default-data';
import { KFI } from '../../common/utils/di';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { BackendErrorNames, InternalError } from '../../common/errors/errors.backend';
import { jsonStringify } from '../../common/helpers/stringify';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class HandbookRepository implements IHandbookRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(handbookId: EntityUrlParamCommand.RequestUuidParam): Promise<HandbookEntity> {
    try {
      const findedHandbook = await this.databaseService.handbook.findUnique({
        where: {
          uuid: handbookId,
        },
      });

      if (findedHandbook) {
        return new HandbookEntity(findedHandbook);
      } else {
        throw new NotFoundException({
          message: `Handbook with id=${handbookId} not found`,
          description: 'Handbook from your request did not found in the database',
        });
      }
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw new InternalResponse(null, false, new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)));
      }

      throw new InternalResponse(null, false, new InternalError(BackendErrorNames.INTERNAL_ERROR, jsonStringify(error)));
    }
  }

  async getByManagerId(managerId: EntityUrlParamCommand.RequestUuidParam): Promise<HandbookEntity> {
    try {
      const findedHandbook = await this.databaseService.handbook.findUnique({
        where: {
          responsibleManagerUuid: managerId,
        },
      });

      if (findedHandbook) {
        return new HandbookEntity(findedHandbook);
      } else {
        throw new NotFoundException({
          message: `Handbook with managerId=${managerId} not found`,
          description: 'Handbook from your request did not found in the database',
        });
      }
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw new InternalResponse(null, false, new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)));
      }

      throw new InternalResponse(null, false, new InternalError(BackendErrorNames.INTERNAL_ERROR, jsonStringify(error)));
    }
  }

  async getAll(): Promise<HandbookEntity[]> {
    try {
      const allHandbooks = await this.databaseService.handbook.findMany();
      return toEntityArray<HandbookEntity>(allHandbooks, HandbookEntity);
    } catch (error: unknown) {
      throw new InternalResponse(null, false, new InternalError(BackendErrorNames.INTERNAL_ERROR, jsonStringify(error)));
    }
  }

  async getAllCount(): Promise<CountData> {
    try {
      const total = await this.databaseService.handbook.count({
        select: {
          _all: true, // Count all records
        },
      });
      return { total: total._all };
    } catch (error: unknown) {
      throw new InternalResponse(null, false, new InternalError(BackendErrorNames.INTERNAL_ERROR, jsonStringify(error)));
    }
  }

  async create(dto: HandbookCreateRequestDto, managerId: EntityUrlParamCommand.RequestUuidParam): Promise<HandbookEntity> {
    try {
      const { name, description, canCustomerView, workspaceUuid } = dto;
      const newHandbook = await this.databaseService.handbook.create({
        data: {
          name: name || DEFAULT_HANDBOOK_NAME + ` of user #${managerId}`,
          description: description || DEFAULT_HANDBOOK_DESCRIPTION + ` of user #${managerId}`,
          canCustomerView: canCustomerView || false,
          responsibleManagerUuid: managerId,
          workspaceUuid,
        },
      });
      return new HandbookEntity(newHandbook);
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new InternalResponse(null, false, new InternalError(BackendErrorNames.CONFLICT_ERROR, jsonStringify(error)));
      }
      throw new InternalResponse(null, false, new InternalError(BackendErrorNames.INTERNAL_ERROR, jsonStringify(error)));
    }
  }

  async updateById(
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    { name, description }: HandbookUpdateRequestDto,
  ): Promise<HandbookEntity> {
    try {
      const updatedHandbook = await this.databaseService.handbook.update({
        where: {
          uuid: handbookId,
        },
        data: {
          name,
          description,
        },
      });

      return new HandbookEntity(updatedHandbook);
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new InternalResponse(null, false, new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)));
      }

      throw new InternalResponse(null, false, new InternalError(BackendErrorNames.INTERNAL_ERROR, jsonStringify(error)));
    }
  }

  async deleteById(handbookId: EntityUrlParamCommand.RequestUuidParam): Promise<HandbookEntity> {
    try {
      const deletedHandbook = await this.databaseService.handbook.delete({
        where: {
          uuid: handbookId,
        },
      });

      return new HandbookEntity(deletedHandbook);
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new InternalResponse(null, false, new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)));
      }

      throw new InternalResponse(null, false, new InternalError(BackendErrorNames.INTERNAL_ERROR, jsonStringify(error)));
    }
  }
}
