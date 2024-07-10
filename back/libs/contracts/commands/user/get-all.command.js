"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const models_3 = require("../../models");
const UserGetAllResponseEntitySchema = zod_1.z.array(models_1.UserBusinessValueSchema.merge(models_1.UserRelatedEntitiesSchema));
const UserGetAllResponseSchema = zod_1.z
    .object({
    data: UserGetAllResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var UserGetAllCommand;
(function (UserGetAllCommand) {
    UserGetAllCommand.RequestQuerySchema = models_3.RequestGetAllQuerySchema;
    UserGetAllCommand.ResponseSchema = UserGetAllResponseSchema;
    UserGetAllCommand.ResponseEntitySchema = UserGetAllResponseEntitySchema;
})(UserGetAllCommand || (exports.UserGetAllCommand = UserGetAllCommand = {}));
