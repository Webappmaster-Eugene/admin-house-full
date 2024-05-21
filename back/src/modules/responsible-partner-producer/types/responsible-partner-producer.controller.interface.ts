import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import {
  ResponsiblePartnerProducerCreateRequestDto,
  ResponsiblePartnerProducerCreateResponseDto,
} from '../dto/controller/create-responsible-partner-producer.dto';
import {
  ResponsiblePartnerProducerUpdateRequestDto,
  ResponsiblePartnerProducerUpdateResponseDto,
} from '../dto/controller/update-responsible-partner-producer.dto';
import { ResponsiblePartnerProducerGetResponseDto } from '../dto/controller/get-responsible-partner-producer.dto';
import { ResponsiblePartnerProducerGetAllResponseDto } from '../dto/controller/get-all-responsible-partner-producers.dto';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { ResponsiblePartnerProducerDeleteResponseDto } from '../dto/controller/delete-responsible-partner-producer.dto';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface IResponsiblePartnerProducerController
  extends IControllerCommon<
    ResponsiblePartnerProducerCreateRequestDto,
    ResponsiblePartnerProducerUpdateRequestDto,
    ResponsiblePartnerProducerGetResponseDto,
    ResponsiblePartnerProducerGetAllResponseDto,
    ResponsiblePartnerProducerCreateResponseDto,
    ResponsiblePartnerProducerUpdateResponseDto,
    ResponsiblePartnerProducerDeleteResponseDto
  > {
  getByIdEP: (
    responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<ResponsiblePartnerProducerGetResponseDto>;
  getAllEP: (urlParams: IUrlParams, queryParams?: IQueryParams) => Promise<ResponsiblePartnerProducerGetAllResponseDto>;
  createEP: (
    dto: ResponsiblePartnerProducerCreateRequestDto,
    urlParams: IUrlParams,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<ResponsiblePartnerProducerCreateResponseDto>;
  updateByIdEP: (
    responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam,
    dto: ResponsiblePartnerProducerUpdateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<ResponsiblePartnerProducerUpdateResponseDto>;
  deleteByIdEP: (
    responsiblePartnerProducerId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<ResponsiblePartnerProducerDeleteResponseDto>;
}
