"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacteristicsMaterialSchema = void 0;
const zod_1 = require("zod");
exports.CharacteristicsMaterialSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    value: zod_1.z.string(),
    comment: zod_1.z.string().optional().nullable(),
    fieldOfCategoryMaterialUuid: zod_1.z.string(),
    addedByUserUuid: zod_1.z.string(),
    handbookUuid: zod_1.z.string(),
    materialUuid: zod_1.z.string(),
    fieldTypeUuid: zod_1.z.string(),
    fieldUnitMeasurementUuid: zod_1.z.string().optional().nullable(),
    categoryMaterialUuid: zod_1.z.string(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
