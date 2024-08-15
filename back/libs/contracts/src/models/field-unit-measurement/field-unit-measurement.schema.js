"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldUnitMeasurementSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../../enums");
exports.FieldUnitMeasurementSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    comment: zod_1.z.string().nullable().optional(),
    numInOrder: zod_1.z.number().nullable().optional(),
    fieldUnitMeasurementStatus: enums_1.EActiveStatusVariants,
    handbookUuid: zod_1.z.string().uuid(),
    lastChangeByUserUuid: zod_1.z.string().uuid().nullable().optional(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
