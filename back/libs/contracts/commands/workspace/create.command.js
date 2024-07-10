"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const WorkspaceCreateResponseEntitySchema = models_1.WorkspaceBusinessValueSchema.merge(models_1.WorkspaceRelatedEntitiesSchema);
const WorkspaceCreateRequestSchema = models_1.WorkspaceSchema.pick({
    name: true,
    description: true,
});
const WorkspaceCreateResponseSchema = zod_1.z
    .object({
    data: WorkspaceCreateResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var WorkspaceCreateCommand;
(function (WorkspaceCreateCommand) {
    WorkspaceCreateCommand.RequestSchema = WorkspaceCreateRequestSchema;
    WorkspaceCreateCommand.ResponseSchema = WorkspaceCreateResponseSchema;
    WorkspaceCreateCommand.ResponseEntitySchema = WorkspaceCreateResponseEntitySchema;
})(WorkspaceCreateCommand || (exports.WorkspaceCreateCommand = WorkspaceCreateCommand = {}));
