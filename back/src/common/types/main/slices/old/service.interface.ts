import { Prisma } from '@prisma/client';
import { UniversalInternalResponse } from '../../../responses/universal-internal-response.interface';
import { EntityUrlParamCommand } from '../../../../../../libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../../jwt.payload.interface';

export interface IServiceCommon<
  CReqDto,
  UReqDto,
  ENTITY,
  CReqParamDto = EntityUrlParamCommand.RequestUuidParam,
  FReqDto = void,
  GReqIdParam = EntityUrlParamCommand.RequestUuidParam,
  GReqNumberParam = EntityUrlParamCommand.RequestNumberParam,
> {
  getById: (
    id: GReqIdParam | GReqNumberParam,
  ) => Promise<UniversalInternalResponse<ENTITY | null>>;
  getAll: () => Promise<UniversalInternalResponse<ENTITY[] | null>>;
  create: (
    dto: CReqDto,
    idToIdentify?: GReqNumberParam | GReqIdParam | IJWTPayload,
    paramDto?: GReqIdParam | CReqParamDto,
  ) => Promise<UniversalInternalResponse<ENTITY>>;
  updateById: (
    id: GReqIdParam,
    dto: UReqDto,
  ) => Promise<UniversalInternalResponse<ENTITY>>;
  deleteById: (ids: GReqIdParam) => Promise<UniversalInternalResponse<ENTITY>>;
  deleteByIds?: (
    ids: GReqIdParam[],
  ) => Promise<UniversalInternalResponse<Prisma.BatchPayload>>;
  findByCriteria?: (
    dto: FReqDto,
    sort: Record<string, string>[],
  ) => Promise<UniversalInternalResponse<ENTITY[]>>;
}
