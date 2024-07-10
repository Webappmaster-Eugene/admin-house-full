"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRegisterCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const AuthRegisterResponseEntitySchema = models_1.RegisterBusinessValueSchema;
const AuthRegisterRequestSchema = models_1.UserSchema.pick({
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
    .merge(models_1.ConfirmPasswordBusinessValueSchema)
    .refine((data) => {
    return data.password === data.confirmPassword;
}, {
    message: "Passwords don't match",
    path: ['confirm'], // path of error
});
const AuthRegisterResponseSchema = zod_1.z
    .object({
    data: AuthRegisterResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var AuthRegisterCommand;
(function (AuthRegisterCommand) {
    AuthRegisterCommand.RequestSchema = AuthRegisterRequestSchema;
    AuthRegisterCommand.ResponseSchema = AuthRegisterResponseSchema;
    AuthRegisterCommand.ResponseEntitySchema = AuthRegisterResponseEntitySchema;
})(AuthRegisterCommand || (exports.AuthRegisterCommand = AuthRegisterCommand = {}));
