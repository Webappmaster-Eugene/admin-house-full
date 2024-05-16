import { Prisma } from '.prisma/client';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export interface IRepositoryCommon<
  CReqDto,
  UReqDto,
  RepositoryEntity,
  FReqDto = void,
  GReqIdParam = EntityUrlParamCommand.RequestUuidParam,
  GReqNumberParam = EntityUrlParamCommand.RequestNumberParam,
> {
  getById: (id: GReqIdParam | GReqNumberParam, ...otherParams: unknown[]) => Promise<RepositoryEntity>;
  getAll: (...otherParams: unknown[]) => Promise<RepositoryEntity[]>;
  create: (dto: CReqDto, ...otherParams: unknown[]) => Promise<RepositoryEntity>;
  updateById: (id: GReqIdParam, dto: UReqDto, ...otherParams: unknown[]) => Promise<RepositoryEntity>;
  deleteById: (id: GReqIdParam, ...otherParams: unknown[]) => Promise<RepositoryEntity>;
  deleteByIds?: (ids: GReqIdParam[], ...otherParams: unknown[]) => Promise<Prisma.BatchPayload>;
  findByCriteria?: (dto: FReqDto, sort: Record<string, string>[], ...otherParams: unknown[]) => Promise<RepositoryEntity>;
}
