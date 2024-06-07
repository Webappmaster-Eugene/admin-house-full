"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRefreshKeysCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const AuthRefreshKeysResponseSchema = zod_1.z
    .object({
    data: models_1.AuthRefreshKeysSchema,
})
    .merge(models_1.ResponseClientSchema);
var AuthRefreshKeysCommand;
(function (AuthRefreshKeysCommand) {
    AuthRefreshKeysCommand.ResponseSchema = AuthRefreshKeysResponseSchema;
})(AuthRefreshKeysCommand || (exports.AuthRefreshKeysCommand = AuthRefreshKeysCommand = {}));
