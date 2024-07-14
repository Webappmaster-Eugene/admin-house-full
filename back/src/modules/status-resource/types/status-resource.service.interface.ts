import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { StatusResourceCreateRequestDto } from '../dto/controller/create-status-resource.dto';
import { StatusResourceUpdateRequestDto } from '../dto/controller/update-status-resource.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { StatusResourceEntity } from '../entities/status-resource.entity';
import { EntityUrlParamCommand } from 'libs/contracts';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface IStatusResourceService
  extends IServiceCommon<StatusResourceCreateRequestDto, StatusResourceUpdateRequestDto, StatusResourceEntity> {
  getById: (statusResourceId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<StatusResourceEntity>>;
  getAll: (queryParams?: IQueryParams) => Promise<UniversalInternalResponse<StatusResourceEntity[]>>;
  create: (dto: StatusResourceCreateRequestDto) => Promise<UniversalInternalResponse<StatusResourceEntity>>;
  updateById: (
    statusResourceId: EntityUrlParamCommand.RequestUuidParam,
    dto: StatusResourceUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<StatusResourceEntity>>;
  deleteById: (statusResourceId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<StatusResourceEntity>>;
}
