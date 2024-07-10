"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRefreshKeysBusinessValueSchema = void 0;
const zod_1 = require("zod");
exports.AuthRefreshKeysBusinessValueSchema = zod_1.z.object({
    accessToken: zod_1.z.string(),
    refreshToken: zod_1.z.string(),
});
