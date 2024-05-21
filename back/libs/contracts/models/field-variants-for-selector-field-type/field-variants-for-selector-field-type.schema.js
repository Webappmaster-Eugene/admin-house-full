"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldVariantsForSelectorFieldTypeSchema = void 0;
const zod_1 = require("zod");
exports.FieldVariantsForSelectorFieldTypeSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    value: zod_1.z.string(),
    description: zod_1.z.string().optional().nullable(),
    handbookUuid: zod_1.z.string(),
    fieldOfCategoryMaterialUuid: zod_1.z.string(),
    characteristicsMaterialUuid: zod_1.z.string().optional().nullable(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
