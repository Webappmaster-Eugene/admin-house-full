"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserToWorkspaceCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const UserAddToWorkspaceResponseEntitySchema = models_1.UserSchema.omit({
    password: true,
    createdAt: true,
    updatedAt: true,
});
const AddUserToWorkspaceRequestSchema = models_1.UserSchema.pick({
    uuid: true,
    memberOfWorkspaceUuid: true,
});
const AddUserToWorkspaceResponseSchema = zod_1.z
    .object({
    data: UserAddToWorkspaceResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var AddUserToWorkspaceCommand;
(function (AddUserToWorkspaceCommand) {
    AddUserToWorkspaceCommand.RequestSchema = AddUserToWorkspaceRequestSchema;
    AddUserToWorkspaceCommand.ResponseSchema = AddUserToWorkspaceResponseSchema;
    AddUserToWorkspaceCommand.ResponseEntitySchema = UserAddToWorkspaceResponseEntitySchema;
})(AddUserToWorkspaceCommand || (exports.AddUserToWorkspaceCommand = AddUserToWorkspaceCommand = {}));
