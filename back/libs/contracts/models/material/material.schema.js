"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialSchema = void 0;
const zod_1 = require("zod");
exports.MaterialSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    comment: zod_1.z.string().nullable().optional(),
    namePublic: zod_1.z.string().nullable().optional(),
    sourceInfo: zod_1.z.string().nullable().optional(),
    handbookUuid: zod_1.z.string().uuid(),
    price: zod_1.z.number(),
    unitMeasurementUuid: zod_1.z.string().uuid(),
    categoryUuid: zod_1.z.string().uuid(),
    responsiblePartnerUuid: zod_1.z.string().uuid().optional().nullable(),
    lastChangeByUserUuid: zod_1.z.string().uuid().optional().nullable(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
