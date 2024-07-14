import { TechLogChangesCreateRequestDto } from 'src/modules/tech/tech-log-changes/dto/controller/create-tech-log-changes.dto';
import { UniversalInternalResponse } from '../../../../common/types/responses/universal-internal-response.interface';
import { TechLogChangesEntity } from 'src/modules/tech/tech-log-changes/entities/tech-log-changes.entity';
import { IQueryParams } from '../../../../common/decorators/query-params.decorator';
import { EntityUrlParamCommand } from 'libs/contracts';
import { EntityName } from 'src/common/types/entity.enum';

export interface ITechLogChangesService {
  getByUuid: (techLogChangesUuid: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<TechLogChangesEntity>>;
  getAll: (queryParams?: IQueryParams) => Promise<UniversalInternalResponse<TechLogChangesEntity[]>>;
  getAllFromEntity: (
    EntityNameToSearch: EntityName,
    queryParams?: IQueryParams,
  ) => Promise<UniversalInternalResponse<TechLogChangesEntity[]>>;
  create: (EntityNameToCreate: EntityName, dto: TechLogChangesCreateRequestDto) => Promise<UniversalInternalResponse<TechLogChangesEntity>>;
}
