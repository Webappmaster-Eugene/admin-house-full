import { createZodDto } from 'nestjs-zod';
import { FieldOfMaterialGetCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type FieldOfMaterialGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldOfMaterialGetResponseDto extends createZodDto(FieldOfMaterialGetCommand.ResponseSchema) {}
