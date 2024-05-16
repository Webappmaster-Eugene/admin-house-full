"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleDeleteCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_2 = require("../../models");
const RoleDeleteResponseSchema = zod_1.z
    .object({
    data: models_1.RoleSchema,
})
    .merge(models_2.ResponseClientSchema);
var RoleDeleteCommand;
(function (RoleDeleteCommand) {
    RoleDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    RoleDeleteCommand.ResponseSchema = RoleDeleteResponseSchema;
})(RoleDeleteCommand || (exports.RoleDeleteCommand = RoleDeleteCommand = {}));
