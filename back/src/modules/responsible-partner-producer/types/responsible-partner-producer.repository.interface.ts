import { ResponsiblePartnerProducerCreateRequestDto } from '../dto/controller/create-responsible-partner-producer.dto';
import { ResponsiblePartnerProducerUpdateRequestDto } from '../dto/controller/update-responsible-partner-producer.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../../common/types/main/count.data';
import { ResponsiblePartnerProducerEntity } from '../entities/responsible-partner-producer.entity';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';

export interface IResponsiblePartnerProducerRepository
  extends IRepositoryCommon<
    ResponsiblePartnerProducerCreateRequestDto,
    ResponsiblePartnerProducerUpdateRequestDto,
    ResponsiblePartnerProducerEntity
  > {
  getById: (responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam) => Promise<ResponsiblePartnerProducerEntity>;
  getAll: (skip?: number, take?: number) => Promise<ResponsiblePartnerProducerEntity[]>;
  create: (
    dto: ResponsiblePartnerProducerCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<ResponsiblePartnerProducerEntity>;
  updateById: (
    responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam,
    dto: ResponsiblePartnerProducerUpdateRequestDto,
  ) => Promise<ResponsiblePartnerProducerEntity>;
  deleteById: (responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam) => Promise<ResponsiblePartnerProducerEntity>;
}
