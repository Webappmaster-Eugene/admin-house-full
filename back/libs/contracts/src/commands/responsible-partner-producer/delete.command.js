"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiblePartnerProducerDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const responsible_partner_producer_related_entities_schema_1 = require("../../models/responsible-partner-producer/responsible-partner-producer-related-entities.schema");
const responsible_partner_producer_business_value_schema_1 = require("../../models/responsible-partner-producer/responsible-partner-producer-business-value.schema");
const ResponsiblePartnerProducerDeleteResponseEntitySchema = responsible_partner_producer_business_value_schema_1.ResponsiblePartnerProducerBusinessValueSchema.merge(responsible_partner_producer_related_entities_schema_1.ResponsiblePartnerProducerRelatedEntitiesSchema);
const ResponsiblePartnerProducerDeleteResponseSchema = zod_1.z
    .object({
    data: ResponsiblePartnerProducerDeleteResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var ResponsiblePartnerProducerDeleteCommand;
(function (ResponsiblePartnerProducerDeleteCommand) {
    ResponsiblePartnerProducerDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    ResponsiblePartnerProducerDeleteCommand.ResponseSchema = ResponsiblePartnerProducerDeleteResponseSchema;
    ResponsiblePartnerProducerDeleteCommand.ResponseEntitySchema = ResponsiblePartnerProducerDeleteResponseEntitySchema;
})(ResponsiblePartnerProducerDeleteCommand || (exports.ResponsiblePartnerProducerDeleteCommand = ResponsiblePartnerProducerDeleteCommand = {}));
