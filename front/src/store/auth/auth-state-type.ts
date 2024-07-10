import { UserGetFullInfoCommand } from '@numart/house-admin-contracts';

export type CurrentUserInfo = UserGetFullInfoCommand.ResponseEntity | null;

export interface IAuthState {
  user: CurrentUserInfo;
  loading: boolean;
  toggleLoading: () => void;
  setCurrentUser: (newDataUser: UserGetFullInfoCommand.ResponseEntity | null) => void;
  reset: () => void;
}
