import { createZodDto } from 'nestjs-zod';
import { TypeFieldDeleteCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type TypeFieldDeleteRequestParamDto =
  EntityUrlParamCommand.RequestUuidParam;

export class TypeFieldDeleteResponseDto extends createZodDto(
  TypeFieldDeleteCommand.ResponseSchema,
) {}
