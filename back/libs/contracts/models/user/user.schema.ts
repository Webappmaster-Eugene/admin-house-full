import { z } from 'zod';

export const UserSchema = z.object({
  uuid: z.string().uuid(),
  firstName: z.string(),
  secondName: z.string().nullable().optional(),
  avatar: z.string().nullable().optional(),
  phone: z
    .string()
    .regex(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      `Phone must be a valid phone number`,
    )
    .optional(),
  email: z.string().email(),
  password: z.string().regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    `Password must have:
Minimum 8 characters in length;
At least one uppercase English letter;
At least one lowercase English letter;
At least one digit;
At least one special character`,
  ),
  address: z.string().nullable().optional(),
  info: z.string().nullable().optional(),
  documents: z.string().nullable().optional(),
  roleUuid: z.string(),
  creatorOfWorkspaceUuid: z.string().nullable().optional(),
  handbookManagerUuid: z.string().nullable().optional(),
  memberOfWorkspaceUuid: z.string().nullable().optional(),
  memberOfOrganizationUuid: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
