"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldUnitMeasurementGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldUnitMeasurementGetAllResponseSchema = zod_1.z
    .object({
    data: zod_1.z.array(models_1.FieldUnitMeasurementSchema.omit({
        createdAt: true,
        updatedAt: true,
    })),
})
    .merge(models_2.ResponseClientSchema);
var FieldUnitMeasurementGetAllCommand;
(function (FieldUnitMeasurementGetAllCommand) {
    FieldUnitMeasurementGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    FieldUnitMeasurementGetAllCommand.ResponseSchema = FieldUnitMeasurementGetAllResponseSchema;
})(FieldUnitMeasurementGetAllCommand || (exports.FieldUnitMeasurementGetAllCommand = FieldUnitMeasurementGetAllCommand = {}));
