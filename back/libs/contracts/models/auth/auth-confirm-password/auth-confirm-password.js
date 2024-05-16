"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmPasswordSchema = void 0;
const zod_1 = require("zod");
exports.ConfirmPasswordSchema = zod_1.z.object({
    confirmPassword: zod_1.z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, `Password must have:
Minimum 8 characters in length;
At least one uppercase English letter;
At least one lowercase English letter;
At least one digit;
At least one special character`),
});
