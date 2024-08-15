"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const organization_business_value_schema_1 = require("../../models/organization/organization-business-value.schema");
const organization_related_entities_schema_1 = require("../../models/organization/organization-related-entities.schema");
const OrganizationUpdateResponseEntitySchema = organization_business_value_schema_1.OrganizationBusinessValueSchema.merge(organization_related_entities_schema_1.OrganizationRelatedEntitiesSchema);
const OrganizationUpdateRequestSchema = models_1.OrganizationSchema.pick({
    name: true,
    description: true,
    organizationStatus: true,
}).partial();
const OrganizationUpdateResponseSchema = zod_1.z
    .object({
    data: OrganizationUpdateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var OrganizationUpdateCommand;
(function (OrganizationUpdateCommand) {
    OrganizationUpdateCommand.RequestSchema = OrganizationUpdateRequestSchema;
    OrganizationUpdateCommand.ResponseSchema = OrganizationUpdateResponseSchema;
    OrganizationUpdateCommand.ResponseEntitySchema = OrganizationUpdateResponseEntitySchema;
})(OrganizationUpdateCommand || (exports.OrganizationUpdateCommand = OrganizationUpdateCommand = {}));
