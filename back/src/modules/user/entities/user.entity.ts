import { User } from '@prisma/client';

export class UserEntity {
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

  constructor(user: Partial<User>) {
    Object.assign(this, user);
    return this;
  }
}
