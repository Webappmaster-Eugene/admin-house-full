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
