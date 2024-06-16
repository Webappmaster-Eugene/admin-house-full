"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechLogChangesSchema = void 0;
const zod_1 = require("zod");
exports.TechLogChangesSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string().nullable().optional(),
    entity: zod_1.z.string(),
    action: zod_1.z.enum(['CREATE', 'UPDATE', 'DELETE']),
    comment: zod_1.z.string().nullable().optional(),
    oldInfo: zod_1.z.string().nullable().optional(),
    // newInfo: z.json(),
    // newInfo: z.quotelessJson(),
    newInfo: zod_1.z.string(),
    updateInfo: zod_1.z.string().nullable().optional(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
