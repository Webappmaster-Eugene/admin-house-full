"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGetKeyCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const AuthGetKeyResponseEntitySchema = models_2.AuthStrictKeySchema;
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
