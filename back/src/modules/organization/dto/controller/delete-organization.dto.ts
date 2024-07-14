import { createZodDto } from 'nestjs-zod';
import { EntityUrlParamCommand } from 'libs/contracts';
import { OrganizationDeleteCommand } from 'libs/contracts';

export type OrganizationDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class OrganizationDeleteResponseDto extends createZodDto(OrganizationDeleteCommand.ResponseSchema) {}
