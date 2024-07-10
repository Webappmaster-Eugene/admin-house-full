"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiblePartnerProducerBusinessValueSchema = void 0;
const responsible_partner_producer_schema_1 = require("./responsible-partner-producer.schema");
exports.ResponsiblePartnerProducerBusinessValueSchema = responsible_partner_producer_schema_1.ResponsiblePartnerProducerSchema.pick({
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
});
