"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldUnitMeasurementBusinessValueSchema = void 0;
const field_unit_measurement_1 = require("../field-unit-measurement");
exports.FieldUnitMeasurementBusinessValueSchema = field_unit_measurement_1.FieldUnitMeasurementSchema.pick({
    name: true,
    comment: true,
    uuid: true,
    handbookUuid: true,
    fieldUnitMeasurementStatus: true,
    numInOrder: true,
    lastChangeByUserUuid: true,
});
