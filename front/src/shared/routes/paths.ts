const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

const SUBROOTS_AUTH = {
  LOGIN: 'login',
  REGISTER: 'register',
};

const SUBROOTS_DASHBOARD = {
  ONE: 'one',
  TWO: 'two',
  THREE: 'three',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/${SUBROOTS_AUTH.LOGIN}`,
      register: `${ROOTS.AUTH}/${SUBROOTS_AUTH.REGISTER}`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    one: `${ROOTS.DASHBOARD}/${SUBROOTS_DASHBOARD.ONE}`,
    two: `${ROOTS.DASHBOARD}/${SUBROOTS_DASHBOARD.TWO}`,
    three: `${ROOTS.DASHBOARD}/${SUBROOTS_DASHBOARD.THREE}`,
    group: {
      root: `${ROOTS.DASHBOARD}/group`,
      five: `${ROOTS.DASHBOARD}/group/five`,
      six: `${ROOTS.DASHBOARD}/group/six`,
    },
  },
};
