import { createZodDto } from 'nestjs-zod';
import { FieldTypeUpdateCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type FieldTypeUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldTypeUpdateRequestDto extends createZodDto(FieldTypeUpdateCommand.RequestSchema) {}

export class FieldTypeUpdateResponseDto extends createZodDto(FieldTypeUpdateCommand.ResponseSchema) {}
