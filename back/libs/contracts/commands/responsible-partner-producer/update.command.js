"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiblePartnerProducerUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const ResponsiblePartnerProducerUpdateRequestSchema = models_1.ResponsiblePartnerProducerSchema.pick({
    name: true,
    info: true,
    phone: true,
    email: true,
    comment: true,
}).partial();
const ResponsiblePartnerProducerUpdateResponseSchema = zod_1.z
    .object({
    data: models_1.ResponsiblePartnerProducerSchema.omit({
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
    .merge(models_2.ResponseClientSchema);
var ResponsiblePartnerProducerUpdateCommand;
(function (ResponsiblePartnerProducerUpdateCommand) {
    ResponsiblePartnerProducerUpdateCommand.RequestSchema = ResponsiblePartnerProducerUpdateRequestSchema;
    ResponsiblePartnerProducerUpdateCommand.ResponseSchema = ResponsiblePartnerProducerUpdateResponseSchema;
})(ResponsiblePartnerProducerUpdateCommand || (exports.ResponsiblePartnerProducerUpdateCommand = ResponsiblePartnerProducerUpdateCommand = {}));
