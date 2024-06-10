"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const OrganizationUpdateResponseEntitySchema = models_1.OrganizationSchema.pick({
    uuid: true,
    name: true,
    description: true,
    organizationLeaderUuid: true,
    workspaceUuid: true,
    lastChangeByUserUuid: true,
});
const OrganizationUpdateRequestSchema = models_1.OrganizationSchema.pick({
    name: true,
    description: true,
}).partial();
const OrganizationUpdateResponseSchema = zod_1.z
    .object({
    data: OrganizationUpdateResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var OrganizationUpdateCommand;
(function (OrganizationUpdateCommand) {
    OrganizationUpdateCommand.RequestSchema = OrganizationUpdateRequestSchema;
    OrganizationUpdateCommand.ResponseSchema = OrganizationUpdateResponseSchema;
    OrganizationUpdateCommand.ResponseEntitySchema = OrganizationUpdateResponseEntitySchema;
})(OrganizationUpdateCommand || (exports.OrganizationUpdateCommand = OrganizationUpdateCommand = {}));
