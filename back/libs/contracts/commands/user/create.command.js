"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const UserCreateRequestSchema = models_1.UserSchema.pick({
    avatar: true,
    info: true,
    address: true,
    secondName: true,
    documents: true,
    email: true,
    password: true,
    firstName: true,
    phone: true,
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
