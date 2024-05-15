import { createZodDto } from 'nestjs-zod';
import { FieldOfMaterialDeleteCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type FieldOfMaterialDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class FieldOfMaterialDeleteResponseDto extends createZodDto(FieldOfMaterialDeleteCommand.ResponseSchema) {}
