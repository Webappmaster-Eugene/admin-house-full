"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const organization_business_value_schema_1 = require("../../models/organization/organization-business-value.schema");
const organization_related_entities_schema_1 = require("../../models/organization/organization-related-entities.schema");
const OrganizationDeleteResponseEntitySchema = organization_business_value_schema_1.OrganizationBusinessValueSchema.merge(organization_related_entities_schema_1.OrganizationRelatedEntitiesSchema);
const OrganizationDeleteResponseSchema = zod_1.z
    .object({
    data: OrganizationDeleteResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var OrganizationDeleteCommand;
(function (OrganizationDeleteCommand) {
    OrganizationDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    OrganizationDeleteCommand.ResponseSchema = OrganizationDeleteResponseSchema;
    OrganizationDeleteCommand.ResponseEntitySchema = OrganizationDeleteResponseEntitySchema;
})(OrganizationDeleteCommand || (exports.OrganizationDeleteCommand = OrganizationDeleteCommand = {}));
