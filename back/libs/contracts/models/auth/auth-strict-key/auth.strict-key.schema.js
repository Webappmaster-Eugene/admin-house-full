"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthStrictKeySchema = void 0;
const zod_1 = require("zod");
exports.AuthStrictKeySchema = zod_1.z.object({
    key: zod_1.z.string(),
});
