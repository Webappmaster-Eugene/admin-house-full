"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldUnitMeasurementGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldUnitMeasurementGetAllResponseEntitySchema = zod_1.z.array(models_1.FieldUnitMeasurementSchema.pick({
    name: true,
    comment: true,
    uuid: true,
    handbookUuid: true,
    lastChangeByUserUuid: true,
}));
const FieldUnitMeasurementGetAllResponseSchema = zod_1.z
    .object({
    data: FieldUnitMeasurementGetAllResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var FieldUnitMeasurementGetAllCommand;
(function (FieldUnitMeasurementGetAllCommand) {
    FieldUnitMeasurementGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    FieldUnitMeasurementGetAllCommand.ResponseSchema = FieldUnitMeasurementGetAllResponseSchema;
    FieldUnitMeasurementGetAllCommand.ResponseEntitySchema = FieldUnitMeasurementGetAllResponseEntitySchema;
})(FieldUnitMeasurementGetAllCommand || (exports.FieldUnitMeasurementGetAllCommand = FieldUnitMeasurementGetAllCommand = {}));
