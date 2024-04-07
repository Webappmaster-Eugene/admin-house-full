import { EUserTypeVariants, Organization } from '@prisma/client';

export class OrganizationEntity implements Organization {
  uuid: string;
  idOrganization: number;
  name: EUserTypeVariants;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(organization: Partial<Organization>) {
    Object.assign(this, organization);
    return this;
  }
}
