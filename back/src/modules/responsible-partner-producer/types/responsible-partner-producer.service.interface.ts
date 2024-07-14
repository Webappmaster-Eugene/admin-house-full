import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { ResponsiblePartnerProducerCreateRequestDto } from '../dto/controller/create-responsible-partner-producer.dto';
import { ResponsiblePartnerProducerUpdateRequestDto } from '../dto/controller/update-responsible-partner-producer.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { ResponsiblePartnerProducerEntity } from '../entities/responsible-partner-producer.entity';
import { EntityUrlParamCommand } from 'libs/contracts';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface IResponsiblePartnerProducerService
  extends IServiceCommon<
    ResponsiblePartnerProducerCreateRequestDto,
    ResponsiblePartnerProducerUpdateRequestDto,
    ResponsiblePartnerProducerEntity
  > {
  getById: (
    responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<ResponsiblePartnerProducerEntity>>;
  getAll: (queryParams?: IQueryParams) => Promise<UniversalInternalResponse<ResponsiblePartnerProducerEntity[]>>;
  getAllInHandbook: (
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ) => Promise<UniversalInternalResponse<ResponsiblePartnerProducerEntity[]>>;
  create: (
    dto: ResponsiblePartnerProducerCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<ResponsiblePartnerProducerEntity>>;
  updateById: (
    responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam,
    dto: ResponsiblePartnerProducerUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<ResponsiblePartnerProducerEntity>>;
  deleteById: (
    responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<ResponsiblePartnerProducerEntity>>;
}
