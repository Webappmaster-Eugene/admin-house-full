import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { HandbookCreateRequestDto } from '../dto/controller/create-handbook.dto';
import { HandbookUpdateRequestDto } from '../dto/controller/update-handbook.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { HandbookEntity } from '../entities/handbook.entity';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';
import { TransactionDbClient } from '../../../common/types/transaction-prisma-client.type';

export interface IHandbookService extends IServiceCommon<HandbookCreateRequestDto, HandbookUpdateRequestDto, HandbookEntity> {
  getById: (handbookId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<HandbookEntity>>;
  getByManagerId: (managerId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<HandbookEntity>>;
  getAll: (queryParams?: IQueryParams) => Promise<UniversalInternalResponse<HandbookEntity[]>>;
  create: (
    dto: HandbookCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
    transactionDbClient?: TransactionDbClient,
  ) => Promise<UniversalInternalResponse<HandbookEntity>>;
  updateById: (
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    dto: HandbookUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<HandbookEntity>>;
  deleteById: (handbookId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<HandbookEntity>>;
}
