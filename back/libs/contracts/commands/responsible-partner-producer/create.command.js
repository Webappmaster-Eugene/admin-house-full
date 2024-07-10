"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiblePartnerProducerCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const ResponsiblePartnerProducerCreateResponseEntitySchema = models_1.ResponsiblePartnerProducerBusinessValueSchema.merge(models_1.ResponsiblePartnerProducerRelatedEntitiesSchema);
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
    .merge(models_2.ResponseClientSchema);
var ResponsiblePartnerProducerCreateCommand;
(function (ResponsiblePartnerProducerCreateCommand) {
    ResponsiblePartnerProducerCreateCommand.RequestSchema = ResponsiblePartnerProducerCreateRequestSchema;
    ResponsiblePartnerProducerCreateCommand.ResponseSchema = ResponsiblePartnerProducerCreateResponseSchema;
    ResponsiblePartnerProducerCreateCommand.ResponseEntitySchema = ResponsiblePartnerProducerCreateResponseEntitySchema;
})(ResponsiblePartnerProducerCreateCommand || (exports.ResponsiblePartnerProducerCreateCommand = ResponsiblePartnerProducerCreateCommand = {}));
