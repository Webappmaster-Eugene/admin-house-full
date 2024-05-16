import { Prisma } from '@prisma/client';
import { UniversalExternalResponse } from '../../responses/universal-external-response.interface';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../jwt.payload.interface';
import { IUrlParams } from '../../../decorators/url-params.decorator';

export interface IControllerCommon<
  CReqDto,
  UReqDto,
  GResDto,
  GAResDto,
  CResDto,
  UResDto,
  DResDto,
  FReqDto = void,
  FResDto = void,
  GReqIdParam = EntityUrlParamCommand.RequestUuidParam,
  GReqNumberParam = EntityUrlParamCommand.RequestNumberParam,
> {
  getByIdEP: (id: GReqIdParam | GReqNumberParam, urlParams: IUrlParams, ...otherParams: unknown[]) => Promise<GResDto>;
  getAllEP: (urlParams?: IUrlParams, ...otherParams: unknown[]) => Promise<GAResDto>;
  createEP: (dto: CReqDto, urlParams: IUrlParams, ...otherParams: unknown[]) => Promise<CResDto>;
  updateByIdEP: (id: GReqIdParam, dto: UReqDto, urlParams?: IUrlParams, ...otherParams: unknown[]) => Promise<UResDto>;
  deleteByIdEP: (id: GReqIdParam, urlParams?: IUrlParams, ...otherParams: unknown[]) => Promise<DResDto>;
  deleteByIdsEP?: (
    ids: GReqIdParam[],
    urlParams: IUrlParams,
    ...otherParams: unknown[]
  ) => Promise<UniversalExternalResponse<Prisma.BatchPayload>>;
  findByCriteriaEP?: (
    dto: FReqDto,
    sort: Record<string, string>[],
    urlParams: IUrlParams,
    ...otherParams: unknown[]
  ) => Promise<UniversalExternalResponse<FResDto[]>>;
}
