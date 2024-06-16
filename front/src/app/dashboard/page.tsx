import OneView from 'src/sections/one/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Main Page',
};

export default async function DashboardPage() {
  // const user = await getCurrentUser();
  // if (!user) {
  //   redirect(PATH_AFTER_LOGIN);
  // }
  return <OneView />;
}
