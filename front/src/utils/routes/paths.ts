// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
};

// ----------------------------------------------------------------------

export const paths = {
  // AUTH
  auth: {
    login: `${ROOTS.AUTH}/login`,
    register: `${ROOTS.AUTH}/register`,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    materials: `${ROOTS.DASHBOARD}/materials`,
    fields: `${ROOTS.DASHBOARD}/fields`,
    characteristics: `${ROOTS.DASHBOARD}/characteristics`,
  },
  profile: {
    profile: `${ROOTS.PROFILE}`,
    admin: `${ROOTS.PROFILE}/admin`,
    settings: `${ROOTS.PROFILE}/settings`,
  },
};
