"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../../enums");
exports.ProjectSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    projectStatus: enums_1.EActiveStatusVariants.nullish().default('ACTIVE'),
    description: zod_1.z.string().nullable().optional(),
    customerMail: zod_1.z.string().email().optional().nullable(),
    organizationUuid: zod_1.z.string().uuid(),
    customerUuid: zod_1.z.string().uuid().optional().nullable(),
    responsibleManagerUuid: zod_1.z.string().uuid(),
    lastChangeByUserUuid: zod_1.z.string().uuid().optional().nullable(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
