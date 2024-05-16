"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldVariantsForSelectorFieldTypeSchema = void 0;
const zod_1 = require("zod");
exports.FieldVariantsForSelectorFieldTypeSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    description: zod_1.z.string().nullable().optional(),
    fieldTypeUuid: zod_1.z.string().uuid(),
    handbookUuid: zod_1.z.string().uuid(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
