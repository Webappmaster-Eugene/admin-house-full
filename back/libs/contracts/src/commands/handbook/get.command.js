"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandbookGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const handbook_business_value_schema_1 = require("../../models/handbook/handbook-business-value.schema");
const handbook_related_entities_schema_1 = require("../../models/handbook/handbook-related-entities.schema");
const HandbookGetResponseEntitySchema = handbook_business_value_schema_1.HandbookBusinessValueSchema.merge(handbook_related_entities_schema_1.HandbookRelatedEntitiesSchema);
const HandbookGetResponseSchema = zod_1.z
    .object({
    data: HandbookGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var HandbookGetCommand;
(function (HandbookGetCommand) {
    HandbookGetCommand.ResponseSchema = HandbookGetResponseSchema;
    HandbookGetCommand.ResponseEntitySchema = HandbookGetResponseEntitySchema;
})(HandbookGetCommand || (exports.HandbookGetCommand = HandbookGetCommand = {}));
