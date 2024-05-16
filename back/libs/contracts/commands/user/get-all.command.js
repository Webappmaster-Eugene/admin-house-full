"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const models_3 = require("../../models");
const UserGetAllResponseSchema = zod_1.z
    .object({
    data: zod_1.z.array(models_1.UserSchema.omit({
        password: true,
        createdAt: true,
        updatedAt: true,
    })),
})
    .merge(models_2.ResponseClientSchema);
var UserGetAllCommand;
(function (UserGetAllCommand) {
    UserGetAllCommand.RequestQuerySchema = models_3.RequestGetAllQuerySchema;
    UserGetAllCommand.ResponseSchema = UserGetAllResponseSchema;
})(UserGetAllCommand || (exports.UserGetAllCommand = UserGetAllCommand = {}));
