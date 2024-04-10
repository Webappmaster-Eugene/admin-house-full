import { z } from 'zod';

export const UserSchema = z.object({
  uuid: z.string().uuid(),
  firstName: z.string(),
  secondName: z.string().optional(),
  avatar: z.string().optional(),
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
  address: z.string().optional(),
  info: z.string().optional(),
  documents: z.string().optional(),
  roleUuid: z.string().uuid().optional(),
  creatorOfWorkspaceUuid: z.string().uuid().nullable().optional(),
  memberOfWorkspaceUuid: z.string().uuid().nullable().optional(),
  memberOfOrganizationUuid: z.string().uuid().nullable().optional(),
  workspaceData: z.object({ uuid: z.string().uuid().optional() }).optional(),
  //      uuid: z.string().uuid(),
  //     name: z.string(),
  //     description: z.string().nullable(),
  //      workspaceCreatorUuid: z.string(),
  //       handbookOfWorkspaceUuid: z.string().nullable(),
  //       createdAt: z.coerce.date(),
  //       updatedAt: z.coerce.date(),
  //     }),
  //  ),
  //(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
