"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRegisterWithRoleCommand = void 0;
const zod_1 = require("zod");
const register_business_value_schema_1 = require("../../models/auth/register/register-business-value.schema");
const models_1 = require("../../models");
const auth_confirm_password_business_value_schema_1 = require("../../models/auth/auth-confirm-password/auth-confirm-password-business-value.schema");
const register_related_entities_schema_1 = require("../../models/auth/register/register-related-entities.schema");
const AuthRegisterWithRoleResponseEntitySchema = register_business_value_schema_1.RegisterBusinessValueSchema.merge(register_related_entities_schema_1.RegisterRelatedEntitiesSchema);
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
    .merge(auth_confirm_password_business_value_schema_1.ConfirmPasswordBusinessValueSchema)
    .refine((data) => {
    return data.password === data.confirmPassword;
}, {
    message: "Passwords don't match",
    path: ['confirm'], // path of error
});
const AuthRegisterWithRoleResponseSchema = zod_1.z
    .object({
    data: AuthRegisterWithRoleResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var AuthRegisterWithRoleCommand;
(function (AuthRegisterWithRoleCommand) {
    AuthRegisterWithRoleCommand.RequestParamSchema = AuthRegisterWithRoleRequestParamSchema;
    AuthRegisterWithRoleCommand.RequestSchema = AuthRegisterWithRoleRequestSchema;
    AuthRegisterWithRoleCommand.ResponseSchema = AuthRegisterWithRoleResponseSchema;
    AuthRegisterWithRoleCommand.ResponseEntitySchema = AuthRegisterWithRoleResponseEntitySchema;
})(AuthRegisterWithRoleCommand || (exports.AuthRegisterWithRoleCommand = AuthRegisterWithRoleCommand = {}));
