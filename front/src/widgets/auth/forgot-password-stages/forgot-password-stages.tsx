'use client';

import { useState } from 'react';

import { ForgotState } from 'src/utils/const/forgot-password.enum';

import { ForgotPasswordState } from 'src/widgets/auth/forgot-password-stages/forgot-password.state';
import CheckEmailView from 'src/widgets/auth/forgot-password-stages/check-email-view/check-email-view';
import CodeEnteringView from 'src/widgets/auth/forgot-password-stages/code-entering-view/code-entering-view';
import ForgotPasswordView from 'src/widgets/auth/forgot-password-stages/forgot-password-view/forgot-password-view';

export default function ForgotPasswordStages() {
  const [forgotState, setForgotState] = useState<ForgotPasswordState>({
    state: ForgotState.CodeSending,
    email: '',
  });

  if (forgotState.state === ForgotState.CodeSending) {
    return <ForgotPasswordView setForgotState={setForgotState} forgotState={forgotState} />;
  }

  if (forgotState.state === ForgotState.CodeEntering) {
    return <CodeEnteringView setForgotState={setForgotState} forgotState={forgotState} />;
  }

  return <CheckEmailView setForgotState={setForgotState} forgotState={forgotState} />;
}
