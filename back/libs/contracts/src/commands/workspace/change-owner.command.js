"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceChangeOwnerCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const workspace_business_value_schema_1 = require("../../models/workspace/workspace-business-value.schema");
const workspace_related_entities_schema_1 = require("../../models/workspace/workspace-related-entities.schema");
const WorkspaceChangeOwnerResponseEntitySchema = workspace_business_value_schema_1.WorkspaceBusinessValueSchema.merge(workspace_related_entities_schema_1.WorkspaceRelatedEntitiesSchema);
const WorkspaceChangeOwnerRequestSchema = models_1.UserSchema.pick({
    uuid: true,
});
const WorkspaceChangeOwnerResponseSchema = zod_1.z
    .object({
    data: WorkspaceChangeOwnerResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var WorkspaceChangeOwnerCommand;
(function (WorkspaceChangeOwnerCommand) {
    WorkspaceChangeOwnerCommand.RequestSchema = WorkspaceChangeOwnerRequestSchema;
    WorkspaceChangeOwnerCommand.ResponseSchema = WorkspaceChangeOwnerResponseSchema;
    WorkspaceChangeOwnerCommand.ResponseEntitySchema = WorkspaceChangeOwnerResponseEntitySchema;
})(WorkspaceChangeOwnerCommand || (exports.WorkspaceChangeOwnerCommand = WorkspaceChangeOwnerCommand = {}));
