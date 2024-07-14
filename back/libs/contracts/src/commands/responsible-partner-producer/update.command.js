"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiblePartnerProducerUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const responsible_partner_producer_related_entities_schema_1 = require("../../models/responsible-partner-producer/responsible-partner-producer-related-entities.schema");
const responsible_partner_producer_business_value_schema_1 = require("../../models/responsible-partner-producer/responsible-partner-producer-business-value.schema");
const ResponsiblePartnerProducerUpdateResponseEntitySchema = responsible_partner_producer_business_value_schema_1.ResponsiblePartnerProducerBusinessValueSchema.merge(responsible_partner_producer_related_entities_schema_1.ResponsiblePartnerProducerRelatedEntitiesSchema);
const ResponsiblePartnerProducerUpdateRequestSchema = models_1.ResponsiblePartnerProducerSchema.pick({
    name: true,
    info: true,
    phone: true,
    email: true,
    comment: true,
});
const ResponsiblePartnerProducerUpdateResponseSchema = zod_1.z
    .object({
    data: ResponsiblePartnerProducerUpdateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var ResponsiblePartnerProducerUpdateCommand;
(function (ResponsiblePartnerProducerUpdateCommand) {
    ResponsiblePartnerProducerUpdateCommand.RequestSchema = ResponsiblePartnerProducerUpdateRequestSchema;
    ResponsiblePartnerProducerUpdateCommand.ResponseSchema = ResponsiblePartnerProducerUpdateResponseSchema;
    ResponsiblePartnerProducerUpdateCommand.ResponseEntitySchema = ResponsiblePartnerProducerUpdateResponseEntitySchema;
})(ResponsiblePartnerProducerUpdateCommand || (exports.ResponsiblePartnerProducerUpdateCommand = ResponsiblePartnerProducerUpdateCommand = {}));
