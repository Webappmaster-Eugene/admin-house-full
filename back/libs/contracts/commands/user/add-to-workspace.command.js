"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserToWorkspaceCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const AddUserToWorkspaceRequestSchema = models_1.UserSchema.pick({
    uuid: true,
});
const AddUserToWorkspaceResponseSchema = zod_1.z
    .object({
    data: models_1.UserSchema,
})
    .merge(models_1.ResponseClientSchema);
var AddUserToWorkspaceCommand;
(function (AddUserToWorkspaceCommand) {
    AddUserToWorkspaceCommand.RequestSchema = AddUserToWorkspaceRequestSchema;
    AddUserToWorkspaceCommand.ResponseSchema = AddUserToWorkspaceResponseSchema;
})(AddUserToWorkspaceCommand || (exports.AddUserToWorkspaceCommand = AddUserToWorkspaceCommand = {}));
