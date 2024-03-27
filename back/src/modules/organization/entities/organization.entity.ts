import { Organization } from '@prisma/client';

export class OrganizationEntity implements Organization {
  id: number;
  name: string;
  description: string;
  workspaceId: number;
  organizationLeaderId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(organization: Partial<Organization>) {
    Object.assign(this, organization);
    return this;
  }
}
