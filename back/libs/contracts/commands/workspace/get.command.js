"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const WorkspaceGetResponseEntitySchema = models_1.WorkspaceBusinessValueSchema.merge(models_1.WorkspaceRelatedEntitiesSchema);
const WorkspaceGetRequestSchema = models_1.WorkspaceSchema.pick({
    uuid: true,
});
const WorkspaceGetResponseSchema = zod_1.z
    .object({
    data: WorkspaceGetResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var WorkspaceGetCommand;
(function (WorkspaceGetCommand) {
    WorkspaceGetCommand.RequestSchema = WorkspaceGetRequestSchema;
    WorkspaceGetCommand.ResponseSchema = WorkspaceGetResponseSchema;
    WorkspaceGetCommand.ResponseEntitySchema = WorkspaceGetResponseEntitySchema;
})(WorkspaceGetCommand || (exports.WorkspaceGetCommand = WorkspaceGetCommand = {}));
