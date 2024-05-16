"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserToOrganizationCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const AddUserToOrganizationRequestSchema = models_1.UserSchema.pick({
    uuid: true,
});
const AddUserToOrganizationResponseSchema = zod_1.z
    .object({
    data: models_1.UserSchema,
})
    .merge(models_2.ResponseClientSchema);
var AddUserToOrganizationCommand;
(function (AddUserToOrganizationCommand) {
    AddUserToOrganizationCommand.RequestSchema = AddUserToOrganizationRequestSchema;
    AddUserToOrganizationCommand.ResponseSchema = AddUserToOrganizationResponseSchema;
})(AddUserToOrganizationCommand || (exports.AddUserToOrganizationCommand = AddUserToOrganizationCommand = {}));
