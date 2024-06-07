"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const WorkspaceCreateRequestSchema = models_1.WorkspaceSchema.pick({
    name: true,
    description: true,
});
const WorkspaceCreateResponseSchema = zod_1.z
    .object({
    data: models_1.WorkspaceSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var WorkspaceCreateCommand;
(function (WorkspaceCreateCommand) {
    WorkspaceCreateCommand.RequestSchema = WorkspaceCreateRequestSchema;
    WorkspaceCreateCommand.ResponseSchema = WorkspaceCreateResponseSchema;
})(WorkspaceCreateCommand || (exports.WorkspaceCreateCommand = WorkspaceCreateCommand = {}));
