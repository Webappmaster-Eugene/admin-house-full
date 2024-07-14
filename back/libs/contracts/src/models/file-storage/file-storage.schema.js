"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageSchema = void 0;
const zod_1 = require("zod");
exports.FileStorageSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    nameFile: zod_1.z.string(),
    comment: zod_1.z.string().nullable().optional(),
    link: zod_1.z.string(),
    lastChangeByUserUuid: zod_1.z.string().uuid().nullable().optional(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
