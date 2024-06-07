import { TechLogChangesGetResponseDto } from 'src/modules/tech/tech-log-changes/dto/controller/get-tech-log-changes.dto';
import { TechLogChangesGetAllResponseDto } from 'src/modules/tech/tech-log-changes/dto/controller/get-all-tech-log-changes.dto';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { IUrlParams } from 'src/common/decorators/url-params.decorator';
import { IQueryParams } from 'src/common/decorators/query-params.decorator';
import { EntityName } from 'src/common/types/entity.enum';

export interface ITechLogChangesController {
  getByUuidEP: (techLogChangesUuid: EntityUrlParamCommand.RequestUuidParam, urlParams: IUrlParams) => Promise<TechLogChangesGetResponseDto>;
  getAllEP: (urlParams?: IUrlParams, queryParams?: IQueryParams) => Promise<TechLogChangesGetAllResponseDto>;
  getAllFromEntityEP: (
    EntityNameToSearch: EntityName,
    urlParams?: IUrlParams,
    queryParams?: IQueryParams,
  ) => Promise<TechLogChangesGetAllResponseDto>;
}
