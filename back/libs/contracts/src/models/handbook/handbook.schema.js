"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandbookSchema = void 0;
const zod_1 = require("zod");
exports.HandbookSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    description: zod_1.z.string().nullable().optional(),
    canCustomerView: zod_1.z.boolean().nullable().optional(),
    workspaceUuid: zod_1.z.string().uuid().nullable().optional(),
    responsibleManagerUuid: zod_1.z.string().uuid(),
    lastChangeByUserUuid: zod_1.z.string().uuid().optional().nullable(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
