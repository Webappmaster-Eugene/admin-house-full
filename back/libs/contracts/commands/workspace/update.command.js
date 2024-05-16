"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const WorkspaceUpdateRequestSchema = models_1.WorkspaceSchema.omit({
    createdAt: true,
    updatedAt: true,
    workspaceCreatorUuid: true,
    uuid: true,
}).partial();
const WorkspaceUpdateResponseSchema = zod_1.z
    .object({
    data: models_1.WorkspaceSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var WorkspaceUpdateCommand;
(function (WorkspaceUpdateCommand) {
    WorkspaceUpdateCommand.RequestSchema = WorkspaceUpdateRequestSchema;
    WorkspaceUpdateCommand.ResponseSchema = WorkspaceUpdateResponseSchema;
})(WorkspaceUpdateCommand || (exports.WorkspaceUpdateCommand = WorkspaceUpdateCommand = {}));
