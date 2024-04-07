import { createZodDto } from 'nestjs-zod';
import { OrganizationUpdateCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type OrganizationUpdateRequestParamDto =
  EntityUrlParamCommand.RequestParam;

export class OrganizationUpdateRequestDto extends createZodDto(
  OrganizationUpdateCommand.RequestSchema,
) {}

export class OrganizationUpdateResponseDto extends createZodDto(
  OrganizationUpdateCommand.ResponseSchema,
) {
  constructor(organization: Partial<OrganizationUpdateResponseDto>) {
    super();
    Object.assign(this, organization);
    return this;
  }
}
