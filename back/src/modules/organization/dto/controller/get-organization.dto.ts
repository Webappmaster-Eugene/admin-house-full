import { createZodDto } from 'nestjs-zod';
import { OrganizationGetCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type OrganizationGetRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class OrganizationGetResponseDto extends createZodDto(OrganizationGetCommand.ResponseSchema) {}
