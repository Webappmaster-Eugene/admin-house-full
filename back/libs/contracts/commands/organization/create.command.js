"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const OrganizationCreateRequestSchema = models_1.OrganizationSchema.omit({
    uuid: true,
    createdAt: true,
    updatedAt: true,
    organizationLeaderUuid: true,
    workspaceUuid: true,
});
const OrganizationCreateResponseSchema = zod_1.z
    .object({
    data: models_1.OrganizationSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var OrganizationCreateCommand;
(function (OrganizationCreateCommand) {
    OrganizationCreateCommand.RequestSchema = OrganizationCreateRequestSchema;
    OrganizationCreateCommand.ResponseSchema = OrganizationCreateResponseSchema;
})(OrganizationCreateCommand || (exports.OrganizationCreateCommand = OrganizationCreateCommand = {}));
