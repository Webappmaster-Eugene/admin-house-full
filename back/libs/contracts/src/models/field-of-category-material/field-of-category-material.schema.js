"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../../enums");
exports.FieldOfCategoryMaterialSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    fieldOfCategoryMaterialStatus: enums_1.EActiveStatusVariants,
    numInOrder: zod_1.z.number().nullable().optional(),
    uniqueNameForTemplate: zod_1.z.string().nullable().optional(),
    comment: zod_1.z.string().nullable().optional(),
    isRequired: zod_1.z.boolean().default(true),
    defaultValue: zod_1.z.string().nullable().optional(),
    handbookUuid: zod_1.z.string().uuid(),
    unitOfMeasurementUuid: zod_1.z.string().uuid(),
    fieldTypeUuid: zod_1.z.string().uuid(),
    lastChangeByUserUuid: zod_1.z.string().uuid().nullable().optional(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
