import { User } from '@prisma/client';

export class UserEntity implements User {
  uuid: string;
  firstName: string;
  secondName: string;
  phone: string;
  email: string;
  password: string;
  address: string;
  info: string;
  roleUuid: string;
  avatar: string;
  documents: string;
  creatorOfWorkspaceUuid: string;
  memberOfWorkspaceUuid: string;
  memberOfOrganizationUuid: string;
  memberOfProjectUuid: string;
  handbookManagerUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
    return this;
  }
}
