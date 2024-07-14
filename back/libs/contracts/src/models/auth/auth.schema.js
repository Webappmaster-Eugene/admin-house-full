"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSchema = void 0;
const zod_1 = require("zod");
exports.AuthSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    email: zod_1.z.string().email(),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string().nullable().optional(),
    phone: zod_1.z.string().nullable().optional(),
    address: zod_1.z.string().nullable().optional(),
    info: zod_1.z.string().nullable().optional(),
    documents: zod_1.z.string().nullable().optional(),
    roleUuid: zod_1.z.string(),
    accessToken: zod_1.z.string(),
    refreshToken: zod_1.z.string(),
});
