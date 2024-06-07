"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../../enums");
exports.RoleSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    idRole: zod_1.z.number().int().optional(),
    name: enums_1.EUserVariants,
    description: zod_1.z.string().nullable().optional(),
    lastChangeByUserUuid: zod_1.z.string().uuid().optional().nullable(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
