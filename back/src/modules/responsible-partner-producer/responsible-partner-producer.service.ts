import { Inject, Injectable } from '@nestjs/common';
import { ResponsiblePartnerProducerEntity } from './entities/responsible-partner-producer.entity';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { KFI } from '../../common/utils/di';
import { IResponsiblePartnerProducerRepository } from './types/responsible-partner-producer.repository.interface';
import { ResponsiblePartnerProducerUpdateRequestDto } from './dto/controller/update-responsible-partner-producer.dto';
import { IResponsiblePartnerProducerService } from './types/responsible-partner-producer.service.interface';
import { ResponsiblePartnerProducerCreateRequestDto } from './dto/controller/create-responsible-partner-producer.dto';
import { IQueryParams } from '../../common/decorators/query-params.decorator';

@Injectable()
export class ResponsiblePartnerProducerService implements IResponsiblePartnerProducerService {
  constructor(
    @Inject(KFI.RESPONSIBLE_PARTNER_PRODUCER_REPOSITORY)
    private readonly responsiblePartnerProducerRepository: IResponsiblePartnerProducerRepository,
  ) {}

  async getById(
    responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<ResponsiblePartnerProducerEntity>> {
    const findedResponsiblePartnerProducer = await this.responsiblePartnerProducerRepository.getById(responsiblePartnerProducerId);
    return new InternalResponse(findedResponsiblePartnerProducer);
  }

  async getAll(queryParams?: IQueryParams): Promise<UniversalInternalResponse<ResponsiblePartnerProducerEntity[]>> {
    const { skip, take } = queryParams;
    const allResponsiblePartnerProducers = await this.responsiblePartnerProducerRepository.getAll(skip, take);
    return new InternalResponse(allResponsiblePartnerProducers);
  }

  // для создания ResponsiblePartnerProducer нужно указать id пользователя (менеджера), для которого создается ResponsiblePartnerProducer
  async create(
    dto: ResponsiblePartnerProducerCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<ResponsiblePartnerProducerEntity>> {
    const createdResponsiblePartnerProducer = await this.responsiblePartnerProducerRepository.create(dto, managerId);
    return new InternalResponse(createdResponsiblePartnerProducer);
  }

  async updateById(
    responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam,
    dto: ResponsiblePartnerProducerUpdateRequestDto,
  ): Promise<UniversalInternalResponse<ResponsiblePartnerProducerEntity>> {
    const updatedResponsiblePartnerProducer = await this.responsiblePartnerProducerRepository.updateById(responsiblePartnerProducerId, dto);
    return new InternalResponse(updatedResponsiblePartnerProducer);
  }

  async deleteById(
    responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<ResponsiblePartnerProducerEntity>> {
    const deletedResponsiblePartnerProducer = await this.responsiblePartnerProducerRepository.deleteById(responsiblePartnerProducerId);
    return new InternalResponse(deletedResponsiblePartnerProducer);
  }
}
