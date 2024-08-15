"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacteristicsMaterialSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../../enums");
exports.CharacteristicsMaterialSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    value: zod_1.z.string(),
    characteristicsMaterialStatus: enums_1.EActiveStatusVariants,
    numInOrder: zod_1.z.number().optional().nullable(),
    comment: zod_1.z.string().optional().nullable(),
    fieldOfCategoryMaterialUuid: zod_1.z.string().uuid(),
    handbookUuid: zod_1.z.string().uuid(),
    materialUuid: zod_1.z.string().uuid(),
    lastChangeByUserUuid: zod_1.z.string().uuid().nullable().optional(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
