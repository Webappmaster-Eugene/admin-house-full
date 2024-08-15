import { EUserTypeVariants, Role } from '.prisma/client';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { ProjectEntity } from 'src/modules/project/entities/project.entity';
import { WorkspaceEntity } from 'src/modules/workspace/entities/workspace.entity';
import { RoleEntity } from 'src/modules/roles/entities/role.entity';

export interface AuthRelatedEntities {
  //role: Role;
}

export class AuthEntity implements AuthRelatedEntities {
  uuid: string;
  email: string;
  firstName: string;
  accessToken: string;
  refreshToken: string;
  //role: Role;

  constructor(auth: Partial<AuthEntity>) {
    Object.assign(this, auth);
    return this;
  }
}
