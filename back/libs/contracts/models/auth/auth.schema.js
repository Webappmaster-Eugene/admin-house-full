"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../../enums");
exports.AuthSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid(),
    email: zod_1.z.string().email(),
    firstName: zod_1.z.string(),
    roleName: enums_1.EUserVariants,
    accessToken: zod_1.z.string(),
});
