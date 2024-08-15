"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const material_related_entities_schema_1 = require("../../models/material/material-related-entities.schema");
const material_business_value_schema_1 = require("../../models/material/material-business-value.schema");
const MaterialCreateResponseEntitySchema = material_business_value_schema_1.MaterialBusinessValueSchema.merge(material_related_entities_schema_1.MaterialRelatedEntitiesSchema);
const MaterialCreateRequestSchema = models_1.MaterialSchema.pick({
    name: true,
    price: true,
    comment: true,
    namePublic: true,
    sourceInfo: true,
    unitMeasurementUuid: true,
    responsiblePartnerUuid: true,
    materialStatus: true,
});
const MaterialCreateResponseSchema = zod_1.z
    .object({
    data: MaterialCreateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var MaterialCreateCommand;
(function (MaterialCreateCommand) {
    MaterialCreateCommand.RequestSchema = MaterialCreateRequestSchema;
    MaterialCreateCommand.ResponseSchema = MaterialCreateResponseSchema;
    MaterialCreateCommand.ResponseEntitySchema = MaterialCreateResponseEntitySchema;
})(MaterialCreateCommand || (exports.MaterialCreateCommand = MaterialCreateCommand = {}));
