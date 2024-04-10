import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { HandbookCreateRequestDto } from '../dto/controller/create-handbook.dto';
import { HandbookUpdateRequestDto } from '../dto/controller/update-handbook.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { HandbookEntity } from '../entities/handbook.entity';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';

export interface IHandbookService
  extends IServiceCommon<
    HandbookCreateRequestDto,
    HandbookUpdateRequestDto,
    HandbookEntity
  > {
  getById: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<HandbookEntity | null>>;
  getByManagerId: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<HandbookEntity | null>>;
  getAll: () => Promise<UniversalInternalResponse<HandbookEntity[] | null>>;
  create: (
    dto: HandbookCreateRequestDto,
    user: IJWTPayload,
  ) => Promise<UniversalInternalResponse<HandbookEntity>>;
  updateById: (
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: HandbookUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<HandbookEntity>>;
  deleteById: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<HandbookEntity>>;
}
