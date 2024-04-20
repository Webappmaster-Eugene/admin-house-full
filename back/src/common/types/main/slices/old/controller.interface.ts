import { Prisma } from '@prisma/client';
import { UniversalExternalResponse } from '../../../responses/universal-external-response.interface';
import { EntityUrlParamCommand } from '../../../../../../libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../../jwt.payload.interface';

export interface IControllerCommonOld<
  CReqDto,
  UReqDto,
  GResDto,
  GAResDto,
  CResDto,
  UResDto,
  DResDto,
  CReqParamDto = EntityUrlParamCommand.RequestUuidParam,
  FReqDto = void,
  FResDto = void,
  GReqIdParam = EntityUrlParamCommand.RequestUuidParam,
  GReqNumberParam = EntityUrlParamCommand.RequestNumberParam,
> {
  getByIdEP: (
    id: GReqIdParam | GReqNumberParam,
  ) => Promise<UniversalExternalResponse<GResDto | null>>;
  getAllEP: () => Promise<UniversalExternalResponse<GAResDto[] | null>>;
  createEP: (
    dto: CReqDto,
    idToIdentify?: GReqNumberParam | GReqIdParam | IJWTPayload,
    paramDto?: GReqIdParam | CReqParamDto,
  ) => Promise<UniversalExternalResponse<CResDto>>;
  updateByIdEP: (
    id: GReqIdParam,
    dto: UReqDto,
  ) => Promise<UniversalExternalResponse<UResDto>>;
  deleteByIdEP: (
    id: GReqIdParam,
  ) => Promise<UniversalExternalResponse<DResDto>>;
  deleteByIdsEP?: (
    ids: GReqIdParam[],
  ) => Promise<UniversalExternalResponse<Prisma.BatchPayload>>;
  findByCriteriaEP?: (
    dto: FReqDto,
    sort: Record<string, string>[],
  ) => Promise<UniversalExternalResponse<FResDto[]>>;
}
