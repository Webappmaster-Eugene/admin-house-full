import { createZodDto } from 'nestjs-zod';
import { FieldOfMaterialDeleteCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type FieldOfMaterialDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldOfMaterialDeleteResponseDto extends createZodDto(FieldOfMaterialDeleteCommand.ResponseSchema) {}
