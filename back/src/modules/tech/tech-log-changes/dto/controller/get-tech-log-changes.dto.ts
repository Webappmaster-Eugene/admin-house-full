import { createZodDto } from 'nestjs-zod';
import { TechLogChangesGetCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type TechLogChangesGetUuidRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export type TechLogChangesGetIdRequestParamDto = EntityUrlParamCommand.RequestNumberParam;

export class TechLogChangesGetResponseDto extends createZodDto(TechLogChangesGetCommand.ResponseSchema) {}
