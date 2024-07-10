import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { StatusApproveCreateRequestDto } from 'src/modules/status-approve/dto/controller/create-status-approve.dto';
import { StatusApproveUpdateRequestDto } from 'src/modules/status-approve/dto/controller/update-status-approve.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';
import { StatusApproveEntity } from 'src/modules/status-approve/entities/status-approve.entity';

export interface IStatusApproveService
  extends IServiceCommon<StatusApproveCreateRequestDto, StatusApproveUpdateRequestDto, StatusApproveEntity> {
  getById: (statusApproveId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<StatusApproveEntity>>;
  getAll: (queryParams?: IQueryParams) => Promise<UniversalInternalResponse<StatusApproveEntity[]>>;
  create: (dto: StatusApproveCreateRequestDto) => Promise<UniversalInternalResponse<StatusApproveEntity>>;
  updateById: (
    statusApproveId: EntityUrlParamCommand.RequestUuidParam,
    dto: StatusApproveUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<StatusApproveEntity>>;
  deleteById: (statusApproveId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<StatusApproveEntity>>;
}
