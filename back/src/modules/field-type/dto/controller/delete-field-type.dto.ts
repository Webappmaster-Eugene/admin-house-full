import { createZodDto } from 'nestjs-zod';
import { FieldTypeDeleteCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type FieldTypeDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldTypeDeleteResponseDto extends createZodDto(FieldTypeDeleteCommand.ResponseSchema) {}
