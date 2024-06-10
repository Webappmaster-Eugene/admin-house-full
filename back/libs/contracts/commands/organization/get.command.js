"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const OrganizationGetResponseEntitySchema = models_1.OrganizationSchema.pick({
    uuid: true,
    name: true,
    description: true,
    organizationLeaderUuid: true,
    workspaceUuid: true,
    lastChangeByUserUuid: true,
});
const OrganizationSchemaGetResponseSchema = zod_1.z
    .object({
    data: OrganizationGetResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var OrganizationGetCommand;
(function (OrganizationGetCommand) {
    OrganizationGetCommand.ResponseSchema = OrganizationSchemaGetResponseSchema;
    OrganizationGetCommand.ResponseEntitySchema = OrganizationGetResponseEntitySchema;
})(OrganizationGetCommand || (exports.OrganizationGetCommand = OrganizationGetCommand = {}));
