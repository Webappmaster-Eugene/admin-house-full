import { createZodDto } from 'nestjs-zod';
import { TechLogChangesGetCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';

export type TechLogChangesGetUuidRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export type TechLogChangesGetIdRequestParamDto = EntityUrlParamCommand.RequestNumberParam;

export class TechLogChangesGetResponseDto extends createZodDto(TechLogChangesGetCommand.ResponseSchema) {}
