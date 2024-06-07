"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const OrganizationGetAllResponseSchema = zod_1.z
    .object({
    data: zod_1.z.array(models_1.OrganizationSchema.pick({
        uuid: true,
        name: true,
        description: true,
        organizationLeaderUuid: true,
        workspaceUuid: true,
        lastChangeByUserUuid: true,
    })),
})
    .merge(models_2.ResponseClientSchema);
var OrganizationGetAllCommand;
(function (OrganizationGetAllCommand) {
    OrganizationGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    OrganizationGetAllCommand.ResponseSchema = OrganizationGetAllResponseSchema;
})(OrganizationGetAllCommand || (exports.OrganizationGetAllCommand = OrganizationGetAllCommand = {}));
