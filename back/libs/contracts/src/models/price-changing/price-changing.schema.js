"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceChangingSchema = void 0;
const zod_1 = require("zod");
exports.PriceChangingSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    oldPrice: zod_1.z.number().nullable().optional(),
    newPrice: zod_1.z.number(),
    source: zod_1.z.string().nullable().optional(),
    comment: zod_1.z.string().nullable().optional(),
    materialUuid: zod_1.z.string().uuid(),
    lastChangeByUserUuid: zod_1.z.string().uuid().optional().nullable(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
