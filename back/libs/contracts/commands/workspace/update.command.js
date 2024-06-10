"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const WorkspaceUpdateResponseEntitySchema = models_1.WorkspaceSchema.omit({
    createdAt: true,
    updatedAt: true,
});
const WorkspaceUpdateRequestSchema = models_1.WorkspaceSchema.pick({
    name: true,
    description: true,
    handbookOfWorkspaceUuid: true,
}).partial();
const WorkspaceUpdateResponseSchema = zod_1.z
    .object({
    data: WorkspaceUpdateResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var WorkspaceUpdateCommand;
(function (WorkspaceUpdateCommand) {
    WorkspaceUpdateCommand.RequestSchema = WorkspaceUpdateRequestSchema;
    WorkspaceUpdateCommand.ResponseSchema = WorkspaceUpdateResponseSchema;
    WorkspaceUpdateCommand.ResponseEntitySchema = WorkspaceUpdateResponseEntitySchema;
})(WorkspaceUpdateCommand || (exports.WorkspaceUpdateCommand = WorkspaceUpdateCommand = {}));
