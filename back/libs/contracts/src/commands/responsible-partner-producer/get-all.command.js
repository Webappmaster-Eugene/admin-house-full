"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiblePartnerProducerGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const responsible_partner_producer_business_value_schema_1 = require("../../models/responsible-partner-producer/responsible-partner-producer-business-value.schema");
const responsible_partner_producer_related_entities_schema_1 = require("../../models/responsible-partner-producer/responsible-partner-producer-related-entities.schema");
const ResponsiblePartnerProducerGetAllResponseEntitySchema = zod_1.z.array(responsible_partner_producer_business_value_schema_1.ResponsiblePartnerProducerBusinessValueSchema.merge(responsible_partner_producer_related_entities_schema_1.ResponsiblePartnerProducerRelatedEntitiesSchema));
const ResponsiblePartnerProducerGetAllResponseSchema = zod_1.z
    .object({
    data: ResponsiblePartnerProducerGetAllResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var ResponsiblePartnerProducerGetAllCommand;
(function (ResponsiblePartnerProducerGetAllCommand) {
    ResponsiblePartnerProducerGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    ResponsiblePartnerProducerGetAllCommand.ResponseSchema = ResponsiblePartnerProducerGetAllResponseSchema;
    ResponsiblePartnerProducerGetAllCommand.ResponseEntitySchema = ResponsiblePartnerProducerGetAllResponseEntitySchema;
})(ResponsiblePartnerProducerGetAllCommand || (exports.ResponsiblePartnerProducerGetAllCommand = ResponsiblePartnerProducerGetAllCommand = {}));
