"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../../enums");
exports.OrganizationSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    organizationStatus: enums_1.EActiveStatusVariants.nullish().default('ACTIVE'),
    description: zod_1.z.string().nullable().optional(),
    workspaceUuid: zod_1.z.string().uuid(),
    organizationLeaderUuid: zod_1.z.string().uuid(),
    lastChangeByUserUuid: zod_1.z.string().uuid().optional().nullable(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
