"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRegisterWithRoleCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const AuthRegisterWithRoleRequestParamSchema = zod_1.z.object({
    roleId: zod_1.z.number().gte(1).lte(4),
    registerWithRoleKey: zod_1.z.string(),
});
const AuthRegisterWithRoleRequestSchema = models_1.UserSchema.pick({
    email: true,
    password: true,
    address: true,
    documents: true,
    firstName: true,
    secondName: true,
    info: true,
    phone: true,
    avatar: true,
})
    .merge(models_1.ConfirmPasswordSchema)
    .refine(data => {
    return data.password === data.confirmPassword;
}, {
    message: "Passwords don't match",
    path: ['confirm'], // path of error
});
const AuthRegisterWithRoleResponseSchema = zod_1.z
    .object({
    data: models_1.AuthSchema,
})
    .merge(models_2.ResponseClientSchema);
var AuthRegisterWithRoleCommand;
(function (AuthRegisterWithRoleCommand) {
    AuthRegisterWithRoleCommand.RequestParamSchema = AuthRegisterWithRoleRequestParamSchema;
    AuthRegisterWithRoleCommand.RequestSchema = AuthRegisterWithRoleRequestSchema;
    AuthRegisterWithRoleCommand.ResponseSchema = AuthRegisterWithRoleResponseSchema;
})(AuthRegisterWithRoleCommand || (exports.AuthRegisterWithRoleCommand = AuthRegisterWithRoleCommand = {}));
