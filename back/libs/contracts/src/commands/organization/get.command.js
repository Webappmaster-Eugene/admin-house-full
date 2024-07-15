"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const organization_business_value_schema_1 = require("../../models/organization/organization-business-value.schema");
const organization_related_entities_schema_1 = require("../../models/organization/organization-related-entities.schema");
const OrganizationGetResponseEntitySchema = organization_business_value_schema_1.OrganizationBusinessValueSchema.merge(organization_related_entities_schema_1.OrganizationRelatedEntitiesSchema);
const OrganizationSchemaGetResponseSchema = zod_1.z
    .object({
    data: OrganizationGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var OrganizationGetCommand;
(function (OrganizationGetCommand) {
    OrganizationGetCommand.BusinessValueSchema = organization_business_value_schema_1.OrganizationBusinessValueSchema;
    OrganizationGetCommand.ResponseSchema = OrganizationSchemaGetResponseSchema;
    OrganizationGetCommand.ResponseEntitySchema = OrganizationGetResponseEntitySchema;
})(OrganizationGetCommand || (exports.OrganizationGetCommand = OrganizationGetCommand = {}));
