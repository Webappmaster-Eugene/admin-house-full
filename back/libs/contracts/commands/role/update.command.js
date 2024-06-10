"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_2 = require("../../models");
const RoleUpdateResponseEntitySchema = models_1.RoleSchema;
const RoleUpdateRequestSchema = models_1.RoleSchema.pick({ description: true });
const RoleUpdateResponseSchema = zod_1.z
    .object({
    data: RoleUpdateResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var RoleUpdateCommand;
(function (RoleUpdateCommand) {
    RoleUpdateCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    RoleUpdateCommand.RequestSchema = RoleUpdateRequestSchema;
    RoleUpdateCommand.ResponseSchema = RoleUpdateResponseSchema;
    RoleUpdateCommand.ResponseEntitySchema = RoleUpdateResponseEntitySchema;
})(RoleUpdateCommand || (exports.RoleUpdateCommand = RoleUpdateCommand = {}));
