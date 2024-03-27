import { User } from '@prisma/client';

export class AuthEntity implements User {
  id: number;
  firstName: string;
  secondName: string;
  phone: string;
  email: string;
  password: string;
  address: string;
  info: string;
  documents: string;
  createdAt: Date;
  updatedAt: Date;
  roleId: number;
  memberOfWorkspaceId: number;
  memberOfOrganizationId: number;
  creatorOfWorkspaceId: number;

  constructor(auth: Partial<User>) {
    Object.assign(this, auth);
    return this;
  }
}
