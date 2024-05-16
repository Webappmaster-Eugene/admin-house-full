import { createZodDto } from 'nestjs-zod';
import { FieldUnitMeasurementDeleteCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type FieldUnitMeasurementDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldUnitMeasurementDeleteResponseDto extends createZodDto(FieldUnitMeasurementDeleteCommand.ResponseSchema) {}
