"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRefreshKeysSchema = void 0;
const zod_1 = require("zod");
exports.AuthRefreshKeysSchema = zod_1.z.object({
    accessToken: zod_1.z.string(),
    refreshToken: zod_1.z.string(),
});
