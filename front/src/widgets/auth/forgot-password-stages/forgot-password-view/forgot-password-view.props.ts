import { ForgotPasswordState } from 'src/widgets/auth/forgot-password-stages/forgot-password.state';

export type ForgotPasswordViewProps = {
  forgotState: ForgotPasswordState;
  setForgotState: (setForgotState: ForgotPasswordState) => void;
};
