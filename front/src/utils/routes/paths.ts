// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
};

// ----------------------------------------------------------------------

export const paths = {
  // LEGAL
  terms: '/terms',
  privacy: '/privacy',
  offer: '/offer',
  cookies: '/cookies',
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
    estimates: `${ROOTS.DASHBOARD}/estimates`,
    concreteEstimate: `${ROOTS.DASHBOARD}/estimates/:estimateId`,
    unitTemplates: `${ROOTS.DASHBOARD}/unit-templates`,
    concreteUnitTemplate: `${ROOTS.DASHBOARD}/unit-templates/:templateId`,
    constructionPies: `${ROOTS.DASHBOARD}/construction-pies`,
    concreteConstructionPie: `${ROOTS.DASHBOARD}/construction-pies/:pieId`,
  },
  profile: {
    profile: `${ROOTS.PROFILE}`,
    admin: `${ROOTS.PROFILE}/admin`,
    settings: `${ROOTS.PROFILE}/settings`,
  },
};
