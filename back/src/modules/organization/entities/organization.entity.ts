import { Organization } from '.prisma/client';

export class OrganizationEntity implements Organization {
  uuid: string;
  name: string;
  workspaceUuid: string;
  organizationLeaderUuid: string;
  description: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(organization: Partial<Organization>) {
    Object.assign(this, organization);
    return this;
  }
}
