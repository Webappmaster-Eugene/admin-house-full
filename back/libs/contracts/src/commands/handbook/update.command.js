"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandbookUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const handbook_business_value_schema_1 = require("../../models/handbook/handbook-business-value.schema");
const handbook_related_entities_schema_1 = require("../../models/handbook/handbook-related-entities.schema");
const HandbookUpdateResponseEntitySchema = handbook_business_value_schema_1.HandbookBusinessValueSchema.merge(handbook_related_entities_schema_1.HandbookRelatedEntitiesSchema);
const HandbookUpdateRequestSchema = models_1.HandbookSchema.pick({
    name: true,
    canCustomerView: true,
    description: true,
});
const HandbookUpdateResponseSchema = zod_1.z
    .object({
    data: HandbookUpdateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var HandbookUpdateCommand;
(function (HandbookUpdateCommand) {
    HandbookUpdateCommand.RequestSchema = HandbookUpdateRequestSchema;
    HandbookUpdateCommand.ResponseSchema = HandbookUpdateResponseSchema;
    HandbookUpdateCommand.ResponseEntitySchema = HandbookUpdateResponseEntitySchema;
})(HandbookUpdateCommand || (exports.HandbookUpdateCommand = HandbookUpdateCommand = {}));
