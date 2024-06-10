"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGetFullInfoCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const models_2 = require("../../models");
const UserGetFullInfoResponseEntitySchema = models_2.UserFullInfoSchema.omit({
    password: true,
    createdAt: true,
    updatedAt: true,
});
const UserGetFullInfoResponseSchema = zod_1.z
    .object({
    data: UserGetFullInfoResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var UserGetFullInfoCommand;
(function (UserGetFullInfoCommand) {
    UserGetFullInfoCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    UserGetFullInfoCommand.ResponseSchema = UserGetFullInfoResponseSchema;
    UserGetFullInfoCommand.ResponseEntitySchema = UserGetFullInfoResponseEntitySchema;
})(UserGetFullInfoCommand || (exports.UserGetFullInfoCommand = UserGetFullInfoCommand = {}));
