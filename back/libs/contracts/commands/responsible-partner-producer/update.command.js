"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiblePartnerProducerUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const ResponsiblePartnerProducerUpdateRequestSchema = models_1.ResponsiblePartnerProducerSchema.omit({
    createdAt: true,
    updatedAt: true,
    uuid: true,
}).partial();
const ResponsiblePartnerProducerUpdateResponseSchema = zod_1.z
    .object({
    data: models_1.ResponsiblePartnerProducerSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var ResponsiblePartnerProducerUpdateCommand;
(function (ResponsiblePartnerProducerUpdateCommand) {
    ResponsiblePartnerProducerUpdateCommand.RequestSchema = ResponsiblePartnerProducerUpdateRequestSchema;
    ResponsiblePartnerProducerUpdateCommand.ResponseSchema = ResponsiblePartnerProducerUpdateResponseSchema;
})(ResponsiblePartnerProducerUpdateCommand || (exports.ResponsiblePartnerProducerUpdateCommand = ResponsiblePartnerProducerUpdateCommand = {}));
