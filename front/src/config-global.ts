import { paths } from 'src/routes/paths';

// API
export const HOST_API = process.env.NEXT_PUBLIC_HOST_API;
export const ASSETS_API = process.env.NEXT_PUBLIC_ASSETS_API;

export const { DEFAULT_EMAIL } = process.env;
export const { DEFAULT_PASSWORD } = process.env;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root; // as '/dashboard'