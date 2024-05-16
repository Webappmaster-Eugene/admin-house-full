import { Inject, Injectable } from '@nestjs/common';
import { StatusResourceCreateRequestDto } from './dto/controller/create-status-resource.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IStatusResourceRepository } from './types/status-resource.repository.interface';
import { StatusResourceUpdateRequestDto } from './dto/controller/update-status-resource.dto';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { StatusResourceEntity } from './entities/status-resource.entity';
import { KFI } from '../../common/utils/di';
import { QUANTITY_LIMIT } from '../../common/consts/take-quantity.limitation';
import { existenceEntityHandler } from '../../common/helpers/handlers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { limitTakeHandler } from '../../common/helpers/handlers/take-limit.handler';

@Injectable()
export class StatusResourceRepository implements IStatusResourceRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(statusResourceId: EntityUrlParamCommand.RequestUuidParam): Promise<StatusResourceEntity> {
    try {
      const findedStatusResource = await this.databaseService.statusResource.findUnique({
        where: {
          uuid: statusResourceId,
        },
      });

      return existenceEntityHandler(findedStatusResource, StatusResourceEntity, EntityName.STATUS_RESOURCE) as StatusResourceEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAll(skip = 0, take = QUANTITY_LIMIT.TAKE_5): Promise<StatusResourceEntity[]> {
    limitTakeHandler(take);

    try {
      const allStatusResources = await this.databaseService.statusResource.findMany({ take, skip });
      return existenceEntityHandler(allStatusResources, StatusResourceEntity, EntityName.STATUS_RESOURCE) as StatusResourceEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async create(dto: StatusResourceCreateRequestDto): Promise<StatusResourceEntity> {
    try {
      const { name, comment } = dto;
      const newStatusResource = await this.databaseService.statusResource.create({
        data: { name, comment },
      });
      return existenceEntityHandler(newStatusResource, StatusResourceEntity, EntityName.STATUS_RESOURCE) as StatusResourceEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(
    statusResourceId: EntityUrlParamCommand.RequestUuidParam,
    { name, comment }: StatusResourceUpdateRequestDto,
  ): Promise<StatusResourceEntity> {
    try {
      const updatedStatusResource = await this.databaseService.statusResource.update({
        where: {
          uuid: statusResourceId,
        },
        data: {
          name,
          comment,
        },
      });

      return existenceEntityHandler(updatedStatusResource, StatusResourceEntity, EntityName.STATUS_RESOURCE) as StatusResourceEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(id: EntityUrlParamCommand.RequestUuidParam): Promise<StatusResourceEntity> {
    try {
      const deletedStatusResource = await this.databaseService.statusResource.delete({
        where: {
          uuid: id,
        },
      });

      return existenceEntityHandler(deletedStatusResource, StatusResourceEntity, EntityName.STATUS_RESOURCE) as StatusResourceEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
