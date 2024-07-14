"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGetKeyCommand = void 0;
const zod_1 = require("zod");
const auth_strict_key_business_value_schema_1 = require("../../models/auth/auth-strict-key/auth.strict-key-business-value.schema");
const models_1 = require("../../models");
const AuthGetKeyResponseEntitySchema = auth_strict_key_business_value_schema_1.AuthStrictKeyBusinessValueSchema;
const AuthGetKeyResponseSchema = zod_1.z
    .object({
    data: AuthGetKeyResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var AuthGetKeyCommand;
(function (AuthGetKeyCommand) {
    AuthGetKeyCommand.ResponseSchema = AuthGetKeyResponseSchema;
    AuthGetKeyCommand.ResponseEntitySchema = AuthGetKeyResponseEntitySchema;
})(AuthGetKeyCommand || (exports.AuthGetKeyCommand = AuthGetKeyCommand = {}));
