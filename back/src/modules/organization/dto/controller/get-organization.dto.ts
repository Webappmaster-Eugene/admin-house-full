import { createZodDto } from 'nestjs-zod';
import { OrganizationGetCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type OrganizationGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class OrganizationGetResponseDto extends createZodDto(OrganizationGetCommand.ResponseSchema) {}
