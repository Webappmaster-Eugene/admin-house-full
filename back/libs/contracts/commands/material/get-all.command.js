"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const MaterialGetAllResponseEntitySchema = zod_1.z.array(models_1.MaterialSchema.pick({
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
}));
const MaterialGetAllResponseSchema = zod_1.z
    .object({
    data: MaterialGetAllResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var MaterialGetAllCommand;
(function (MaterialGetAllCommand) {
    MaterialGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    MaterialGetAllCommand.ResponseSchema = MaterialGetAllResponseSchema;
    MaterialGetAllCommand.ResponseEntitySchema = MaterialGetAllResponseEntitySchema;
})(MaterialGetAllCommand || (exports.MaterialGetAllCommand = MaterialGetAllCommand = {}));
