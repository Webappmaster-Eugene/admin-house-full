import { PasswordResetCode } from '.prisma/client';

export interface IAuthRepository {
  generateStrictAdminKey: (oldKey: string, newKey: string) => Promise<{ key: string }>;
  getStrictAdminKey: () => Promise<{ key: string }>;
  createPasswordResetCode: (email: string, code: string, expiresAt: Date) => Promise<PasswordResetCode>;
  findValidResetCode: (email: string, code: string) => Promise<PasswordResetCode | null>;
  markResetCodeAsUsed: (uuid: string) => Promise<void>;
  deleteExpiredResetCodes: (email: string) => Promise<void>;
  updateUserPassword: (userUuid: string, hashedPassword: string) => Promise<void>;
  findUserByEmail: (email: string) => Promise<{ uuid: string; email: string; password: string } | null>;
}
