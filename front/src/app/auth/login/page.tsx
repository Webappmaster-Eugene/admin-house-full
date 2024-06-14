import LoginView from 'src/sections/auth/login-view';

export const metadata = {
  title: 'Jwt: Login',
};

export default async function LoginPage() {
  return <LoginView />;
  // return <LoginForm />;
}
