import { ForgotPasswordState } from 'src/widgets/auth/forgot-password-stages/forgot-password.state';

export type CodeEnteringViewProps = {
  forgotState: ForgotPasswordState;
  setForgotState: (setForgotState: ForgotPasswordState) => void;
};
