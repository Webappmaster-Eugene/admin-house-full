import { Prisma } from '@prisma/client';
import { UniversalExternalResponse } from '../../responses/universal-external-response.interface';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export interface IControllerCommon<
  CReqDto,
  UReqDto,
  GResDto,
  GAResDto,
  CResDto,
  UResDto,
  FReqDto = void,
  FResDto = void,
  GReqParam = EntityUrlParamCommand.RequestParam,
  GReqParamNumber = EntityUrlParamCommand.RequestParamNumber,
> {
  getByIdEP: (
    id: GReqParam | GReqParamNumber,
  ) => Promise<UniversalExternalResponse<GResDto | null>>;
  getAllEP: () => Promise<UniversalExternalResponse<GAResDto[] | null>>;
  createEP: (dto: CReqDto) => Promise<UniversalExternalResponse<CResDto>>;
  updateByIdEP: (
    id: GReqParam,
    dto: UReqDto,
  ) => Promise<UniversalExternalResponse<UResDto>>;
  deleteByIdEP: (id: GReqParam) => Promise<UniversalExternalResponse<UResDto>>;
  deleteByIdsEP?: (
    ids: GReqParam[],
  ) => Promise<UniversalExternalResponse<Prisma.BatchPayload>>;
  findByCriteriaEP?: (
    dto: FReqDto,
    sort: Record<string, string>[],
  ) => Promise<UniversalExternalResponse<FResDto[]>>;
}
