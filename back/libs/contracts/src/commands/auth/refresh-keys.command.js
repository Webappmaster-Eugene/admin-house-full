"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRefreshKeysCommand = void 0;
const zod_1 = require("zod");
const auth_refresh_keys_business_value_schema_1 = require("../../models/auth/auth-refresh-keys/auth.refresh-keys-business-value.schema");
const models_1 = require("../../models");
const AuthRefreshKeysResponseEntitySchema = auth_refresh_keys_business_value_schema_1.AuthRefreshKeysBusinessValueSchema;
const AuthRefreshKeysResponseSchema = zod_1.z
    .object({
    data: AuthRefreshKeysResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var AuthRefreshKeysCommand;
(function (AuthRefreshKeysCommand) {
    AuthRefreshKeysCommand.BusinessValueSchema = auth_refresh_keys_business_value_schema_1.AuthRefreshKeysBusinessValueSchema;
    AuthRefreshKeysCommand.ResponseSchema = AuthRefreshKeysResponseSchema;
    AuthRefreshKeysCommand.ResponseEntitySchema = AuthRefreshKeysResponseEntitySchema;
})(AuthRefreshKeysCommand || (exports.AuthRefreshKeysCommand = AuthRefreshKeysCommand = {}));
