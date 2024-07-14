import { createZodDto } from 'nestjs-zod';
import { OrganizationUpdateCommand } from 'libs/contracts';
import { EntityUrlParamCommand } from 'libs/contracts';

export type OrganizationUpdateRequestParamDto = EntityUrlParamCommand.RequestUuidParam;

export class OrganizationUpdateRequestDto extends createZodDto(OrganizationUpdateCommand.RequestSchema) {}

export class OrganizationUpdateResponseDto extends createZodDto(OrganizationUpdateCommand.ResponseSchema) {}
