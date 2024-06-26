export const enum GUARDS {
  AUTH_GUARD = 'Authorization guard - is user simply authorized',
  WORKSPACE_MEMBERS_GUARD = 'Is the user a member of the workspace or admin',
  WORKSPACE_CREATOR_GUARD = 'Is the user a Creator of the workspace in question or admin',
  WORKSPACE_AFFILATION_GUARD = 'Is the user the creator of the workspace the user is in, or is it the admin, or is it the user himself (but not other members of workspace). It is used, because in "user" route we have not got "workspaceId" in url params',
  REFRESH_KEY_GUARD = 'Refresh key guard - is refreshKey valid and not expired',
  IS_MANAGER_IN_BODY = 'Checking that the ID of the user who has the MANAGER role is passed to the body, and not some other id',
}
