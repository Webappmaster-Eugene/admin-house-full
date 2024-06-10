"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAddToProjectCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const UserAddToProjectResponseEntitySchema = models_1.UserSchema.omit({
    password: true,
    createdAt: true,
    updatedAt: true,
});
const UserAddToProjectRequestSchema = models_1.UserSchema.pick({
    uuid: true,
    memberOfProjectUuid: true,
});
const UserAddToProjectResponseSchema = zod_1.z
    .object({
    data: UserAddToProjectResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var UserAddToProjectCommand;
(function (UserAddToProjectCommand) {
    UserAddToProjectCommand.RequestSchema = UserAddToProjectRequestSchema;
    UserAddToProjectCommand.ResponseSchema = UserAddToProjectResponseSchema;
    UserAddToProjectCommand.ResponseEntitySchema = UserAddToProjectResponseEntitySchema;
})(UserAddToProjectCommand || (exports.UserAddToProjectCommand = UserAddToProjectCommand = {}));
