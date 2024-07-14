import { createZodDto } from 'nestjs-zod';
import { FieldUnitMeasurementGetCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type FieldUnitMeasurementGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldUnitMeasurementGetResponseDto extends createZodDto(FieldUnitMeasurementGetCommand.ResponseSchema) {}
