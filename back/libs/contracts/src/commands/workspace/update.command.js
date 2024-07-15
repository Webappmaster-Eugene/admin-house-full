"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceUpdateCommand = void 0;
const zod_1 = require("zod");
const workspace_business_value_schema_1 = require("../../models/workspace/workspace-business-value.schema");
const models_1 = require("../../models");
const workspace_related_entities_schema_1 = require("../../models/workspace/workspace-related-entities.schema");
const WorkspaceUpdateResponseEntitySchema = workspace_business_value_schema_1.WorkspaceBusinessValueSchema.merge(workspace_related_entities_schema_1.WorkspaceRelatedEntitiesSchema);
const WorkspaceUpdateRequestSchema = models_1.WorkspaceSchema.pick({
    name: true,
    description: true,
    handbookOfWorkspaceUuid: true,
}).partial();
const WorkspaceUpdateResponseSchema = zod_1.z
    .object({
    data: WorkspaceUpdateResponseEntitySchema,
})
    .merge(zod_1.z.object({
    statusCode: zod_1.z.number(),
    message: zod_1.z.string(),
    errors: zod_1.z.array((0, zod_1.any)().optional().nullable()),
}));
var WorkspaceUpdateCommand;
(function (WorkspaceUpdateCommand) {
    WorkspaceUpdateCommand.RequestSchema = WorkspaceUpdateRequestSchema;
    WorkspaceUpdateCommand.ResponseSchema = WorkspaceUpdateResponseSchema;
    WorkspaceUpdateCommand.ResponseEntitySchema = WorkspaceUpdateResponseEntitySchema;
})(WorkspaceUpdateCommand || (exports.WorkspaceUpdateCommand = WorkspaceUpdateCommand = {}));
