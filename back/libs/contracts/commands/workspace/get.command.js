"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const WorkspaceGetRequestSchema = models_1.WorkspaceSchema.pick({
    uuid: true,
});
const WorkspaceGetResponseSchema = zod_1.z
    .object({
    data: models_1.WorkspaceSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var WorkspaceGetCommand;
(function (WorkspaceGetCommand) {
    WorkspaceGetCommand.RequestSchema = WorkspaceGetRequestSchema;
    WorkspaceGetCommand.ResponseSchema = WorkspaceGetResponseSchema;
})(WorkspaceGetCommand || (exports.WorkspaceGetCommand = WorkspaceGetCommand = {}));
