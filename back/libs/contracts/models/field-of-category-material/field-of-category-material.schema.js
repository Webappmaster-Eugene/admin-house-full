"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialSchema = void 0;
const zod_1 = require("zod");
exports.FieldOfCategoryMaterialSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    unique_name_for_template: zod_1.z.string().nullable().optional(),
    comment: zod_1.z.string().nullable().optional(),
    isRequired: zod_1.z.boolean().default(true),
    defaultValue: zod_1.z.string().nullable(),
    categoryMaterialUuid: zod_1.z.string(),
    createdByUuid: zod_1.z.string(),
    handbookUuid: zod_1.z.string(),
    unitOfMeasurementUuid: zod_1.z.string(),
    fieldTypeUuid: zod_1.z.string(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
