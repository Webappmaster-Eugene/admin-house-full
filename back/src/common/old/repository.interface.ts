import { Prisma } from '@prisma/client';
import { UniversalServiceResponse } from '../types/responses/universal-internal-response.interface';
import { EntityGetCommand } from '../../../libs/contracts/commands/common/get-param.command';

export interface DeprecatedIRepositoryCommon<
  CReqDto,
  UReqDto,
  GResDto,
  GAResDto,
  CResDto,
  UResDto,
  FReqDto = void,
  FResDto = void,
  GReqParam = EntityGetCommand.RequestParam,
> {
  getById: (id: GReqParam) => Promise<GResDto>;
  getAll: () => Promise<GAResDto[]>;
  create: (dto: CReqDto) => Promise<CResDto>;
  updateById: (id: GReqParam, dto: UReqDto) => Promise<UResDto>;
  deleteByIds: (
    ids: GReqParam[],
  ) => Promise<UniversalServiceResponse<Prisma.BatchPayload>>;
  findByCriteria?: (
    dto: FReqDto,
    sort: Record<string, string>[],
  ) => Promise<FResDto>;
}
