import { createZodDto } from 'nestjs-zod';
import { OrganizationCreateCommand } from '../../../../../libs/contracts';

export class OrganizationCreateRequestDto extends createZodDto(
  OrganizationCreateCommand.RequestSchema,
) {}

export class OrganizationCreateResponseDto extends createZodDto(
  OrganizationCreateCommand.ResponseSchema,
) {
  constructor(organization: Partial<OrganizationCreateResponseDto>) {
    super();
    Object.assign(this, organization);
    return this;
  }
}