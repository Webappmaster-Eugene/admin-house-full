"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldUnitMeasurementCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldUnitMeasurementCreateRequestSchema = models_1.FieldUnitMeasurementSchema.omit({
    uuid: true,
    createdAt: true,
    updatedAt: true,
});
const FieldUnitMeasurementCreateResponseSchema = zod_1.z
    .object({
    data: models_1.FieldUnitMeasurementSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var FieldUnitMeasurementCreateCommand;
(function (FieldUnitMeasurementCreateCommand) {
    FieldUnitMeasurementCreateCommand.RequestSchema = FieldUnitMeasurementCreateRequestSchema;
    FieldUnitMeasurementCreateCommand.ResponseSchema = FieldUnitMeasurementCreateResponseSchema;
})(FieldUnitMeasurementCreateCommand || (exports.FieldUnitMeasurementCreateCommand = FieldUnitMeasurementCreateCommand = {}));
