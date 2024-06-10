"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const models_2 = require("../../models");
const WorkspaceDeleteResponseEntitySchema = models_1.WorkspaceSchema.omit({
    createdAt: true,
    updatedAt: true,
});
const WorkspaceDeleteResponseSchema = zod_1.z
    .object({
    data: WorkspaceDeleteResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var WorkspaceDeleteCommand;
(function (WorkspaceDeleteCommand) {
    WorkspaceDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    WorkspaceDeleteCommand.ResponseSchema = WorkspaceDeleteResponseSchema;
    WorkspaceDeleteCommand.ResponseEntitySchema = WorkspaceDeleteResponseEntitySchema;
})(WorkspaceDeleteCommand || (exports.WorkspaceDeleteCommand = WorkspaceDeleteCommand = {}));
