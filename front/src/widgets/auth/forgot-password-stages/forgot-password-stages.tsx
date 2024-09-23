'use client';

import { useState } from 'react';

import { ForgotState } from 'src/utils/const/forgot-password.enum';

import { ForgotPasswordState } from 'src/widgets/auth/forgot-password-stages/forgot-password.state';
import CheckEmailView from 'src/widgets/auth/forgot-password-stages/check-email-view/check-email-view';
import ForgotPasswordView from 'src/widgets/auth/forgot-password-stages/forgot-password-view/forgot-password-view';

export default function ForgotPasswordStages() {
  const [forgotState, setForgotState] = useState<ForgotPasswordState>({
    state: ForgotState.CodeSenting,
    email: '',
  });
  return forgotState.state === ForgotState.CodeSenting ? (
    <ForgotPasswordView setForgotState={setForgotState} forgotState={forgotState} />
  ) : (
    <CheckEmailView setForgotState={setForgotState} forgotState={forgotState} />
  );
}
