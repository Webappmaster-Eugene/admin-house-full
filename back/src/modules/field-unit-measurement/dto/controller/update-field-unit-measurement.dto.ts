import { createZodDto } from 'nestjs-zod';
import { FieldUnitMeasurementUpdateCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type FieldUnitMeasurementUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldUnitMeasurementUpdateRequestDto extends createZodDto(FieldUnitMeasurementUpdateCommand.RequestSchema) {}

export class FieldUnitMeasurementUpdateResponseDto extends createZodDto(FieldUnitMeasurementUpdateCommand.ResponseSchema) {}
