"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldTypeGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const field_type_business_value_schema_1 = require("../../models/field-type/field-type-business-value.schema");
const FieldTypeGetResponseEntitySchema = field_type_business_value_schema_1.FieldTypeBusinessValueSchema;
const FieldTypeGetResponseSchema = zod_1.z
    .object({
    data: FieldTypeGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FieldTypeGetCommand;
(function (FieldTypeGetCommand) {
    FieldTypeGetCommand.ResponseSchema = FieldTypeGetResponseSchema;
    FieldTypeGetCommand.ResponseEntitySchema = FieldTypeGetResponseEntitySchema;
})(FieldTypeGetCommand || (exports.FieldTypeGetCommand = FieldTypeGetCommand = {}));
