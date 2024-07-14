import { UserGetFullInfoCommand } from '@/../../back/libs/contracts';

export type CurrentUserInfo = UserGetFullInfoCommand.ResponseEntity | null;

export interface IAuthState {
  user: CurrentUserInfo;
  loading: boolean;
  toggleLoading: () => void;
  setCurrentUser: (newDataUser: UserGetFullInfoCommand.ResponseEntity | null) => void;
  reset: () => void;
}
