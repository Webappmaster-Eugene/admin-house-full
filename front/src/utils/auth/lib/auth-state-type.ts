import { UserGetFullInfoCommand } from '@numart/house-admin-contracts';

export type AuthStateType = {
  loading: boolean;
  user: UserGetFullInfoCommand.ResponseEntity | null;
};
