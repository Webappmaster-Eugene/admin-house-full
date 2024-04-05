import { Prisma } from '@prisma/client';
import { UniversalServiceResponse } from '../../responses/universal-service-response.interface';
import { EntityGetCommand } from '../../../../../libs/contracts/commands/common/get-param.command';

export interface IServiceCommon<
  CReqDto,
  UReqDto,
  ENTITY,
  FReqDto = void,
  GReqParam = EntityGetCommand.RequestParam,
> {
  getById: (id: GReqParam) => Promise<UniversalServiceResponse<ENTITY | null>>;
  getAll: () => Promise<UniversalServiceResponse<ENTITY[] | null>>;
  create: (dto: CReqDto) => Promise<UniversalServiceResponse<ENTITY>>;
  updateById: (
    id: GReqParam,
    dto: UReqDto,
  ) => Promise<UniversalServiceResponse<ENTITY>>;
  deleteByIds: (
    ids: GReqParam[],
  ) => Promise<UniversalServiceResponse<Prisma.BatchPayload>>;
  findByCriteria?: (
    dto: FReqDto,
    sort: Record<string, string>[],
  ) => Promise<UniversalServiceResponse<ENTITY[]>>;
}
