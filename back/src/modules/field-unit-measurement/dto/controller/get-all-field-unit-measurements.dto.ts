import { createZodDto } from 'nestjs-zod';
import { FieldUnitMeasurementGetAllCommand } from '@numart/house-admin-contracts';

export class FieldUnitMeasurementGetAllResponseDto extends createZodDto(FieldUnitMeasurementGetAllCommand.ResponseSchema) {}
