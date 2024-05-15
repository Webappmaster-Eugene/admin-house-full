import { Prisma } from '@prisma/client';
import { UniversalInternalResponse } from '../../responses/universal-internal-response.interface';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../jwt.payload.interface';

export interface IServiceCommon<
  CReqDto,
  UReqDto,
  ENTITY,
  FReqDto = void,
  GReqIdParam = EntityUrlParamCommand.RequestUuidParam,
  GReqNumberParam = EntityUrlParamCommand.RequestNumberParam,
> {
  getById: (id: GReqIdParam | GReqNumberParam, ...otherParams: unknown[]) => Promise<UniversalInternalResponse<ENTITY | null>>;
  getAll: (...otherParams: unknown[]) => Promise<UniversalInternalResponse<ENTITY[] | null>>;
  create: (dto: CReqDto, ...otherParams: unknown[]) => Promise<UniversalInternalResponse<ENTITY>>;
  updateById: (id: GReqIdParam, dto: UReqDto, ...otherParams: unknown[]) => Promise<UniversalInternalResponse<ENTITY>>;
  deleteById: (ids: GReqIdParam, ...otherParams: unknown[]) => Promise<UniversalInternalResponse<ENTITY>>;
  deleteByIds?: (ids: GReqIdParam[], ...otherParams: unknown[]) => Promise<UniversalInternalResponse<Prisma.BatchPayload>>;
  findByCriteria?: (
    dto: FReqDto,
    sort: Record<string, string>[],
    ...otherParams: unknown[]
  ) => Promise<UniversalInternalResponse<ENTITY[]>>;
}
