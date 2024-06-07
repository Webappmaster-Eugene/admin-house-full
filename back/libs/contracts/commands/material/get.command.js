"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const MaterialGetResponseSchema = zod_1.z
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
var MaterialGetCommand;
(function (MaterialGetCommand) {
    MaterialGetCommand.ResponseSchema = MaterialGetResponseSchema;
})(MaterialGetCommand || (exports.MaterialGetCommand = MaterialGetCommand = {}));
