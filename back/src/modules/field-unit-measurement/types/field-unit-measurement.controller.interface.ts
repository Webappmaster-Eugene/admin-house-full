import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import {
  FieldUnitMeasurementCreateRequestDto,
  FieldUnitMeasurementCreateResponseDto,
} from '../dto/controller/create-field-unit-measurement.dto';
import {
  FieldUnitMeasurementUpdateRequestDto,
  FieldUnitMeasurementUpdateResponseDto,
} from '../dto/controller/update-field-unit-measurement.dto';
import { FieldUnitMeasurementGetResponseDto } from '../dto/controller/get-field-unit-measurement.dto';
import { FieldUnitMeasurementGetAllResponseDto } from '../dto/controller/get-all-field-unit-measurements.dto';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { FieldUnitMeasurementDeleteResponseDto } from '../dto/controller/delete-field-unit-measurement.dto';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';

export interface IFieldUnitMeasurementController
  extends IControllerCommon<
    FieldUnitMeasurementCreateRequestDto,
    FieldUnitMeasurementUpdateRequestDto,
    FieldUnitMeasurementGetResponseDto,
    FieldUnitMeasurementGetAllResponseDto,
    FieldUnitMeasurementCreateResponseDto,
    FieldUnitMeasurementUpdateResponseDto,
    FieldUnitMeasurementDeleteResponseDto
  > {
  getByIdEP: (
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<FieldUnitMeasurementGetResponseDto>;
  getAllEP: (urlParams: IUrlParams, queryParams?: IQueryParams) => Promise<FieldUnitMeasurementGetAllResponseDto>;
  createEP: (
    dto: FieldUnitMeasurementCreateRequestDto,
    urlParams: IUrlParams,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<FieldUnitMeasurementCreateResponseDto>;
  updateByIdEP: (
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldUnitMeasurementUpdateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<FieldUnitMeasurementUpdateResponseDto>;
  deleteByIdEP: (
    fieldUnitMeasurementId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<FieldUnitMeasurementDeleteResponseDto>;
}
