import { createZodDto } from 'nestjs-zod';
import { OrganizationGetAllCommand } from '../../../../../libs/contracts';

export class OrganizationGetAllResponseDto extends createZodDto(
  OrganizationGetAllCommand.ResponseSchema,
) {
  constructor(organization: Partial<OrganizationGetAllResponseDto>) {
    super();
    Object.assign(this, organization);
    return this;
  }
}
