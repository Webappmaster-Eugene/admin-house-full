import { TechLogChangesGetResponseDto } from '../../../../modules/tech/tech-log-changes/dto/controller/get-tech-log-changes.dto';
import { TechLogChangesGetAllResponseDto } from '../../../../modules/tech/tech-log-changes/dto/controller/get-all-tech-log-changes.dto';
import { EntityUrlParamCommand } from 'libs/contracts';
import { IUrlParams } from '../../../../common/decorators/url-params.decorator';
import { IQueryParams } from '../../../../common/decorators/query-params.decorator';
import { EntityName } from '../../../../common/types/entity.enum';

export interface ITechLogChangesController {
  getByUuidEP: (techLogChangesUuid: EntityUrlParamCommand.RequestUuidParam, urlParams: IUrlParams) => Promise<TechLogChangesGetResponseDto>;
  getAllEP: (urlParams?: IUrlParams, queryParams?: IQueryParams) => Promise<TechLogChangesGetAllResponseDto>;
  getAllFromEntityEP: (
    EntityNameToSearch: EntityName,
    urlParams?: IUrlParams,
    queryParams?: IQueryParams,
  ) => Promise<TechLogChangesGetAllResponseDto>;
}
