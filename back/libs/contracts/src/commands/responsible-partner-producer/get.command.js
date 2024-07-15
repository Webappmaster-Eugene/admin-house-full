"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiblePartnerProducerGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const responsible_partner_producer_related_entities_schema_1 = require("../../models/responsible-partner-producer/responsible-partner-producer-related-entities.schema");
const responsible_partner_producer_business_value_schema_1 = require("../../models/responsible-partner-producer/responsible-partner-producer-business-value.schema");
const ResponsiblePartnerProducerGetResponseEntitySchema = responsible_partner_producer_business_value_schema_1.ResponsiblePartnerProducerBusinessValueSchema.merge(responsible_partner_producer_related_entities_schema_1.ResponsiblePartnerProducerRelatedEntitiesSchema);
const ResponsiblePartnerProducerGetResponseSchema = zod_1.z
    .object({
    data: models_1.ResponsiblePartnerProducerSchema.pick({
        name: true,
        comment: true,
        info: true,
        email: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
        uuid: true,
        handbookUuid: true,
        lastChangeByUserUuid: true,
    }),
})
    .merge(models_1.ResponseClientSchema);
var ResponsiblePartnerProducerGetCommand;
(function (ResponsiblePartnerProducerGetCommand) {
    ResponsiblePartnerProducerGetCommand.BusinessValueSchema = responsible_partner_producer_business_value_schema_1.ResponsiblePartnerProducerBusinessValueSchema;
    ResponsiblePartnerProducerGetCommand.ResponseSchema = ResponsiblePartnerProducerGetResponseSchema;
    ResponsiblePartnerProducerGetCommand.ResponseEntitySchema = ResponsiblePartnerProducerGetResponseEntitySchema;
})(ResponsiblePartnerProducerGetCommand || (exports.ResponsiblePartnerProducerGetCommand = ResponsiblePartnerProducerGetCommand = {}));
