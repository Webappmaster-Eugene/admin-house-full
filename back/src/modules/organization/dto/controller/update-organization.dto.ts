import { createZodDto } from 'nestjs-zod';
import { OrganizationUpdateCommand } from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export type OrganizationUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class OrganizationUpdateRequestDto extends createZodDto(OrganizationUpdateCommand.RequestSchema) {}

export class OrganizationUpdateResponseDto extends createZodDto(OrganizationUpdateCommand.ResponseSchema) {}
