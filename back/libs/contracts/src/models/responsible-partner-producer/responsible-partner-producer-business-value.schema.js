"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiblePartnerProducerBusinessValueSchema = void 0;
const responsible_partner_producer_schema_1 = require("./responsible-partner-producer.schema");
exports.ResponsiblePartnerProducerBusinessValueSchema = responsible_partner_producer_schema_1.ResponsiblePartnerProducerSchema.pick({
    uuid: true,
    name: true,
    comment: true,
    lastChangeByUserUuid: true,
    responsiblePartnerProducerStatus: true,
    numInOrder: true,
    info: true,
    email: true,
    phone: true,
    handbookUuid: true,
});
