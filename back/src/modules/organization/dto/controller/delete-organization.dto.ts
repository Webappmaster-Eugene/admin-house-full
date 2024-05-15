import { createZodDto } from 'nestjs-zod';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';
import { OrganizationDeleteCommand } from '../../../../../libs/contracts/commands/organization/delete.command';

export type OrganizationDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class OrganizationDeleteResponseDto extends createZodDto(OrganizationDeleteCommand.ResponseSchema) {}
