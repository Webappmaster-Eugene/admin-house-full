"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const workspace_business_value_schema_1 = require("../../models/workspace/workspace-business-value.schema");
const workspace_related_entities_schema_1 = require("../../models/workspace/workspace-related-entities.schema");
const WorkspaceDeleteResponseEntitySchema = workspace_business_value_schema_1.WorkspaceBusinessValueSchema.merge(workspace_related_entities_schema_1.WorkspaceRelatedEntitiesSchema);
const WorkspaceDeleteResponseSchema = zod_1.z
    .object({
    data: WorkspaceDeleteResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var WorkspaceDeleteCommand;
(function (WorkspaceDeleteCommand) {
    WorkspaceDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    WorkspaceDeleteCommand.ResponseSchema = WorkspaceDeleteResponseSchema;
    WorkspaceDeleteCommand.ResponseEntitySchema = WorkspaceDeleteResponseEntitySchema;
})(WorkspaceDeleteCommand || (exports.WorkspaceDeleteCommand = WorkspaceDeleteCommand = {}));
