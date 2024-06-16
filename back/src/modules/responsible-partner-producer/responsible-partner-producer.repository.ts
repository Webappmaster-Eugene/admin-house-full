import { Inject, Injectable } from '@nestjs/common';
import { ResponsiblePartnerProducerCreateRequestDto } from './dto/controller/create-responsible-partner-producer.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IResponsiblePartnerProducerRepository } from './types/responsible-partner-producer.repository.interface';
import { ResponsiblePartnerProducerUpdateRequestDto } from './dto/controller/update-responsible-partner-producer.dto';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { ResponsiblePartnerProducerEntity } from './entities/responsible-partner-producer.entity';
import { KFI } from '../../common/utils/di';
import { QUANTITY_LIMIT } from '../../common/consts/take-quantity.limitation';
import { existenceEntityHandler } from '../../common/helpers/handlers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { limitTakeHandler } from '../../common/helpers/handlers/take-limit.handler';

@Injectable()
export class ResponsiblePartnerProducerRepository implements IResponsiblePartnerProducerRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam): Promise<ResponsiblePartnerProducerEntity> {
    try {
      const findedResponsiblePartnerProducer = await this.databaseService.responsiblePartnerProducer.findUnique({
        where: {
          uuid: responsiblePartnerProducerId,
        },
      });

      return existenceEntityHandler(
        findedResponsiblePartnerProducer,
        ResponsiblePartnerProducerEntity,
        EntityName.RESPONSIBLE_PARTNER_PRODUCER,
      ) as ResponsiblePartnerProducerEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAll(skip = 0, take = QUANTITY_LIMIT.TAKE_MAX_LIMIT): Promise<ResponsiblePartnerProducerEntity[]> {
    limitTakeHandler(take);

    try {
      const allResponsiblePartnerProducers = await this.databaseService.responsiblePartnerProducer.findMany({ take, skip });
      return existenceEntityHandler(
        allResponsiblePartnerProducers,
        ResponsiblePartnerProducerEntity,
        EntityName.RESPONSIBLE_PARTNER_PRODUCER,
      ) as ResponsiblePartnerProducerEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAllInHandbook(
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    skip = 0,
    take = QUANTITY_LIMIT.TAKE_MAX_LIMIT,
  ): Promise<ResponsiblePartnerProducerEntity[]> {
    limitTakeHandler(take);

    try {
      const allResponsiblePartnerProducers = await this.databaseService.responsiblePartnerProducer.findMany({
        where: { handbookUuid: handbookId },
        take,
        skip,
      });
      return existenceEntityHandler(
        allResponsiblePartnerProducers,
        ResponsiblePartnerProducerEntity,
        EntityName.RESPONSIBLE_PARTNER_PRODUCER,
      ) as ResponsiblePartnerProducerEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async create(
    dto: ResponsiblePartnerProducerCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<ResponsiblePartnerProducerEntity> {
    try {
      const { name, comment, email, info, phone } = dto;
      const newResponsiblePartnerProducer = await this.databaseService.responsiblePartnerProducer.create({
        data: { name, comment, email, info, phone, handbookUuid: handbookId },
      });
      return existenceEntityHandler(
        newResponsiblePartnerProducer,
        ResponsiblePartnerProducerEntity,
        EntityName.RESPONSIBLE_PARTNER_PRODUCER,
      ) as ResponsiblePartnerProducerEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(
    responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam,
    dto: ResponsiblePartnerProducerUpdateRequestDto,
  ): Promise<ResponsiblePartnerProducerEntity> {
    const { name, comment, email, info, phone } = dto;

    try {
      const updatedResponsiblePartnerProducer = await this.databaseService.responsiblePartnerProducer.update({
        where: {
          uuid: responsiblePartnerProducerId,
        },
        data: {
          name,
          comment,
          email,
          info,
          phone,
        },
      });

      return existenceEntityHandler(
        updatedResponsiblePartnerProducer,
        ResponsiblePartnerProducerEntity,
        EntityName.RESPONSIBLE_PARTNER_PRODUCER,
      ) as ResponsiblePartnerProducerEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam): Promise<ResponsiblePartnerProducerEntity> {
    try {
      const deletedResponsiblePartnerProducer = await this.databaseService.responsiblePartnerProducer.delete({
        where: {
          uuid: responsiblePartnerProducerId,
        },
      });

      return existenceEntityHandler(
        deletedResponsiblePartnerProducer,
        ResponsiblePartnerProducerEntity,
        EntityName.RESPONSIBLE_PARTNER_PRODUCER,
      ) as ResponsiblePartnerProducerEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
