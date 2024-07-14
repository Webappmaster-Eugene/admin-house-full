"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldUnitMeasurementCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const field_unit_measurement_related_entities_schema_1 = require("../../models/field-unit-measurement/field-unit-measurement-related-entities.schema");
const FieldUnitMeasurementCreateResponseEntitySchema = models_1.FieldUnitMeasurementSchema.pick({
    name: true,
    comment: true,
    uuid: true,
    handbookUuid: true,
    lastChangeByUserUuid: true,
}).merge(field_unit_measurement_related_entities_schema_1.FieldUnitMeasurementRelatedEntitiesSchema);
const FieldUnitMeasurementCreateRequestSchema = models_1.FieldUnitMeasurementSchema.pick({
    name: true,
    comment: true,
});
const FieldUnitMeasurementCreateResponseSchema = zod_1.z
    .object({
    data: FieldUnitMeasurementCreateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FieldUnitMeasurementCreateCommand;
(function (FieldUnitMeasurementCreateCommand) {
    FieldUnitMeasurementCreateCommand.RequestSchema = FieldUnitMeasurementCreateRequestSchema;
    FieldUnitMeasurementCreateCommand.ResponseSchema = FieldUnitMeasurementCreateResponseSchema;
    FieldUnitMeasurementCreateCommand.ResponseEntitySchema = FieldUnitMeasurementCreateResponseEntitySchema;
})(FieldUnitMeasurementCreateCommand || (exports.FieldUnitMeasurementCreateCommand = FieldUnitMeasurementCreateCommand = {}));
