import { createZodDto } from 'nestjs-zod';
import { OrganizationGetCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';

export type OrganizationGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class OrganizationGetResponseDto extends createZodDto(OrganizationGetCommand.ResponseSchema) {}
