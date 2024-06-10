"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLoginCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const AuthLoginResponseEntitySchema = models_1.AuthSchema;
const AuthLoginRequestSchema = models_1.UserSchema.pick({
    email: true,
    password: true,
});
const AuthLoginResponseSchema = zod_1.z
    .object({
    data: AuthLoginResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var AuthLoginCommand;
(function (AuthLoginCommand) {
    AuthLoginCommand.RequestSchema = AuthLoginRequestSchema;
    AuthLoginCommand.ResponseSchema = AuthLoginResponseSchema;
    AuthLoginCommand.ResponseEntitySchema = AuthLoginResponseEntitySchema;
})(AuthLoginCommand || (exports.AuthLoginCommand = AuthLoginCommand = {}));
