import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { MaterialCreateRequestDto } from '../dto/controller/create-material.dto';
import { MaterialUpdateRequestDto } from '../dto/controller/update-material.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { MaterialEntity } from '../entities/material.entity';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface IMaterialService extends IServiceCommon<MaterialCreateRequestDto, MaterialUpdateRequestDto, MaterialEntity> {
  getById: (materialId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<MaterialEntity>>;
  getAll: (queryParams?: IQueryParams) => Promise<UniversalInternalResponse<MaterialEntity[]>>;
  create: (
    dto: MaterialCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<MaterialEntity>>;
  updateById: (
    materialId: EntityUrlParamCommand.RequestUuidParam,
    dto: MaterialUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<MaterialEntity>>;
  deleteById: (materialId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<MaterialEntity>>;
}
