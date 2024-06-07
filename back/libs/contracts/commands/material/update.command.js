"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const MaterialUpdateRequestSchema = models_1.MaterialSchema.pick({
    name: true,
    price: true,
    comment: true,
    namePublic: true,
    sourceInfo: true,
    unitMeasurementUuid: true,
    responsiblePartnerUuid: true,
}).partial();
const MaterialUpdateResponseSchema = zod_1.z
    .object({
    data: models_1.MaterialSchema.pick({
        name: true,
        price: true,
        comment: true,
        namePublic: true,
        sourceInfo: true,
        unitMeasurementUuid: true,
        responsiblePartnerUuid: true,
        categoryUuid: true,
        handbookUuid: true,
        lastChangeByUserUuid: true,
        uuid: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var MaterialUpdateCommand;
(function (MaterialUpdateCommand) {
    MaterialUpdateCommand.RequestSchema = MaterialUpdateRequestSchema;
    MaterialUpdateCommand.ResponseSchema = MaterialUpdateResponseSchema;
})(MaterialUpdateCommand || (exports.MaterialUpdateCommand = MaterialUpdateCommand = {}));
