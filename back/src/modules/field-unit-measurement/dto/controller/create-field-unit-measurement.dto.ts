import { createZodDto } from 'nestjs-zod';
import { FieldUnitMeasurementCreateCommand } from '@numart/house-admin-contracts';

export class FieldUnitMeasurementCreateRequestDto extends createZodDto(FieldUnitMeasurementCreateCommand.RequestSchema) {}

export class FieldUnitMeasurementCreateResponseDto extends createZodDto(FieldUnitMeasurementCreateCommand.ResponseSchema) {}
