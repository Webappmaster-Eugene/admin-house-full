"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeleteCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const UserDeleteResponseEntitySchema = models_1.UserSchema.omit({
    password: true,
    createdAt: true,
    updatedAt: true,
});
const UserDeleteResponseSchema = zod_1.z
    .object({
    data: UserDeleteResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var UserDeleteCommand;
(function (UserDeleteCommand) {
    UserDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    UserDeleteCommand.ResponseSchema = UserDeleteResponseSchema;
    UserDeleteCommand.ResponseEntitySchema = UserDeleteResponseEntitySchema;
})(UserDeleteCommand || (exports.UserDeleteCommand = UserDeleteCommand = {}));
