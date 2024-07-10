"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldUnitMeasurementUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldUnitMeasurementUpdateResponseEntitySchema = models_1.FieldUnitMeasurementBusinessValueSchema.merge(models_1.FieldUnitMeasurementRelatedEntitiesSchema);
const FieldUnitMeasurementUpdateRequestSchema = models_1.FieldUnitMeasurementSchema.pick({
    name: true,
    comment: true,
}).partial();
const FieldUnitMeasurementUpdateResponseSchema = zod_1.z
    .object({
    data: FieldUnitMeasurementUpdateResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var FieldUnitMeasurementUpdateCommand;
(function (FieldUnitMeasurementUpdateCommand) {
    FieldUnitMeasurementUpdateCommand.RequestSchema = FieldUnitMeasurementUpdateRequestSchema;
    FieldUnitMeasurementUpdateCommand.ResponseSchema = FieldUnitMeasurementUpdateResponseSchema;
    FieldUnitMeasurementUpdateCommand.ResponseEntitySchema = FieldUnitMeasurementUpdateResponseEntitySchema;
})(FieldUnitMeasurementUpdateCommand || (exports.FieldUnitMeasurementUpdateCommand = FieldUnitMeasurementUpdateCommand = {}));
