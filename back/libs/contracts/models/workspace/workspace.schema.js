"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceSchema = void 0;
const zod_1 = require("zod");
exports.WorkspaceSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string().optional().default('Workspace'),
    description: zod_1.z.string().nullable().optional().default('A working space to manage work'),
    workspaceCreatorUuid: zod_1.z.string(),
    handbookOfWorkspaceUuid: zod_1.z.string().nullable(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
