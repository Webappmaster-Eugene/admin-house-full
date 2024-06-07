"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiblePartnerProducerGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const ResponsiblePartnerProducerGetAllResponseSchema = zod_1.z
    .object({
    data: zod_1.z.array(models_1.ResponsiblePartnerProducerSchema.pick({
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
    })),
})
    .merge(models_2.ResponseClientSchema);
var ResponsiblePartnerProducerGetAllCommand;
(function (ResponsiblePartnerProducerGetAllCommand) {
    ResponsiblePartnerProducerGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    ResponsiblePartnerProducerGetAllCommand.ResponseSchema = ResponsiblePartnerProducerGetAllResponseSchema;
})(ResponsiblePartnerProducerGetAllCommand || (exports.ResponsiblePartnerProducerGetAllCommand = ResponsiblePartnerProducerGetAllCommand = {}));
