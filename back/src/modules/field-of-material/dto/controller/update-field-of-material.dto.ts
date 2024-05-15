import { createZodDto } from 'nestjs-zod';
import { FieldOfMaterialUpdateCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type FieldOfMaterialUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldOfMaterialUpdateRequestDto extends createZodDto(FieldOfMaterialUpdateCommand.RequestSchema) {}

export class FieldOfMaterialUpdateResponseDto extends createZodDto(FieldOfMaterialUpdateCommand.ResponseSchema) {}
