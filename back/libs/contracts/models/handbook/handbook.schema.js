"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandbookSchema = void 0;
const zod_1 = require("zod");
exports.HandbookSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    canCustomerView: zod_1.z.boolean().nullable(),
    workspaceUuid: zod_1.z.string().nullable(),
    responsibleManagerUuid: zod_1.z.string(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
