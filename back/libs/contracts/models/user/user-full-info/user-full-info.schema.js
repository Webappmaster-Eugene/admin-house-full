"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFullInfoSchema = void 0;
const zod_1 = require("zod");
const role_1 = require("../../role");
const workspace_1 = require("../../workspace");
exports.UserFullInfoSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    firstName: zod_1.z.string(),
    secondName: zod_1.z.string().nullable().optional(),
    avatar: zod_1.z.string().nullable().optional(),
    phone: zod_1.z
        .string()
        .regex(/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, `Phone must be a valid phone number`)
        .optional(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, `Password must have:
Minimum 8 characters in length;
At least one uppercase English letter;
At least one lowercase English letter;
At least one digit;
At least one special character`),
    address: zod_1.z.string().nullable().optional(),
    info: zod_1.z.string().nullable().optional(),
    documents: zod_1.z.string().nullable().optional(),
    roleUuid: zod_1.z.string(),
    creatorOfWorkspaceUuid: zod_1.z.string().nullable().optional(),
    handbookManagerUuid: zod_1.z.string().nullable().optional(),
    memberOfWorkspaceUuid: zod_1.z.string().nullable().optional(),
    memberOfOrganizationUuid: zod_1.z.string().nullable().optional(),
    memberOfProjectUuid: zod_1.z.string().nullable().optional(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
    role: role_1.RoleSchema,
    creatorOfWorkspace: workspace_1.WorkspaceSchema,
    memberOfWorkspace: workspace_1.WorkspaceSchema,
});