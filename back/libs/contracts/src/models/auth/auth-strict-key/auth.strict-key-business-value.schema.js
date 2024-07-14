"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthStrictKeyBusinessValueSchema = void 0;
const zod_1 = require("zod");
exports.AuthStrictKeyBusinessValueSchema = zod_1.z.object({
    key: zod_1.z.string(),
});
