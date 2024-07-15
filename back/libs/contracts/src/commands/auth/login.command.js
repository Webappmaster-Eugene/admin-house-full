"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLoginCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const login_related_entities_schema_1 = require("../../models/auth/login/login-related-entities.schema");
const login_business_value_schema_1 = require("../../models/auth/login/login-business-value.schema");
const AuthLoginResponseEntitySchema = login_business_value_schema_1.LoginBusinessValueSchema.merge(login_related_entities_schema_1.LoginRelatedEntitiesSchema);
const AuthLoginRequestSchema = models_1.UserSchema.pick({
    email: true,
}).merge(models_1.PasswordSchema);
const AuthLoginResponseSchema = zod_1.z
    .object({
    data: AuthLoginResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var AuthLoginCommand;
(function (AuthLoginCommand) {
    AuthLoginCommand.BusinessValueSchema = login_business_value_schema_1.LoginBusinessValueSchema;
    AuthLoginCommand.RequestSchema = AuthLoginRequestSchema;
    AuthLoginCommand.ResponseSchema = AuthLoginResponseSchema;
    AuthLoginCommand.ResponseEntitySchema = AuthLoginResponseEntitySchema;
})(AuthLoginCommand || (exports.AuthLoginCommand = AuthLoginCommand = {}));
