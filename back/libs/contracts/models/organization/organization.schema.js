"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationSchema = void 0;
const zod_1 = require("zod");
exports.OrganizationSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    workspaceUuid: zod_1.z.string(),
    organizationLeaderUuid: zod_1.z.string(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});