"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandbookGetAllCommand = void 0;
const zod_1 = require("zod");
const handbook_business_value_schema_1 = require("../../models/handbook/handbook-business-value.schema");
const models_1 = require("../../models");
const handbook_related_entities_schema_1 = require("../../models/handbook/handbook-related-entities.schema");
const HandbookGetAllResponseEntitySchema = zod_1.z.array(handbook_business_value_schema_1.HandbookBusinessValueSchema.merge(handbook_related_entities_schema_1.HandbookRelatedEntitiesSchema));
const HandbookGetAllResponseSchema = zod_1.z
    .object({
    data: HandbookGetAllResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var HandbookGetAllCommand;
(function (HandbookGetAllCommand) {
    HandbookGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    HandbookGetAllCommand.ResponseSchema = HandbookGetAllResponseSchema;
    HandbookGetAllCommand.ResponseEntitySchema = HandbookGetAllResponseEntitySchema;
})(HandbookGetAllCommand || (exports.HandbookGetAllCommand = HandbookGetAllCommand = {}));
