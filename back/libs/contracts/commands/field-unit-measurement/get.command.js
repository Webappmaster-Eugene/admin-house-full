"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldUnitMeasurementGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldUnitMeasurementGetResponseEntitySchema = models_1.FieldUnitMeasurementBusinessValueSchema.merge(models_1.FieldUnitMeasurementRelatedEntitiesSchema);
const FieldUnitMeasurementGetResponseSchema = zod_1.z
    .object({
    data: FieldUnitMeasurementGetResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var FieldUnitMeasurementGetCommand;
(function (FieldUnitMeasurementGetCommand) {
    FieldUnitMeasurementGetCommand.ResponseSchema = FieldUnitMeasurementGetResponseSchema;
    FieldUnitMeasurementGetCommand.ResponseEntitySchema = FieldUnitMeasurementGetResponseEntitySchema;
})(FieldUnitMeasurementGetCommand || (exports.FieldUnitMeasurementGetCommand = FieldUnitMeasurementGetCommand = {}));
