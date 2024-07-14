import { createZodDto } from 'nestjs-zod';
import { TechLogChangesGetCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type TechLogChangesGetUuidRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export type TechLogChangesGetIdRequestParamDto = EntityUrlParamCommand.RequestNumberParam;

export class TechLogChangesGetResponseDto extends createZodDto(TechLogChangesGetCommand.ResponseSchema) {}
