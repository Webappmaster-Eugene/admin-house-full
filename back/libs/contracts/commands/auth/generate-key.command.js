"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGenerateKeyCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const AuthGenerateKeyRequestSchema = zod_1.z.object({
    key: zod_1.z.string(),
});
const AuthGenerateKeyResponseSchema = zod_1.z
    .object({
    data: models_1.AuthStrictKeySchema,
})
    .merge(models_2.ResponseClientSchema);
var AuthGenerateKeyCommand;
(function (AuthGenerateKeyCommand) {
    AuthGenerateKeyCommand.RequestSchema = AuthGenerateKeyRequestSchema;
    AuthGenerateKeyCommand.ResponseSchema = AuthGenerateKeyResponseSchema;
})(AuthGenerateKeyCommand || (exports.AuthGenerateKeyCommand = AuthGenerateKeyCommand = {}));
