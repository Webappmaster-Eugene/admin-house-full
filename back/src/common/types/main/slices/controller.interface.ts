import { Prisma } from '@prisma/client';
import { UniversalControllerResponse } from '../../responses/universal-controller-response.interface';
import { EntityGetCommand } from '../../../../../libs/contracts/commands/common/get-param.command';

export interface IControllerCommon<
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
  getByIdEP: (id: GReqParam) => UniversalControllerResponse<GResDto | null>;
  getAllEP: () => UniversalControllerResponse<GAResDto[] | null>;
  createEP: (dto: CReqDto) => UniversalControllerResponse<CResDto>;
  updateByIdEP: (
    id: GReqParam,
    dto: UReqDto,
  ) => UniversalControllerResponse<UResDto>;
  deleteByIdsEP: (
    ids: GReqParam[],
  ) => UniversalControllerResponse<Prisma.BatchPayload>;
  findByCriteriaEP?: (
    dto: FReqDto,
    sort: Record<string, string>[],
  ) => UniversalControllerResponse<FResDto[]>;
}
