"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const workspace_business_value_schema_1 = require("../../models/workspace/workspace-business-value.schema");
const workspace_related_entities_schema_1 = require("../../models/workspace/workspace-related-entities.schema");
const WorkspaceGetResponseEntitySchema = workspace_business_value_schema_1.WorkspaceBusinessValueSchema.merge(workspace_related_entities_schema_1.WorkspaceRelatedEntitiesSchema);
const WorkspaceGetRequestSchema = models_1.WorkspaceSchema.pick({
    uuid: true,
});
const WorkspaceGetResponseSchema = zod_1.z
    .object({
    data: WorkspaceGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var WorkspaceGetCommand;
(function (WorkspaceGetCommand) {
    WorkspaceGetCommand.RequestSchema = WorkspaceGetRequestSchema;
    WorkspaceGetCommand.ResponseSchema = WorkspaceGetResponseSchema;
    WorkspaceGetCommand.ResponseEntitySchema = WorkspaceGetResponseEntitySchema;
})(WorkspaceGetCommand || (exports.WorkspaceGetCommand = WorkspaceGetCommand = {}));
