import { createZodDto } from 'nestjs-zod';
import { FieldUnitMeasurementGetCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type FieldUnitMeasurementGetRequestParamDto =
  EntityUrlParamCommand.RequestUuidParam;

export class FieldUnitMeasurementGetResponseDto extends createZodDto(
  FieldUnitMeasurementGetCommand.ResponseSchema,
) {}
