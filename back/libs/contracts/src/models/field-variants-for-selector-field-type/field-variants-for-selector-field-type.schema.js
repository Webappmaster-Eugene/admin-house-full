"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldVariantsForSelectorFieldTypeSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../../enums");
exports.FieldVariantsForSelectorFieldTypeSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    value: zod_1.z.string(),
    description: zod_1.z.string().nullable().optional(),
    fieldVariantsForSelectorFieldTypeStatus: enums_1.EActiveStatusVariants,
    numInOrder: zod_1.z.number().nullable().optional(),
    handbookUuid: zod_1.z.string().uuid(),
    fieldOfCategoryMaterialUuid: zod_1.z.string().uuid(),
    lastChangeByUserUuid: zod_1.z.string().uuid().nullable().optional(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
