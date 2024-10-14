"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMaterialSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../../enums");
exports.CategoryMaterialSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    isDefault: zod_1.z.boolean().default(false),
    categoryMaterialStatus: enums_1.EActiveStatusVariants.nullish().default('ACTIVE'),
    numInOrder: zod_1.z.number().nullable().optional(),
    comment: zod_1.z.string().nullable().optional(),
    templateName: zod_1.z.string().nullable().optional(),
    globalCategoryMaterialUuid: zod_1.z.string().uuid(),
    lastChangeByUserUuid: zod_1.z.string().uuid().nullable().optional(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
