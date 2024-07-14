"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const organization_business_value_schema_1 = require("../../models/organization/organization-business-value.schema");
const organization_related_entities_schema_1 = require("../../models/organization/organization-related-entities.schema");
const OrganizationCreateResponseEntitySchema = organization_business_value_schema_1.OrganizationBusinessValueSchema.merge(organization_related_entities_schema_1.OrganizationRelatedEntitiesSchema);
const OrganizationCreateRequestSchema = models_1.OrganizationSchema.pick({
    name: true,
    description: true,
});
const OrganizationCreateResponseSchema = zod_1.z
    .object({
    data: OrganizationCreateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var OrganizationCreateCommand;
(function (OrganizationCreateCommand) {
    OrganizationCreateCommand.RequestSchema = OrganizationCreateRequestSchema;
    OrganizationCreateCommand.ResponseSchema = OrganizationCreateResponseSchema;
    OrganizationCreateCommand.ResponseEntitySchema = OrganizationCreateResponseEntitySchema;
})(OrganizationCreateCommand || (exports.OrganizationCreateCommand = OrganizationCreateCommand = {}));
