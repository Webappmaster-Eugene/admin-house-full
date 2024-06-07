"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserToProjectCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const AddUserToProjectRequestSchema = models_1.UserSchema.pick({
    uuid: true,
    memberOfProjectUuid: true,
});
const AddUserToProjectResponseSchema = zod_1.z
    .object({
    data: models_1.UserSchema,
})
    .merge(models_2.ResponseClientSchema);
var AddUserToProjectCommand;
(function (AddUserToProjectCommand) {
    AddUserToProjectCommand.RequestSchema = AddUserToProjectRequestSchema;
    AddUserToProjectCommand.ResponseSchema = AddUserToProjectResponseSchema;
})(AddUserToProjectCommand || (exports.AddUserToProjectCommand = AddUserToProjectCommand = {}));
