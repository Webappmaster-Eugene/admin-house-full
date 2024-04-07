import { createZodDto } from 'nestjs-zod';
import { OrganizationDeleteCommand } from '../../../../../libs/contracts';
import { EntityUrlParamCommand } from '../../../../../libs/contracts/commands/common/entity-url-param.command';

export type OrganizationDeleteRequestParamDto =
  EntityUrlParamCommand.RequestParam;

export class OrganizationDeleteResponseDto extends createZodDto(
  OrganizationDeleteCommand.ResponseSchema,
) {
  constructor(organization: Partial<OrganizationDeleteResponseDto>) {
    super();
    Object.assign(this, organization);
    return this;
  }
}
