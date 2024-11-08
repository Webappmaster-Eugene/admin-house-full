import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import { HandbookCreateRequestDto, HandbookCreateResponseDto } from '../dto/controller/create-handbook.dto';
import { HandbookUpdateRequestDto, HandbookUpdateResponseDto } from '../dto/controller/update-handbook.dto';
import { HandbookGetResponseDto } from '../dto/controller/get-handbook.dto';
import { EntityUrlParamCommand } from 'libs/contracts';
import { HandbookDeleteResponseDto } from '../dto/controller/delete-handbook.dto';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';
import { HandbookGetAllResponseDto } from '../../../modules/handbook/dto/controller/get-all-handbooks.dto';

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
  getByIdEP: (handbookId: EntityUrlParamCommand.RequestUuidParam, urlParams: IUrlParams) => Promise<HandbookGetResponseDto>;
  getAllEP: (urlParams: IUrlParams, queryParams?: IQueryParams) => Promise<HandbookGetAllResponseDto>;
  createEP: (dto: HandbookCreateRequestDto, urlParams: IUrlParams, userInfoFromJWT: IJWTPayload) => Promise<HandbookCreateResponseDto>;
  updateByIdEP: (
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    dto: HandbookUpdateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<HandbookUpdateResponseDto>;
  deleteByIdEP: (handbookId: EntityUrlParamCommand.RequestUuidParam, urlParams: IUrlParams) => Promise<HandbookDeleteResponseDto>;
}
