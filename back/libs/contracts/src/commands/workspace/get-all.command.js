"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const workspace_business_value_schema_1 = require("../../models/workspace/workspace-business-value.schema");
const workspace_related_entities_schema_1 = require("../../models/workspace/workspace-related-entities.schema");
const WorkspaceGetAllResponseEntitySchema = zod_1.z.array(workspace_business_value_schema_1.WorkspaceBusinessValueSchema.merge(workspace_related_entities_schema_1.WorkspaceRelatedEntitiesSchema));
const WorkspaceGetAllResponseSchema = zod_1.z
    .object({
    data: WorkspaceGetAllResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var WorkspaceGetAllCommand;
(function (WorkspaceGetAllCommand) {
    WorkspaceGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    WorkspaceGetAllCommand.ResponseSchema = WorkspaceGetAllResponseSchema;
    WorkspaceGetAllCommand.ResponseEntitySchema = WorkspaceGetAllResponseEntitySchema;
})(WorkspaceGetAllCommand || (exports.WorkspaceGetAllCommand = WorkspaceGetAllCommand = {}));
