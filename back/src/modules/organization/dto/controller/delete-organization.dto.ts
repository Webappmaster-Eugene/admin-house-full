import { createZodDto } from 'nestjs-zod';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { OrganizationDeleteCommand } from '@numart/house-admin-contracts/commands/organization/delete.command';

export type OrganizationDeleteRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class OrganizationDeleteResponseDto extends createZodDto(OrganizationDeleteCommand.ResponseSchema) {}
