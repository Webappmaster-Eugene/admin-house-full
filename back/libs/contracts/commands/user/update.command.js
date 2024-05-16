"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_2 = require("../../models");
const UserUpdateRequestSchema = models_1.UserSchema.pick({
    firstName: true,
    secondName: true,
    avatar: true,
    phone: true,
    info: true,
    documents: true,
    address: true,
    memberOfWorkspaceUuid: true,
    memberOfOrganizationUuid: true,
    memberOfProjectUuid: true,
}).partial();
const UserUpdateResponseSchema = zod_1.z
    .object({
    data: models_1.UserSchema.omit({
        password: true,
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var UserUpdateCommand;
(function (UserUpdateCommand) {
    UserUpdateCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    UserUpdateCommand.RequestSchema = UserUpdateRequestSchema;
    UserUpdateCommand.ResponseSchema = UserUpdateResponseSchema;
})(UserUpdateCommand || (exports.UserUpdateCommand = UserUpdateCommand = {}));
