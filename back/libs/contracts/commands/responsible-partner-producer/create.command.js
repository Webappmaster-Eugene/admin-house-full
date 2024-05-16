"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiblePartnerProducerCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const ResponsiblePartnerProducerCreateRequestSchema = models_1.ResponsiblePartnerProducerSchema.omit({
    uuid: true,
    createdAt: true,
    updatedAt: true,
});
const ResponsiblePartnerProducerCreateResponseSchema = zod_1.z
    .object({
    data: models_1.ResponsiblePartnerProducerSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var ResponsiblePartnerProducerCreateCommand;
(function (ResponsiblePartnerProducerCreateCommand) {
    ResponsiblePartnerProducerCreateCommand.RequestSchema = ResponsiblePartnerProducerCreateRequestSchema;
    ResponsiblePartnerProducerCreateCommand.ResponseSchema = ResponsiblePartnerProducerCreateResponseSchema;
})(ResponsiblePartnerProducerCreateCommand || (exports.ResponsiblePartnerProducerCreateCommand = ResponsiblePartnerProducerCreateCommand = {}));
