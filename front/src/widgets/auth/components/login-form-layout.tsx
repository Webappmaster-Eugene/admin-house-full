import Alert from '@mui/material/Alert';

import { LoginForm } from 'src/features/login-form';

export function LoginFormLayout() {
  return (
    <>
      <Alert severity="info" sx={{ mb: 3 }}>
        <p>Для входа в систему по умолчанию:</p>
        <p>
          Логин: <strong>admin@mail.ru</strong>
        </p>
        <p>
          Пароль: <strong>!qwertY32</strong>
        </p>
      </Alert>

      <LoginForm />
    </>
  );
}
