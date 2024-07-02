import ProfileView from '@/widgets/profile/profile-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Profile',
};

export default async function Page() {
  return <ProfileView />;
}
