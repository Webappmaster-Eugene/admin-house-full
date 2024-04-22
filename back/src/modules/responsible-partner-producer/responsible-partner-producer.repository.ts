import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ResponsiblePartnerProducerCreateRequestDto } from './dto/controller/create-responsible-partner-producer.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IResponsiblePartnerProducerRepository } from './types/responsible-partner-producer.repository.interface';
import { ResponsiblePartnerProducerUpdateRequestDto } from './dto/controller/update-responsible-partner-producer.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { ResponsiblePartnerProducerEntity } from './entities/responsible-partner-producer.entity';
import { toEntityArray } from '../../common/utils/mappers';
import {
  DEFAULT_HANDBOOK_DESCRIPTION,
  DEFAULT_HANDBOOK_NAME,
} from './lib/consts/responsible-partner-producer.default-data';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import {
  BackendErrorNames,
  InternalError,
} from '../../common/errors/errors.backend';
import { jsonStringify } from '../../common/helpers/stringify';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ResponsiblePartnerProducerRepository
  implements IResponsiblePartnerProducerRepository
{
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(
    responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<ResponsiblePartnerProducerEntity> {
    try {
      const findedResponsiblePartnerProducer =
        await this.databaseService.responsiblePartnerProducer.findUnique({
          where: {
            uuid: responsiblePartnerProducerId,
          },
        });

      if (findedResponsiblePartnerProducer) {
        return new ResponsiblePartnerProducerEntity(
          findedResponsiblePartnerProducer,
        );
      } else {
        throw new NotFoundException({
          message: `ResponsiblePartnerProducer with id=${responsiblePartnerProducerId} not found`,
          description:
            'ResponsiblePartnerProducer from your request did not found in the database',
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

  async getAll(): Promise<ResponsiblePartnerProducerEntity[]> {
    try {
      const allResponsiblePartnerProducers =
        await this.databaseService.responsiblePartnerProducer.findMany();
      return toEntityArray<ResponsiblePartnerProducerEntity>(
        allResponsiblePartnerProducers,
        ResponsiblePartnerProducerEntity,
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
    dto: ResponsiblePartnerProducerCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<ResponsiblePartnerProducerEntity> {
    try {
      const { name, description, canCustomerView, workspaceUuid } = dto;
      const newResponsiblePartnerProducer =
        await this.databaseService.responsiblePartnerProducer.create({
          data: {},
        });
      return new ResponsiblePartnerProducerEntity(
        newResponsiblePartnerProducer,
      );
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
    responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam,
    { name, description }: ResponsiblePartnerProducerUpdateRequestDto,
  ): Promise<ResponsiblePartnerProducerEntity> {
    try {
      const updatedResponsiblePartnerProducer =
        await this.databaseService.responsiblePartnerProducer.update({
          where: {
            uuid: responsiblePartnerProducerId,
          },
          data: {
            name,
            description,
          },
        });

      return new ResponsiblePartnerProducerEntity(
        updatedResponsiblePartnerProducer,
      );
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
    responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<ResponsiblePartnerProducerEntity> {
    try {
      const deletedResponsiblePartnerProducer =
        await this.databaseService.responsiblePartnerProducer.delete({
          where: {
            uuid: responsiblePartnerProducerId,
          },
        });

      return new ResponsiblePartnerProducerEntity(
        deletedResponsiblePartnerProducer,
      );
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
