"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const material_business_value_schema_1 = require("../../models/material/material-business-value.schema");
const material_related_entities_schema_1 = require("../../models/material/material-related-entities.schema");
const MaterialUpdateResponseEntitySchema = material_business_value_schema_1.MaterialBusinessValueSchema.merge(material_related_entities_schema_1.MaterialRelatedEntitiesSchema);
const MaterialUpdateRequestSchema = models_1.MaterialSchema.pick({
    name: true,
    price: true,
    comment: true,
    namePublic: true,
    sourceInfo: true,
    unitMeasurementUuid: true,
    responsiblePartnerUuid: true,
    materialStatus: true,
}).partial();
const MaterialUpdateResponseSchema = zod_1.z
    .object({
    data: MaterialUpdateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var MaterialUpdateCommand;
(function (MaterialUpdateCommand) {
    MaterialUpdateCommand.RequestSchema = MaterialUpdateRequestSchema;
    MaterialUpdateCommand.ResponseSchema = MaterialUpdateResponseSchema;
    MaterialUpdateCommand.ResponseEntitySchema = MaterialUpdateResponseEntitySchema;
})(MaterialUpdateCommand || (exports.MaterialUpdateCommand = MaterialUpdateCommand = {}));
