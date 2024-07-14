"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiblePartnerProducerCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const responsible_partner_producer_related_entities_schema_1 = require("../../models/responsible-partner-producer/responsible-partner-producer-related-entities.schema");
const responsible_partner_producer_business_value_schema_1 = require("../../models/responsible-partner-producer/responsible-partner-producer-business-value.schema");
const ResponsiblePartnerProducerCreateResponseEntitySchema = responsible_partner_producer_business_value_schema_1.ResponsiblePartnerProducerBusinessValueSchema.merge(responsible_partner_producer_related_entities_schema_1.ResponsiblePartnerProducerRelatedEntitiesSchema);
const ResponsiblePartnerProducerCreateRequestSchema = models_1.ResponsiblePartnerProducerSchema.pick({
    name: true,
    comment: true,
    info: true,
    email: true,
    phone: true,
});
const ResponsiblePartnerProducerCreateResponseSchema = zod_1.z
    .object({
    data: ResponsiblePartnerProducerCreateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var ResponsiblePartnerProducerCreateCommand;
(function (ResponsiblePartnerProducerCreateCommand) {
    ResponsiblePartnerProducerCreateCommand.RequestSchema = ResponsiblePartnerProducerCreateRequestSchema;
    ResponsiblePartnerProducerCreateCommand.ResponseSchema = ResponsiblePartnerProducerCreateResponseSchema;
    ResponsiblePartnerProducerCreateCommand.ResponseEntitySchema = ResponsiblePartnerProducerCreateResponseEntitySchema;
})(ResponsiblePartnerProducerCreateCommand || (exports.ResponsiblePartnerProducerCreateCommand = ResponsiblePartnerProducerCreateCommand = {}));
