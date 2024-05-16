import { createZodDto } from 'nestjs-zod';
import { FieldUnitMeasurementGetCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type FieldUnitMeasurementGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldUnitMeasurementGetResponseDto extends createZodDto(FieldUnitMeasurementGetCommand.ResponseSchema) {}
