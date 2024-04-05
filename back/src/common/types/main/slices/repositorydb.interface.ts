import { Prisma } from '@prisma/client';
import { UniversalServiceResponse } from '../../responses/universal-internal-response.interface';
import { EntityGetCommand } from '../../../../../libs/contracts/commands/common/get-param.command';

export interface IRepositoryDbCommon<
  CReqDto,
  UReqDto,
  RepositoryEntity,
  FReqDto = void,
  GReqParam = EntityGetCommand.RequestParam,
> {
  getById: (id: GReqParam) => Promise<RepositoryEntity>;
  getAll: () => Promise<RepositoryEntity[]>;
  create: (dto: CReqDto) => Promise<RepositoryEntity>;
  updateById: (id: GReqParam, dto: UReqDto) => Promise<RepositoryEntity>;
  deleteByIds: (ids: GReqParam[]) => Promise<Prisma.BatchPayload>;
  findByCriteria?: (
    dto: FReqDto,
    sort: Record<string, string>[],
  ) => Promise<RepositoryEntity>;
}
