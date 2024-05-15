import { createZodDto } from 'nestjs-zod';
import { MaterialUpdateCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type MaterialUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class MaterialUpdateRequestDto extends createZodDto(MaterialUpdateCommand.RequestSchema) {}

export class MaterialUpdateResponseDto extends createZodDto(MaterialUpdateCommand.ResponseSchema) {}
