"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldUnitMeasurementGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldUnitMeasurementGetResponseSchema = zod_1.z
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
var FieldUnitMeasurementGetCommand;
(function (FieldUnitMeasurementGetCommand) {
    FieldUnitMeasurementGetCommand.ResponseSchema = FieldUnitMeasurementGetResponseSchema;
})(FieldUnitMeasurementGetCommand || (exports.FieldUnitMeasurementGetCommand = FieldUnitMeasurementGetCommand = {}));
