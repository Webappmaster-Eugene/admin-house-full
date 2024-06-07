"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialSchema = void 0;
const zod_1 = require("zod");
exports.FieldOfCategoryMaterialSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    uniqueNameForTemplate: zod_1.z.string().nullable().optional(),
    comment: zod_1.z.string().nullable().optional(),
    isRequired: zod_1.z.boolean().default(true),
    defaultValue: zod_1.z.string().nullable().optional(),
    categoryMaterialUuid: zod_1.z.string().uuid(),
    handbookUuid: zod_1.z.string().uuid(),
    unitOfMeasurementUuid: zod_1.z.string().uuid(),
    fieldTypeUuid: zod_1.z.string().uuid(),
    lastChangeByUserUuid: zod_1.z.string().uuid().optional().nullable(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
