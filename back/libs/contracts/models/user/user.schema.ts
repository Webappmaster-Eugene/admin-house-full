import { z } from 'zod';
import { UserRole } from '../../enums';
export const UserSchema = z.object({
    uuid: z.number(),
    email: z.string().email(),
    name: z.string(),
    role: UserRole,
    passwordHash: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
