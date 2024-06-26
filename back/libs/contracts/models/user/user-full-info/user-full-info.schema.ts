import { z } from 'zod';
import { RoleSchema } from '../../role';
import { WorkspaceSchema } from '../../workspace';
import { OrganizationSchema } from '../../organization';
import { ProjectSchema } from '../../project';
import { HandbookSchema } from '../../handbook';

export const UserFullInfoSchema = z.object({
  uuid: z.string().uuid(),
  firstName: z.string(),
  secondName: z.string().nullable().optional(),
  avatar: z.string().nullable().optional(),
  phone: z
    .string()
    .regex(/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, `Phone must be a valid phone number`)
    .nullable()
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
  roleUuid: z.string().uuid(),
  creatorOfWorkspaceUuid: z.string().uuid().nullable().optional(),
  handbookManagerUuid: z.string().uuid().nullable().optional(),
  memberOfWorkspaceUuid: z.string().uuid().nullable().optional(),
  memberOfOrganizationUuid: z.string().uuid().nullable().optional(),
  memberOfProjectUuid: z.string().uuid().nullable().optional(),
  lastChangeByUserUuid: z.string().uuid().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  roleName: z.string(),
  role: RoleSchema,
  creatorOfWorkspace: WorkspaceSchema.nullable().optional(),
  memberOfWorkspace: WorkspaceSchema.nullable().optional(),
  memberOfOrganization: OrganizationSchema.nullable().optional(),
  leaderOfOrganizations: z.array(OrganizationSchema.nullable().optional()),
  memberOfProject: ProjectSchema.nullable().optional(),
  responsibleManagerOfProjects: z.array(ProjectSchema.nullable().optional()),
  handbookManager: HandbookSchema.nullable().optional(),
});
