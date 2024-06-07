"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const OrganizationSchemaGetResponseSchema = zod_1.z
    .object({
    data: models_1.OrganizationSchema.pick({
        uuid: true,
        name: true,
        description: true,
        organizationLeaderUuid: true,
        workspaceUuid: true,
        lastChangeByUserUuid: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var OrganizationGetCommand;
(function (OrganizationGetCommand) {
    OrganizationGetCommand.ResponseSchema = OrganizationSchemaGetResponseSchema;
})(OrganizationGetCommand || (exports.OrganizationGetCommand = OrganizationGetCommand = {}));
