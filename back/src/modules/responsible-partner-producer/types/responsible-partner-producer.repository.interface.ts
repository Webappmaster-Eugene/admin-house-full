import { ResponsiblePartnerProducerCreateRequestDto } from '../dto/controller/create-responsible-partner-producer.dto';
import { ResponsiblePartnerProducerUpdateRequestDto } from '../dto/controller/update-responsible-partner-producer.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { ResponsiblePartnerProducerEntity } from '../entities/responsible-partner-producer.entity';

export interface IResponsiblePartnerProducerRepository
  extends IRepositoryCommon<
    ResponsiblePartnerProducerCreateRequestDto,
    ResponsiblePartnerProducerUpdateRequestDto,
    ResponsiblePartnerProducerEntity
  > {
  getById: (responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam) => Promise<ResponsiblePartnerProducerEntity>;
  getAll: (skip?: number, take?: number) => Promise<ResponsiblePartnerProducerEntity[]>;
  create: (dto: ResponsiblePartnerProducerCreateRequestDto) => Promise<ResponsiblePartnerProducerEntity>;
  updateById: (
    responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam,
    dto: ResponsiblePartnerProducerUpdateRequestDto,
  ) => Promise<ResponsiblePartnerProducerEntity>;
  deleteById: (responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam) => Promise<ResponsiblePartnerProducerEntity>;
}