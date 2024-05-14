export interface IAuthRepository {
  generateStrictAdminKey: (oldKey: string, newKey: string) => Promise<{ key: string }>;
  getStrictAdminKey: () => Promise<{ key: string }>;
}
