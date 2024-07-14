"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseClientSchema = exports.ResponseClientStrictSchema = void 0;
const zod_1 = require("zod");
exports.ResponseClientStrictSchema = zod_1.z
    .object({
    statusCode: zod_1.z.number(),
    message: zod_1.z.string(),
})
    .strict();
exports.ResponseClientSchema = zod_1.z
    .object({
    errors: zod_1.z.array((0, zod_1.unknown)()).nullable().optional(),
})
    .merge(exports.ResponseClientStrictSchema);
