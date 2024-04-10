import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import {
  HandbookCreateRequestDto,
  HandbookCreateResponseDto,
} from '../dto/controller/create-handbook.dto';
import {
  HandbookUpdateRequestDto,
  HandbookUpdateResponseDto,
} from '../dto/controller/update-handbook.dto';
import { HandbookGetResponseDto } from '../dto/controller/get-handbook.dto';
import { HandbookGetAllResponseDto } from '../dto/controller/get-all-handbooks.dto';
import { UniversalExternalResponse } from '../../../common/types/responses/universal-external-response.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { HandbookDeleteResponseDto } from '../dto/controller/delete-handbook.dto';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';

export interface IHandbookController
  extends IControllerCommon<
    HandbookCreateRequestDto,
    HandbookUpdateRequestDto,
    HandbookGetResponseDto,
    HandbookGetAllResponseDto,
    HandbookCreateResponseDto,
    HandbookUpdateResponseDto,
    HandbookDeleteResponseDto
  > {
  getByIdEP: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalExternalResponse<HandbookGetResponseDto | null>>;
  getAllEP: () => Promise<
    UniversalExternalResponse<HandbookGetAllResponseDto[] | null>
  >;
  createEP: (
    dto: HandbookCreateRequestDto,
    user: IJWTPayload,
  ) => Promise<UniversalExternalResponse<HandbookCreateResponseDto>>;
  updateByIdEP: (
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: HandbookUpdateRequestDto,
  ) => Promise<UniversalExternalResponse<HandbookUpdateResponseDto>>;
  deleteByIdEP: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalExternalResponse<HandbookDeleteResponseDto>>;
}
