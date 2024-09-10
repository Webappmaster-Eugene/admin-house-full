import { Inject, Injectable } from '@nestjs/common';
import { StatusApproveCreateRequestDto } from '../../modules/status-approve/dto/controller/create-status-approve.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IStatusApproveRepository } from './types/status-approve.repository.interface';
import { StatusApproveUpdateRequestDto } from '../../modules/status-approve/dto/controller/update-status-approve.dto';
import { EntityUrlParamCommand } from 'libs/contracts';
import { KFI } from '../../common/utils/di';
import { QUANTITY_LIMIT } from '../../common/consts/take-quantity.limitation';
import { existenceEntityHandler } from '../../common/helpers/handlers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { limitTakeHandler } from '../../common/helpers/handlers/take-limit.handler';
import { StatusApproveEntity } from '../../modules/status-approve/entities/status-approve.entity';

@Injectable()
export class StatusApproveRepository implements IStatusApproveRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(statusApproveId: EntityUrlParamCommand.RequestUuidParam): Promise<StatusApproveEntity> {
    try {
      const findedStatusApprove = await this.databaseService.statusApprove.findUnique({
        where: {
          uuid: statusApproveId,
        },
      });

      const approveStatus = existenceEntityHandler(
        findedStatusApprove,
        StatusApproveEntity,
        EntityName.STATUS_APPROVE,
      ) as StatusApproveEntity;
      return approveStatus;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAll(skip = 0, take = QUANTITY_LIMIT.TAKE_5): Promise<StatusApproveEntity[]> {
    limitTakeHandler(take);

    try {
      const allStatusApproves = await this.databaseService.statusApprove.findMany({ take, skip });
      return existenceEntityHandler(allStatusApproves, StatusApproveEntity, EntityName.STATUS_APPROVE) as StatusApproveEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async create(dto: StatusApproveCreateRequestDto): Promise<StatusApproveEntity> {
    try {
      const { name, comment, nameRu } = dto;
      const newStatusApprove = await this.databaseService.statusApprove.create({
        data: { name, comment, nameRu },
      });
      return existenceEntityHandler(newStatusApprove, StatusApproveEntity, EntityName.STATUS_APPROVE) as StatusApproveEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(
    statusApproveId: EntityUrlParamCommand.RequestUuidParam,
    { name, comment, nameRu }: StatusApproveUpdateRequestDto,
  ): Promise<StatusApproveEntity> {
    try {
      const updatedStatusApprove = await this.databaseService.statusApprove.update({
        where: {
          uuid: statusApproveId,
        },
        data: {
          name,
          comment,
          nameRu,
        },
      });

      return existenceEntityHandler(updatedStatusApprove, StatusApproveEntity, EntityName.STATUS_APPROVE) as StatusApproveEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(id: EntityUrlParamCommand.RequestUuidParam): Promise<StatusApproveEntity> {
    try {
      const deletedStatusApprove = await this.databaseService.statusApprove.delete({
        where: {
          uuid: id,
        },
      });

      return existenceEntityHandler(deletedStatusApprove, StatusApproveEntity, EntityName.STATUS_APPROVE) as StatusApproveEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
