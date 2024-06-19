import { UserGetFullInfoCommand } from '@numart/house-admin-contracts';

type CurrentUserInfo = UserGetFullInfoCommand.ResponseEntity | null;

export interface IAuthState {
  user: CurrentUserInfo | null;
  loading: boolean;
  toggleLoading: () => void;
  setCurrentUser: (newDataUser: UserGetFullInfoCommand.ResponseEntity | null) => void;
  reset: () => void;
}
