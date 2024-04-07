import { Prisma } from '@prisma/client';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export interface IRepositoryCommon<
  CReqDto,
  UReqDto,
  RepositoryEntity,
  FReqDto = void,
  GReqParam = EntityUrlParamCommand.RequestParam,
  GReqParamNumber = EntityUrlParamCommand.RequestParamNumber,
> {
  getById: (id: GReqParam | GReqParamNumber) => Promise<RepositoryEntity>;
  getAll: () => Promise<RepositoryEntity[]>;
  create: (dto: CReqDto) => Promise<RepositoryEntity>;
  updateById: (id: GReqParam, dto: UReqDto) => Promise<RepositoryEntity>;
  deleteById: (id: GReqParam) => Promise<RepositoryEntity>;
  deleteByIds?: (ids: GReqParam[]) => Promise<Prisma.BatchPayload>;
  findByCriteria?: (
    dto: FReqDto,
    sort: Record<string, string>[],
  ) => Promise<RepositoryEntity>;
}
