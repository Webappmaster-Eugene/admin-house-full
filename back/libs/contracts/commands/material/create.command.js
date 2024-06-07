"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const MaterialCreateRequestSchema = models_1.MaterialSchema.pick({
    name: true,
    price: true,
    comment: true,
    namePublic: true,
    sourceInfo: true,
    unitMeasurementUuid: true,
    responsiblePartnerUuid: true,
});
const MaterialCreateResponseSchema = zod_1.z
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
var MaterialCreateCommand;
(function (MaterialCreateCommand) {
    MaterialCreateCommand.RequestSchema = MaterialCreateRequestSchema;
    MaterialCreateCommand.ResponseSchema = MaterialCreateResponseSchema;
})(MaterialCreateCommand || (exports.MaterialCreateCommand = MaterialCreateCommand = {}));
