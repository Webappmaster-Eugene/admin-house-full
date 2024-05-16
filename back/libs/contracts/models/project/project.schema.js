"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectSchema = void 0;
const zod_1 = require("zod");
exports.ProjectSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    customerMail: zod_1.z.string().email(),
    description: zod_1.z.string().nullable(),
    organizationUuid: zod_1.z.string(),
    customerUuid: zod_1.z.string(),
    responsibleManagerUuid: zod_1.z.string(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
