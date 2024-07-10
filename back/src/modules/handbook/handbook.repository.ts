import { Inject, Injectable } from '@nestjs/common';
import { HandbookCreateRequestDto } from './dto/controller/create-handbook.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IHandbookRepository } from './types/handbook.repository.interface';
import { HandbookUpdateRequestDto } from './dto/controller/update-handbook.dto';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { HandbookEntity } from './entities/handbook.entity';
import { DEFAULT_HANDBOOK_DESCRIPTION, DEFAULT_HANDBOOK_NAME } from './lib/consts/handbook.default-data';
import { KFI } from '../../common/utils/di';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { QUANTITY_LIMIT } from '../../common/consts/take-quantity.limitation';
import { existenceEntityHandler } from '../../common/helpers/handlers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { BackendErrorNames, InternalError } from '../../common/errors/errors.backend';
import { limitTakeHandler } from '../../common/helpers/handlers/take-limit.handler';

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
        include: {
          categoryMaterials: true,
          fieldUnitMeasurements: true,
          responsibleManager: true,
          responsiblePartnerProducers: true,
          workspace: {
            include: {
              workspaceMembers: true,
              organizations: true,
            },
          },
          materials: true,
          fieldsOfCategoryMaterials: true,
        },
      });

      return existenceEntityHandler(findedHandbook, HandbookEntity, EntityName.HANDBOOK) as HandbookEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getByManagerId(managerId: EntityUrlParamCommand.RequestUuidParam): Promise<HandbookEntity> {
    try {
      const findedHandbook = await this.databaseService.handbook.findUnique({
        where: {
          responsibleManagerUuid: managerId,
        },
        include: {
          categoryMaterials: true,
          fieldUnitMeasurements: true,
          responsibleManager: true,
          responsiblePartnerProducers: true,
          workspace: {
            include: {
              workspaceMembers: true,
              organizations: true,
            },
          },
          materials: true,
          fieldsOfCategoryMaterials: true,
        },
      });

      return existenceEntityHandler(findedHandbook, HandbookEntity, EntityName.HANDBOOK, {
        message: `Handbook with managerId=${managerId} not found`,
        description: 'Handbook from your request did not found in the database',
      }) as HandbookEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAll(skip = 0, take = QUANTITY_LIMIT.TAKE_MAX_LIMIT): Promise<HandbookEntity[]> {
    limitTakeHandler(take);

    try {
      const allHandbooks = await this.databaseService.handbook.findMany({
        skip,
        take,
        include: {
          categoryMaterials: true,
          fieldUnitMeasurements: true,
          responsibleManager: true,
          responsiblePartnerProducers: true,
          workspace: {
            include: {
              workspaceMembers: true,
              organizations: true,
            },
          },
          materials: true,
          fieldsOfCategoryMaterials: true,
        },
      });
      return existenceEntityHandler(allHandbooks, HandbookEntity, EntityName.HANDBOOK) as HandbookEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
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
      throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR, error));
    }
  }

  async create(
    dto: HandbookCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
    transactionDbClient = this.databaseService,
  ): Promise<HandbookEntity> {
    try {
      const { name, description, canCustomerView, workspaceUuid } = dto;
      const newHandbook = await transactionDbClient.handbook.create({
        data: {
          name: name || DEFAULT_HANDBOOK_NAME + ` of user #${managerId}`,
          description: description || DEFAULT_HANDBOOK_DESCRIPTION + ` of user #${managerId}`,
          canCustomerView: canCustomerView || false,
          responsibleManagerUuid: managerId,
          workspaceUuid,
        },
        include: {
          categoryMaterials: true,
          fieldUnitMeasurements: true,
          responsibleManager: true,
          responsiblePartnerProducers: true,
          workspace: {
            include: {
              workspaceMembers: true,
              organizations: true,
            },
          },
          materials: true,
          fieldsOfCategoryMaterials: true,
        },
      });
      return existenceEntityHandler(newHandbook, HandbookEntity, EntityName.HANDBOOK) as HandbookEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
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
        include: {
          categoryMaterials: true,
          fieldUnitMeasurements: true,
          responsibleManager: true,
          responsiblePartnerProducers: true,
          workspace: {
            include: {
              workspaceMembers: true,
              organizations: true,
            },
          },
          materials: true,
          fieldsOfCategoryMaterials: true,
        },
      });

      return existenceEntityHandler(updatedHandbook, HandbookEntity, EntityName.HANDBOOK) as HandbookEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(handbookId: EntityUrlParamCommand.RequestUuidParam): Promise<HandbookEntity> {
    try {
      const deletedHandbook = await this.databaseService.handbook.delete({
        where: {
          uuid: handbookId,
        },
        include: {
          categoryMaterials: true,
          fieldUnitMeasurements: true,
          responsibleManager: true,
          responsiblePartnerProducers: true,
          workspace: {
            include: {
              workspaceMembers: true,
              organizations: true,
            },
          },
          materials: true,
          fieldsOfCategoryMaterials: true,
        },
      });

      return existenceEntityHandler(deletedHandbook, HandbookEntity, EntityName.HANDBOOK) as HandbookEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
