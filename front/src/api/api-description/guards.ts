export const enum GUARDS {
  AUTH_GUARD = 'Authorization guard - is the user a logined user. Redirect to login page',
  GUEST_GUARD = 'Is the user a unlogined user. Redirect to dashboard page',
  ROLE_GUARD = 'Have the user a role in array of need roles',
}
