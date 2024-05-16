"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiblePartnerProducerGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const ResponsiblePartnerProducerGetResponseSchema = zod_1.z
    .object({
    data: models_1.ResponsiblePartnerProducerSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var ResponsiblePartnerProducerGetCommand;
(function (ResponsiblePartnerProducerGetCommand) {
    ResponsiblePartnerProducerGetCommand.ResponseSchema = ResponsiblePartnerProducerGetResponseSchema;
})(ResponsiblePartnerProducerGetCommand || (exports.ResponsiblePartnerProducerGetCommand = ResponsiblePartnerProducerGetCommand = {}));
