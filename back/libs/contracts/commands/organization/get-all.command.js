"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const OrganizationGetAllResponseEntitySchema = zod_1.z.array(models_1.OrganizationBusinessValueSchema.merge(models_1.OrganizationRelatedEntitiesSchema));
const OrganizationGetAllResponseSchema = zod_1.z
    .object({
    data: OrganizationGetAllResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var OrganizationGetAllCommand;
(function (OrganizationGetAllCommand) {
    OrganizationGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    OrganizationGetAllCommand.ResponseSchema = OrganizationGetAllResponseSchema;
    OrganizationGetAllCommand.ResponseEntitySchema = OrganizationGetAllResponseEntitySchema;
})(OrganizationGetAllCommand || (exports.OrganizationGetAllCommand = OrganizationGetAllCommand = {}));
