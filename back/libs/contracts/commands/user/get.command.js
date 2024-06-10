"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const UserGetResponseEntitySchema = models_1.UserSchema.omit({
    password: true,
    createdAt: true,
    updatedAt: true,
});
const UserGetResponseSchema = zod_1.z
    .object({
    data: UserGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var UserGetCommand;
(function (UserGetCommand) {
    UserGetCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    UserGetCommand.ResponseSchema = UserGetResponseSchema;
    UserGetCommand.ResponseEntitySchema = UserGetResponseEntitySchema;
})(UserGetCommand || (exports.UserGetCommand = UserGetCommand = {}));
