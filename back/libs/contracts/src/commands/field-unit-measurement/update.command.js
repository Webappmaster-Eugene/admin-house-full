"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldUnitMeasurementUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const field_unit_measurement_related_entities_schema_1 = require("../../models/field-unit-measurement/field-unit-measurement-related-entities.schema");
const field_unit_measurement_business_value_schema_1 = require("../../models/field-unit-measurement/field-unit-measurement-business-value.schema");
const FieldUnitMeasurementUpdateResponseEntitySchema = field_unit_measurement_business_value_schema_1.FieldUnitMeasurementBusinessValueSchema.merge(field_unit_measurement_related_entities_schema_1.FieldUnitMeasurementRelatedEntitiesSchema);
const FieldUnitMeasurementUpdateRequestSchema = models_1.FieldUnitMeasurementSchema.pick({
    name: true,
    comment: true,
});
const FieldUnitMeasurementUpdateResponseSchema = zod_1.z
    .object({
    data: FieldUnitMeasurementUpdateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FieldUnitMeasurementUpdateCommand;
(function (FieldUnitMeasurementUpdateCommand) {
    FieldUnitMeasurementUpdateCommand.RequestSchema = FieldUnitMeasurementUpdateRequestSchema;
    FieldUnitMeasurementUpdateCommand.ResponseSchema = FieldUnitMeasurementUpdateResponseSchema;
    FieldUnitMeasurementUpdateCommand.ResponseEntitySchema = FieldUnitMeasurementUpdateResponseEntitySchema;
})(FieldUnitMeasurementUpdateCommand || (exports.FieldUnitMeasurementUpdateCommand = FieldUnitMeasurementUpdateCommand = {}));
