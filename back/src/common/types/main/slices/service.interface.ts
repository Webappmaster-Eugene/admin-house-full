import { Prisma } from '@prisma/client';
import { UniversalInternalResponse } from '../../responses/universal-internal-response.interface';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export interface IServiceCommon<
  CReqDto,
  UReqDto,
  ENTITY,
  FReqDto = void,
  GReqParam = EntityUrlParamCommand.RequestParam,
  GReqParamNumber = EntityUrlParamCommand.RequestParamNumber,
> {
  getById: (
    id: GReqParam | GReqParamNumber,
  ) => Promise<UniversalInternalResponse<ENTITY | null>>;
  getAll: () => Promise<UniversalInternalResponse<ENTITY[] | null>>;
  create: (dto: CReqDto) => Promise<UniversalInternalResponse<ENTITY>>;
  updateById: (
    id: GReqParam,
    dto: UReqDto,
  ) => Promise<UniversalInternalResponse<ENTITY>>;
  deleteById: (ids: GReqParam) => Promise<UniversalInternalResponse<ENTITY>>;
  deleteByIds?: (
    ids: GReqParam[],
  ) => Promise<UniversalInternalResponse<Prisma.BatchPayload>>;
  findByCriteria?: (
    dto: FReqDto,
    sort: Record<string, string>[],
  ) => Promise<UniversalInternalResponse<ENTITY[]>>;
}
