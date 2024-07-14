"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const organization_business_value_schema_1 = require("../../models/organization/organization-business-value.schema");
const organization_related_entities_schema_1 = require("../../models/organization/organization-related-entities.schema");
const OrganizationGetAllResponseEntitySchema = zod_1.z.array(organization_business_value_schema_1.OrganizationBusinessValueSchema.merge(organization_related_entities_schema_1.OrganizationRelatedEntitiesSchema));
const OrganizationGetAllResponseSchema = zod_1.z
    .object({
    data: OrganizationGetAllResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var OrganizationGetAllCommand;
(function (OrganizationGetAllCommand) {
    OrganizationGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    OrganizationGetAllCommand.ResponseSchema = OrganizationGetAllResponseSchema;
    OrganizationGetAllCommand.ResponseEntitySchema = OrganizationGetAllResponseEntitySchema;
})(OrganizationGetAllCommand || (exports.OrganizationGetAllCommand = OrganizationGetAllCommand = {}));
