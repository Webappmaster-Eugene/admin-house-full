"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusResourceSchema = void 0;
const zod_1 = require("zod");
exports.StatusResourceSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    comment: zod_1.z.string().nullable().optional(),
    lastChangeByUserUuid: zod_1.z.string().uuid().optional().nullable(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
