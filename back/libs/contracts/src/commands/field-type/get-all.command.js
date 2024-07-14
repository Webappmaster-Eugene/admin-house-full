"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldTypeGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const field_type_business_value_schema_1 = require("../../models/field-type/field-type-business-value.schema");
const FieldTypeGetAllResponseEntitySchema = zod_1.z.array(field_type_business_value_schema_1.FieldTypeBusinessValueSchema);
const FieldTypeGetAllResponseSchema = zod_1.z
    .object({
    data: FieldTypeGetAllResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FieldTypeGetAllCommand;
(function (FieldTypeGetAllCommand) {
    FieldTypeGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    FieldTypeGetAllCommand.ResponseSchema = FieldTypeGetAllResponseSchema;
    FieldTypeGetAllCommand.ResponseEntitySchema = FieldTypeGetAllResponseEntitySchema;
})(FieldTypeGetAllCommand || (exports.FieldTypeGetAllCommand = FieldTypeGetAllCommand = {}));
