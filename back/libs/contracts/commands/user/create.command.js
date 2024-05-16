"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const UserCreateRequestSchema = models_1.UserSchema.omit({
    memberOfWorkspaceUuid: true,
    memberOfOrganizationUuid: true,
    creatorOfWorkspaceUuid: true,
    uuid: true,
    createdAt: true,
    updatedAt: true,
    roleUuid: true,
});
const UserCreateResponseSchema = zod_1.z
    .object({
    data: models_1.UserSchema.omit({
        password: true,
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_1.ResponseClientSchema);
var UserCreateCommand;
(function (UserCreateCommand) {
    UserCreateCommand.RequestSchema = UserCreateRequestSchema;
    UserCreateCommand.ResponseSchema = UserCreateResponseSchema;
})(UserCreateCommand || (exports.UserCreateCommand = UserCreateCommand = {}));
