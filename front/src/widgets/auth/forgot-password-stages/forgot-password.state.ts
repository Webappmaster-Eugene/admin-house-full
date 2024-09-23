import { ForgotState } from 'src/utils/const/forgot-password.enum';

export type ForgotPasswordState = {
  state: ForgotState;
  email: string;
};
