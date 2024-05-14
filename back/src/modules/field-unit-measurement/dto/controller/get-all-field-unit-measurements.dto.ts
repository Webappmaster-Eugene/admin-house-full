import { createZodDto } from 'nestjs-zod';
import { FieldUnitMeasurementGetAllCommand } from '../../../../../libs/contracts';

export class FieldUnitMeasurementGetAllResponseDto extends createZodDto(
  FieldUnitMeasurementGetAllCommand.ResponseSchema,
) {}
