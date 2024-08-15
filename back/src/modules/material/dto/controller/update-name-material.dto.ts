import { createZodDto } from 'nestjs-zod';
import { MaterialUpdateCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';
import { MaterialUpdateNameCommand } from 'libs/contracts/src/commands/material/update-name.command';

export type MaterialUpdateNameRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class MaterialUpdateNameRequestDto extends createZodDto(MaterialUpdateNameCommand.RequestSchema) {}

export class MaterialUpdateNameResponseDto extends createZodDto(MaterialUpdateNameCommand.ResponseSchema) {}
