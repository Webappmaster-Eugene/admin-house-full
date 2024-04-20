import { Prisma } from '@prisma/client';
import { EntityUrlParamCommand } from '../../../../../../libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../../jwt.payload.interface';

export interface IRepositoryCommon<
  CReqDto,
  UReqDto,
  RepositoryEntity,
  FReqDto = void,
  GReqIdParam = EntityUrlParamCommand.RequestUuidParam,
  GReqNumberParam = EntityUrlParamCommand.RequestNumberParam,
> {
  getById: (id: GReqIdParam | GReqNumberParam) => Promise<RepositoryEntity>;
  getAll: () => Promise<RepositoryEntity[]>;
  create: (
    dto: CReqDto,
    idToIdentify?: GReqNumberParam | GReqIdParam | IJWTPayload,
    idToIdentifyEntity?: GReqIdParam,
  ) => Promise<RepositoryEntity>;
  updateById: (id: GReqIdParam, dto: UReqDto) => Promise<RepositoryEntity>;
  deleteById: (id: GReqIdParam) => Promise<RepositoryEntity>;
  deleteByIds?: (ids: GReqIdParam[]) => Promise<Prisma.BatchPayload>;
  findByCriteria?: (
    dto: FReqDto,
    sort: Record<string, string>[],
  ) => Promise<RepositoryEntity>;
}
