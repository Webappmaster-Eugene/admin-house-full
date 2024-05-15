import { createZodDto } from 'nestjs-zod';
import { FieldOfMaterialGetCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type FieldOfMaterialGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldOfMaterialGetResponseDto extends createZodDto(FieldOfMaterialGetCommand.ResponseSchema) {}
