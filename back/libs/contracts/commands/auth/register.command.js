"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRegisterCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const models_3 = require("../../models");
const AuthRegisterRequestSchema = models_1.UserSchema.omit({
    memberOfWorkspaceUuid: true,
    memberOfOrganizationUuid: true,
    creatorOfWorkspaceUuid: true,
    uuid: true,
    createdAt: true,
    updatedAt: true,
    roleUuid: true,
})
    .merge(models_3.ConfirmPasswordSchema)
    .refine(data => {
    return data.password === data.confirmPassword;
}, {
    message: "Passwords don't match",
    path: ['confirm'], // path of error
});
const AuthRegisterResponseSchema = zod_1.z
    .object({
    data: models_1.AuthSchema,
})
    .merge(models_2.ResponseClientSchema);
var AuthRegisterCommand;
(function (AuthRegisterCommand) {
    AuthRegisterCommand.RequestSchema = AuthRegisterRequestSchema;
    AuthRegisterCommand.ResponseSchema = AuthRegisterResponseSchema;
})(AuthRegisterCommand || (exports.AuthRegisterCommand = AuthRegisterCommand = {}));
