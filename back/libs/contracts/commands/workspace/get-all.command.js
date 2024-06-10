"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const WorkspaceGetAllResponseEntitySchema = zod_1.z.array(models_1.WorkspaceSchema.omit({
    createdAt: true,
    updatedAt: true,
}));
const WorkspaceGetAllResponseSchema = zod_1.z
    .object({
    data: WorkspaceGetAllResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var WorkspaceGetAllCommand;
(function (WorkspaceGetAllCommand) {
    WorkspaceGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    WorkspaceGetAllCommand.ResponseSchema = WorkspaceGetAllResponseSchema;
    WorkspaceGetAllCommand.ResponseEntitySchema = WorkspaceGetAllResponseEntitySchema;
})(WorkspaceGetAllCommand || (exports.WorkspaceGetAllCommand = WorkspaceGetAllCommand = {}));
