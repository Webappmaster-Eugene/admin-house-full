"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../../enums");
exports.WorkspaceSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string().optional().default('Workspace'),
    workspaceStatus: enums_1.EActiveStatusVariants,
    description: zod_1.z.string().nullable().optional().default('A working space to manage work'),
    workspaceCreatorUuid: zod_1.z.string().uuid(),
    handbookOfWorkspaceUuid: zod_1.z.string().uuid().nullable().optional(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
