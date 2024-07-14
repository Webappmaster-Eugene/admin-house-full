"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const workspace_business_value_schema_1 = require("../../models/workspace/workspace-business-value.schema");
const workspace_related_entities_schema_1 = require("../../models/workspace/workspace-related-entities.schema");
const WorkspaceCreateResponseEntitySchema = workspace_business_value_schema_1.WorkspaceBusinessValueSchema.merge(workspace_related_entities_schema_1.WorkspaceRelatedEntitiesSchema);
const WorkspaceCreateRequestSchema = models_1.WorkspaceSchema.pick({
    name: true,
    description: true,
});
const WorkspaceCreateResponseSchema = zod_1.z
    .object({
    data: WorkspaceCreateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var WorkspaceCreateCommand;
(function (WorkspaceCreateCommand) {
    WorkspaceCreateCommand.RequestSchema = WorkspaceCreateRequestSchema;
    WorkspaceCreateCommand.ResponseSchema = WorkspaceCreateResponseSchema;
    WorkspaceCreateCommand.ResponseEntitySchema = WorkspaceCreateResponseEntitySchema;
})(WorkspaceCreateCommand || (exports.WorkspaceCreateCommand = WorkspaceCreateCommand = {}));
