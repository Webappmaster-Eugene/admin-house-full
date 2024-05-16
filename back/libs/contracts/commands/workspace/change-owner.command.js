"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceChangeOwnerCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const WorkspaceChangeOwnerRequestSchema = models_1.UserSchema.pick({
    uuid: true,
});
const WorkspaceChangeOwnerResponseSchema = zod_1.z
    .object({
    data: models_1.WorkspaceSchema.pick({
        uuid: true,
        name: true,
        workspaceCreatorUuid: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var WorkspaceChangeOwnerCommand;
(function (WorkspaceChangeOwnerCommand) {
    WorkspaceChangeOwnerCommand.RequestSchema = WorkspaceChangeOwnerRequestSchema;
    WorkspaceChangeOwnerCommand.ResponseSchema = WorkspaceChangeOwnerResponseSchema;
})(WorkspaceChangeOwnerCommand || (exports.WorkspaceChangeOwnerCommand = WorkspaceChangeOwnerCommand = {}));
