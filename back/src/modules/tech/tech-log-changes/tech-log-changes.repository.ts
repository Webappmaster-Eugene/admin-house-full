import { Inject, Injectable } from '@nestjs/common';
import { TechLogChangesCreateRequestDto } from './dto/controller/create-tech-log-changes.dto';
import { IPrismaService } from '../../../common/types/main/prisma.interface';
import { ITechLogChangesRepository } from './types/tech-log-changes.repository.interface';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { TechLogChangesEntity } from './entities/tech-log-changes.entity';
import { KFI } from '../../../common/utils/di';
import { existenceEntityHandler } from '../../../common/helpers/handlers/existance-entity-handler';
import { EntityName } from '../../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../../common/helpers/handlers/error-repository.handler';
import { QUANTITY_LIMIT } from 'src/common/consts/take-quantity.limitation';

@Injectable()
export class TechLogChangesRepository implements ITechLogChangesRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getByUuid(techLogChangesUuid: EntityUrlParamCommand.RequestUuidParam): Promise<TechLogChangesEntity> {
    try {
      const concreteTechLogChanges = await this.databaseService.techLogChanges.findUnique({
        where: {
          uuid: techLogChangesUuid,
        },
      });

      return existenceEntityHandler(concreteTechLogChanges, TechLogChangesEntity, EntityName.TECH_LOG_CHANGES) as TechLogChangesEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAll(skip = 0, take = QUANTITY_LIMIT.TAKE_MAX_LIMIT): Promise<TechLogChangesEntity[]> {
    try {
      const allTechLogChangess = await this.databaseService.techLogChanges.findMany({ skip, take });
      return existenceEntityHandler(allTechLogChangess, TechLogChangesEntity, EntityName.TECH_LOG_CHANGES) as TechLogChangesEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAllFromEntity(EntityNameToSearch: EntityName, skip = 0, take = QUANTITY_LIMIT.TAKE_MAX_LIMIT): Promise<TechLogChangesEntity[]> {
    try {
      const allTechLogChangess = await this.databaseService.techLogChanges.findMany({
        where: {
          entity: EntityNameToSearch,
        },
        skip,
        take,
      });
      return existenceEntityHandler(allTechLogChangess, TechLogChangesEntity, EntityName.TECH_LOG_CHANGES) as TechLogChangesEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async create(EntityNameToCreate: EntityName, dto: TechLogChangesCreateRequestDto): Promise<TechLogChangesEntity> {
    try {
      const updateInfo = JSON.stringify(dto.updateInfo);
      const oldInfo = JSON.stringify(dto.oldInfo);
      const newInfo = JSON.stringify(dto.newInfo);

      const newTechLogChanges = await this.databaseService.techLogChanges.create({
        data: {
          name: dto.name,
          updateInfo,
          oldInfo,
          newInfo,
          action: dto.action,
          comment: dto.comment,
          entity: EntityNameToCreate,
        },
      });
      return existenceEntityHandler(newTechLogChanges, TechLogChangesEntity, EntityName.TECH_LOG_CHANGES) as TechLogChangesEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
