import { ForgotPasswordState } from 'src/widgets/auth/forgot-password-stages/forgot-password.state';

export type CheckEmailViewProps = {
  forgotState: ForgotPasswordState;
  setForgotState: (setForgotState: ForgotPasswordState) => void;
};
