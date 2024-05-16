import { createZodDto } from 'nestjs-zod';
import { FieldUnitMeasurementUpdateCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type FieldUnitMeasurementUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldUnitMeasurementUpdateRequestDto extends createZodDto(FieldUnitMeasurementUpdateCommand.RequestSchema) {}

export class FieldUnitMeasurementUpdateResponseDto extends createZodDto(FieldUnitMeasurementUpdateCommand.ResponseSchema) {}
