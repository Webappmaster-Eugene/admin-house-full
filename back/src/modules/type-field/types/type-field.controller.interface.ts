import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import {
  TypeFieldCreateRequestDto,
  TypeFieldCreateResponseDto,
} from '../dto/controller/create-type-field.dto';
import {
  TypeFieldUpdateRequestDto,
  TypeFieldUpdateResponseDto,
} from '../dto/controller/update-type-field.dto';
import { TypeFieldGetResponseDto } from '../dto/controller/get-type-field.dto';
import { TypeFieldGetAllResponseDto } from '../dto/controller/get-all-type-fields.dto';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { TypeFieldDeleteResponseDto } from '../dto/controller/delete-type-field.dto';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';

export interface ITypeFieldController
  extends IControllerCommon<
    TypeFieldCreateRequestDto,
    TypeFieldUpdateRequestDto,
    TypeFieldGetResponseDto,
    TypeFieldGetAllResponseDto,
    TypeFieldCreateResponseDto,
    TypeFieldUpdateResponseDto,
    TypeFieldDeleteResponseDto
  > {
  getByIdEP: (
    typeFieldId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<TypeFieldGetResponseDto>;
  getAllEP: (urlParams: IUrlParams) => Promise<TypeFieldGetAllResponseDto>;
  createEP: (
    dto: TypeFieldCreateRequestDto,
    urlParams: IUrlParams,
    userInfoFromJWT: IJWTPayload,
  ) => Promise<TypeFieldCreateResponseDto>;
  updateByIdEP: (
    typeFieldId: EntityUrlParamCommand.RequestUuidParam,
    dto: TypeFieldUpdateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<TypeFieldUpdateResponseDto>;
  deleteByIdEP: (
    typeFieldId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<TypeFieldDeleteResponseDto>;
}
