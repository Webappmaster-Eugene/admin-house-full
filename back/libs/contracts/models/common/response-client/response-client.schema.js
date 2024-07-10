"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseClientSchema = void 0;
const zod_1 = require("zod");
exports.ResponseClientSchema = zod_1.z.object({
    statusCode: zod_1.z.number(),
    message: zod_1.z.string(),
    errors: zod_1.z.array((0, zod_1.any)()).optional().nullable(),
});
