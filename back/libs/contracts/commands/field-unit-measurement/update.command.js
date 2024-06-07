"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldUnitMeasurementUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldUnitMeasurementUpdateRequestSchema = models_1.FieldUnitMeasurementSchema.pick({
    name: true,
    comment: true,
}).partial();
const FieldUnitMeasurementUpdateResponseSchema = zod_1.z
    .object({
    data: models_1.FieldUnitMeasurementSchema.pick({
        name: true,
        comment: true,
        uuid: true,
        handbookUuid: true,
        lastChangeByUserUuid: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var FieldUnitMeasurementUpdateCommand;
(function (FieldUnitMeasurementUpdateCommand) {
    FieldUnitMeasurementUpdateCommand.RequestSchema = FieldUnitMeasurementUpdateRequestSchema;
    FieldUnitMeasurementUpdateCommand.ResponseSchema = FieldUnitMeasurementUpdateResponseSchema;
})(FieldUnitMeasurementUpdateCommand || (exports.FieldUnitMeasurementUpdateCommand = FieldUnitMeasurementUpdateCommand = {}));
