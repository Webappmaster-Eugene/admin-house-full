"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppInfoSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../../enums");
exports.AppInfoSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    comment: zod_1.z.string(),
    status: enums_1.EStatusVariants,
    language: enums_1.ELanguagesVariants,
    currency: enums_1.ECurrencyVariants,
    lastChangeByUserUuid: zod_1.z.string().uuid().optional().nullable(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
