import { createZodDto } from 'nestjs-zod';
import { FieldTypeDeleteCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type FieldTypeDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldTypeDeleteResponseDto extends createZodDto(FieldTypeDeleteCommand.ResponseSchema) {}
