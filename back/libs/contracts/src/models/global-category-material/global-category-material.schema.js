"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalCategoryMaterialSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../../enums");
exports.GlobalCategoryMaterialSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: enums_1.EGlobalCategoryVariants,
    nameRu: zod_1.z.string().nullable().optional(),
    comment: zod_1.z.string().nullable().optional(),
    color: zod_1.z.string().nullable().optional(),
    lastChangeByUserUuid: zod_1.z.string().uuid().nullable().optional(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
