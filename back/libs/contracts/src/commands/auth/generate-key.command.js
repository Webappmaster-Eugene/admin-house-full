"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGenerateKeyCommand = void 0;
const zod_1 = require("zod");
const auth_strict_key_business_value_schema_1 = require("../../models/auth/auth-strict-key/auth.strict-key-business-value.schema");
const models_1 = require("../../models");
const AuthGenerateKeyResponseEntitySchema = auth_strict_key_business_value_schema_1.AuthStrictKeyBusinessValueSchema;
const AuthGenerateKeyRequestSchema = zod_1.z.object({
    key: zod_1.z.string(),
});
const AuthGenerateKeyResponseSchema = zod_1.z
    .object({
    data: AuthGenerateKeyResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var AuthGenerateKeyCommand;
(function (AuthGenerateKeyCommand) {
    AuthGenerateKeyCommand.RequestSchema = AuthGenerateKeyRequestSchema;
    AuthGenerateKeyCommand.ResponseSchema = AuthGenerateKeyResponseSchema;
    AuthGenerateKeyCommand.ResponseEntitySchema = AuthGenerateKeyResponseEntitySchema;
})(AuthGenerateKeyCommand || (exports.AuthGenerateKeyCommand = AuthGenerateKeyCommand = {}));
