"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiblePartnerProducerGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const ResponsiblePartnerProducerGetAllResponseEntitySchema = zod_1.z.array(models_1.ResponsiblePartnerProducerBusinessValueSchema.merge(models_1.ResponsiblePartnerProducerRelatedEntitiesSchema));
const ResponsiblePartnerProducerGetAllResponseSchema = zod_1.z
    .object({
    data: ResponsiblePartnerProducerGetAllResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var ResponsiblePartnerProducerGetAllCommand;
(function (ResponsiblePartnerProducerGetAllCommand) {
    ResponsiblePartnerProducerGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    ResponsiblePartnerProducerGetAllCommand.ResponseSchema = ResponsiblePartnerProducerGetAllResponseSchema;
    ResponsiblePartnerProducerGetAllCommand.ResponseEntitySchema = ResponsiblePartnerProducerGetAllResponseEntitySchema;
})(ResponsiblePartnerProducerGetAllCommand || (exports.ResponsiblePartnerProducerGetAllCommand = ResponsiblePartnerProducerGetAllCommand = {}));
