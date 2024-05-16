import { createZodDto } from 'nestjs-zod';
import { FieldTypeGetCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type FieldTypeGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldTypeGetResponseDto extends createZodDto(FieldTypeGetCommand.ResponseSchema) {}
