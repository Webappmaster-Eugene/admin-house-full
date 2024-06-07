"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldTypeSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../../enums");
exports.FieldTypeSchema = zod_1.z.object({
    jsType: enums_1.EFieldTypeVariants,
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    description: zod_1.z.string().nullable().optional(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
    lastChangeByUserUuid: zod_1.z.string().uuid().optional().nullable(),
});
