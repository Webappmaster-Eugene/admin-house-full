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
    forgotPassword: `${ROOTS.AUTH}/forgot-password`,
    register_with_role_key: `${ROOTS.AUTH}/register/with-role-key`,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    categoryMaterials: `${ROOTS.DASHBOARD}/category-materials`,
    concreteCategoryMaterial: `${ROOTS.DASHBOARD}/category-materials/:categoryMaterialId`,
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
