"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRegisterCommand = void 0;
const zod_1 = require("zod");
const register_business_value_schema_1 = require("../../models/auth/register/register-business-value.schema");
const auth_confirm_password_business_value_schema_1 = require("../../models/auth/auth-confirm-password/auth-confirm-password-business-value.schema");
const models_1 = require("../../models");
const register_related_entities_schema_1 = require("../../models/auth/register/register-related-entities.schema");
const AuthRegisterResponseEntitySchema = register_business_value_schema_1.RegisterBusinessValueSchema.merge(register_related_entities_schema_1.RegisterRelatedEntitiesSchema);
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
    .merge(auth_confirm_password_business_value_schema_1.ConfirmPasswordBusinessValueSchema)
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
    .merge(models_1.ResponseClientSchema);
var AuthRegisterCommand;
(function (AuthRegisterCommand) {
    AuthRegisterCommand.BusinessValueSchema = register_business_value_schema_1.RegisterBusinessValueSchema;
    AuthRegisterCommand.RequestSchema = AuthRegisterRequestSchema;
    AuthRegisterCommand.ResponseSchema = AuthRegisterResponseSchema;
    AuthRegisterCommand.ResponseEntitySchema = AuthRegisterResponseEntitySchema;
})(AuthRegisterCommand || (exports.AuthRegisterCommand = AuthRegisterCommand = {}));
