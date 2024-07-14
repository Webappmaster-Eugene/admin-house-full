import { createZodDto } from 'nestjs-zod';
import { FieldUnitMeasurementDeleteCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type FieldUnitMeasurementDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldUnitMeasurementDeleteResponseDto extends createZodDto(FieldUnitMeasurementDeleteCommand.ResponseSchema) {}
